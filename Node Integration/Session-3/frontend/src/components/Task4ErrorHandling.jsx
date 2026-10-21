import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Database, ServerCrash, XOctagon, Bell } from 'lucide-react';

export default function Task4ErrorHandling({ onShowAlert, useNativeAlert, setUseNativeAlert, onLogApi }) {
  const [testing, setTesting] = useState(false);
  const [lastErrorResult, setLastErrorResult] = useState(null);

  // Trigger test scenario
  const runTestScenario = async (scenario) => {
    setTesting(true);
    setLastErrorResult(null);
    const start = Date.now();

    try {
      let res, data;

      switch (scenario) {
        case 'empty-playlist':
          res = await fetch('http://localhost:5000/playlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: '' }) // Empty name triggers validation failure
          });
          data = await res.json();
          break;

        case 'invalid-restaurant':
          res = await fetch('http://localhost:5000/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Resto', cuisine: '', rating: 99 }) // Invalid rating & empty cuisine
          });
          data = await res.json();
          break;

        case 'db-disconnect':
          res = await fetch('http://localhost:5000/api/simulate-disconnect');
          data = await res.json();
          break;

        case 'save-failure':
          res = await fetch('http://localhost:5000/api/simulate-save-fail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          data = await res.json();
          break;

        case 'route-404':
          res = await fetch('http://localhost:5000/non-existent-endpoint');
          data = await res.json();
          break;

        default:
          return;
      }

      const duration = Date.now() - start;

      onLogApi?.({
        method: res.status >= 400 ? 'ERROR' : 'GET',
        url: scenario,
        status: res.status,
        duration,
        data
      });

      const resultInfo = {
        scenario,
        status: res.status,
        statusText: res.statusText,
        errorMsg: data.error || data.message || 'Unknown error',
        rawResponse: data
      };

      setLastErrorResult(resultInfo);

      // Task 4: Display alert with error
      onShowAlert({
        type: 'error',
        message: `[HTTP ${res.status} Error]: ${resultInfo.errorMsg}`,
        forceNative: useNativeAlert
      });

    } catch (err) {
      const resultInfo = {
        scenario,
        status: 'NETWORK_ERROR',
        statusText: 'Failed to Fetch',
        errorMsg: `Network connection failed: ${err.message}`,
        rawResponse: { error: err.message }
      };

      setLastErrorResult(resultInfo);

      onShowAlert({
        type: 'error',
        message: resultInfo.errorMsg,
        forceNative: useNativeAlert
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-section-header">
        <div>
          <span className="task-pill">Task 4: Error Handling Architecture</span>
          <h2>MERN Error Handling & Alert Verification</h2>
          <p className="task-desc">
            Tests error scenarios in the MERN flow. If the backend fails to connect to MongoDB, 
            or a save operation fails, the backend sends an error message and the frontend 
            displays an alert with the error.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <input
              type="checkbox"
              checked={useNativeAlert}
              onChange={(e) => setUseNativeAlert(e.target.checked)}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <span>Also trigger native <code>window.alert()</code> modal</span>
          </label>
        </div>
      </div>

      <div className="grid-2col">
        {/* Test Controls */}
        <div className="glass-panel form-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldAlert size={20} color="#f43f5e" />
            Interactive Error Trigger Bench
          </h3>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Click any test case to dispatch an erroneous request to the backend and watch the error handling workflow:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
              onClick={() => runTestScenario('empty-playlist')}
              disabled={testing}
            >
              <XOctagon size={18} color="#f43f5e" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>1. Empty Playlist Name Save Error (HTTP 400)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Backend validates required fields and sends JSON error</div>
              </div>
            </button>

            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
              onClick={() => runTestScenario('invalid-restaurant')}
              disabled={testing}
            >
              <XOctagon size={18} color="#f43f5e" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>2. Invalid Restaurant Rating (HTTP 400)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sends rating: 99 (violates Mongoose schema min: 1, max: 5)</div>
              </div>
            </button>

            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
              onClick={() => runTestScenario('db-disconnect')}
              disabled={testing}
            >
              <Database size={18} color="#f59e0b" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>3. Database Offline / Connection Failure (HTTP 503)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Backend catches missing MongoDB connection and alerts frontend</div>
              </div>
            </button>

            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
              onClick={() => runTestScenario('save-failure')}
              disabled={testing}
            >
              <ServerCrash size={18} color="#f43f5e" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>4. Mongoose Save Operation Crash (HTTP 500)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Simulates DB write lock, conflict, or schema rejection</div>
              </div>
            </button>
          </div>
        </div>

        {/* Live Error Response Inspector */}
        <div className="glass-panel form-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <AlertTriangle size={20} color="#fbbf24" />
            Live Error Response Inspector
          </h3>

          {!lastErrorResult ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Bell size={36} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p>No error triggered yet.</p>
              <p style={{ fontSize: '0.82rem' }}>Click one of the test buttons to observe error handling.</p>
            </div>
          ) : (
            <div>
              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--error-bg)',
                border: '1px solid var(--error-border)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#fecdd3' }}>HTTP Status: {lastErrorResult.status}</span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.3)', color: '#fda4af' }}>
                    {lastErrorResult.scenario}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ffe4e6' }}>
                  <strong>Alert Message Sent to User:</strong>
                  <div style={{ marginTop: '4px', fontStyle: 'italic' }}>"{lastErrorResult.errorMsg}"</div>
                </div>
              </div>

              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Raw JSON Payload from Backend:
              </span>
              <pre style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#f8fafc',
                background: '#090d16',
                padding: '14px',
                borderRadius: '8px',
                marginTop: '6px',
                border: '1px solid var(--border-color)',
                overflowX: 'auto'
              }}>
                {JSON.stringify(lastErrorResult.rawResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
