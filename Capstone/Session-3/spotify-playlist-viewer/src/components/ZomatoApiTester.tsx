import React, { useState } from 'react';
import { UtensilsCrossed, Terminal, Key, Globe, Play, CheckCircle2, RefreshCw, MapPin, Star } from 'lucide-react';

interface ZomatoApiTesterProps {
  onRunZomatoApi: () => void;
  zomatoKey: string;
  zomatoUrl: string;
}

export const ZomatoApiTester: React.FC<ZomatoApiTesterProps> = ({
  onRunZomatoApi,
  zomatoKey,
  zomatoUrl
}) => {
  const [serverResult, setServerResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestServerRoute = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/zomato-test');
      const data = await response.json();
      setServerResult(data);
      onRunZomatoApi();
    } catch (err) {
      console.error('Error fetching Zomato test:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-28">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Zomato API Integration & Config Reader</h2>
            <p className="text-xs text-slate-400">Requirement 4: <code className="text-emerald-300 font-mono">utils/api.js</code> environment variable executor</p>
          </div>
        </div>
      </div>

      {/* Grid: Config Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Key Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Key className="w-4 h-4 text-amber-400" />
              <span>NEXT_PUBLIC_ZOMATO_API_KEY</span>
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              Loaded
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-2">Configured in <code className="text-amber-300 font-mono">.env.local</code>:</p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-sm text-emerald-400 font-bold truncate">
            {zomatoKey}
          </div>
        </div>

        {/* URL Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>NEXT_PUBLIC_ZOMATO_API_URL</span>
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-2">Endpoint URL:</p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-sm text-sky-400 font-bold truncate">
            {zomatoUrl}
          </div>
        </div>

      </div>

      {/* Runner Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2">Function Execution Workbench</h3>
        <p className="text-xs text-slate-400 mb-6">
          Execute <code className="text-emerald-300 font-mono">printZomatoApiConfig()</code> from <code className="text-sky-300 font-mono">utils/api.js</code> to read and log variables directly to the browser and server consoles.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onRunZomatoApi}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Run utils/api.js in Browser</span>
          </button>

          <button
            onClick={handleTestServerRoute}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition transform active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-sky-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Test Express Server Route (/api/zomato-test)</span>
          </button>
        </div>

        {/* Server Response Display */}
        {serverResult && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Server Response Received ({serverResult.message})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serverResult.mockRestaurants?.map((resto: any) => (
                <div key={resto.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white">{resto.name}</h4>
                    <span className="flex items-center text-xs text-amber-400 font-bold space-x-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{resto.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{resto.address}</span>
                  </p>
                  <span className="inline-block mt-2 text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20 font-semibold">
                    {resto.cuisine}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
