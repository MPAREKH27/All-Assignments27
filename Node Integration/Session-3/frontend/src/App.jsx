import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Task1Playlist from './components/Task1Playlist';
import Task2Restaurant from './components/Task2Restaurant';
import Task3Movies from './components/Task3Movies';
import Task4ErrorHandling from './components/Task4ErrorHandling';
import Task5AsyncComparison from './components/Task5AsyncComparison';
import { 
  Music, 
  Utensils, 
  Film, 
  ShieldAlert, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('task1');
  const [dbHealth, setDbHealth] = useState(null);
  const [refreshingHealth, setRefreshingHealth] = useState(false);
  const [alert, setAlert] = useState(null);
  const [useNativeAlert, setUseNativeAlert] = useState(false);
  const [apiLogs, setApiLogs] = useState([]);

  // Fetch DB Health & Ping
  const checkHealth = useCallback(async () => {
    setRefreshingHealth(true);
    try {
      const res = await fetch('http://localhost:5000/api/health');
      const data = await res.json();
      setDbHealth(data);
    } catch (e) {
      setDbHealth({ readyState: 0, dbStatus: 'Disconnected' });
    } finally {
      setRefreshingHealth(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 20000); // Heartbeat every 20s
    return () => clearInterval(interval);
  }, [checkHealth]);

  // Unified Alert handler (Task 4)
  const handleShowAlert = useCallback(({ type, message, forceNative = false }) => {
    // 1. Set in-app rich UI banner
    setAlert({ type, message });

    // 2. If native window.alert is requested or toggled on error
    if ((type === 'error' && useNativeAlert) || forceNative) {
      setTimeout(() => {
        window.alert(`[${type.toUpperCase()}] ${message}`);
      }, 50);
    }

    // Auto-dismiss in-app success alerts after 6 seconds
    if (type === 'success') {
      setTimeout(() => {
        setAlert(prev => (prev?.message === message ? null : prev));
      }, 6000);
    }
  }, [useNativeAlert]);

  // Log API events to telemetry
  const handleLogApi = useCallback((log) => {
    setApiLogs(prev => [
      {
        ...log,
        timestamp: new Date().toISOString()
      },
      ...prev
    ].slice(0, 50));
    // Trigger health update after state change
    checkHealth();
  }, [checkHealth]);

  const tabs = [
    { id: 'task1', label: '1. Playlist POST Flow', icon: Music, tag: 'Task 1' },
    { id: 'task2', label: '2. Restaurant Form', icon: Utensils, tag: 'Task 2' },
    { id: 'task3', label: '3. Movie Catalog (GET)', icon: Film, tag: 'Task 3' },
    { id: 'task4', label: '4. Error Handling & Alert', icon: ShieldAlert, tag: 'Task 4' },
    { id: 'task5', label: '5. Async/Await & Telemetry', icon: Code2, tag: 'Task 5' },
  ];

  return (
    <div className="app-container">
      {/* Header with MongoDB status & Ping */}
      <Navbar
        dbHealth={dbHealth}
        refreshing={refreshingHealth}
        onRefreshHealth={checkHealth}
      />

      {/* Global Alert Notification Banner (Task 4) */}
      {alert && (
        <div className={`alert-banner ${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? (
              <CheckCircle2 size={20} color="#10b981" />
            ) : (
              <AlertCircle size={20} color="#f43f5e" />
            )}
            <div>
              <strong style={{ textTransform: 'capitalize' }}>
                {alert.type === 'success' ? 'Success:' : 'Alert / Error:'}
              </strong>{' '}
              {alert.message}
            </div>
          </div>
          <button className="alert-close-btn" onClick={() => setAlert(null)}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <nav className="nav-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span className="tab-tag">{tab.tag}</span>
            </button>
          );
        })}
      </nav>

      {/* Active Tab View */}
      <main>
        {activeTab === 'task1' && (
          <Task1Playlist onShowAlert={handleShowAlert} onLogApi={handleLogApi} />
        )}

        {activeTab === 'task2' && (
          <Task2Restaurant onShowAlert={handleShowAlert} onLogApi={handleLogApi} />
        )}

        {activeTab === 'task3' && (
          <Task3Movies onShowAlert={handleShowAlert} onLogApi={handleLogApi} />
        )}

        {activeTab === 'task4' && (
          <Task4ErrorHandling
            onShowAlert={handleShowAlert}
            useNativeAlert={useNativeAlert}
            setUseNativeAlert={setUseNativeAlert}
            onLogApi={handleLogApi}
          />
        )}

        {activeTab === 'task5' && (
          <Task5AsyncComparison
            apiLogs={apiLogs}
            onClearLogs={() => setApiLogs([])}
          />
        )}
      </main>
    </div>
  );
}
