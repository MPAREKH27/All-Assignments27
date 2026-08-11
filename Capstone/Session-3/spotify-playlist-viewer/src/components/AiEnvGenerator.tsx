import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, Bot, ShieldCheck, Download, RefreshCw } from 'lucide-react';

interface AiEnvGeneratorProps {
  rawContent: string;
}

export const AiEnvGenerator: React.FC<AiEnvGeneratorProps> = ({ rawContent }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(['OpenAI', 'Firebase', 'Stripe']);
  const [generatedEnv, setGeneratedEnv] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleToggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleGenerateCustomEnv = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-env-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: selectedServices,
          appName: 'spotify-playlist-viewer'
        })
      });
      const data = await response.json();
      if (data.envContent) {
        setGeneratedEnv(data.envContent);
      }
    } catch (err) {
      console.error('Error generating AI env:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-28">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI-Generated .env.local Template File</h2>
            <p className="text-xs text-slate-300">
              Requirement 5: Stored in <code className="text-purple-300 font-mono">/ai_env_example.txt</code> (OpenAI API + Firebase Next.js Template)
            </p>
          </div>
        </div>
      </div>

      {/* File Viewer Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-purple-300">/ai_env_example.txt</span>
          </div>

          <button
            onClick={() => handleCopy(rawContent, 'all')}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white bg-slate-900 px-3 py-1.5 rounded-lg text-xs border border-slate-800 transition"
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied File Content!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Entire File</span>
              </>
            )}
          </button>
        </div>

        <div className="p-5 font-mono text-xs text-slate-200 bg-slate-950/90 overflow-x-auto leading-relaxed max-h-[500px]">
          <pre><code>{rawContent}</code></pre>
        </div>
      </div>

      {/* Interactive Custom AI Env Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Custom AI Environment Template Generator</h3>
          </div>
          <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-semibold">
            Powered by Gemini API
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Select target integration services to synthesize a new, secure Next.js <code className="text-purple-300 font-mono">.env.local</code> configuration on demand:
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['OpenAI', 'Firebase', 'Stripe', 'Supabase', 'Clerk Auth', 'Twilio', 'Pinecone Vector DB'].map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <button
                key={service}
                onClick={() => handleToggleService(service)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isSelected
                    ? 'bg-purple-500 text-slate-950 border-purple-400 shadow-md shadow-purple-500/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {service}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleGenerateCustomEnv}
          disabled={isGenerating || selectedServices.length === 0}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold transition transform active:scale-95 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing .env.local...' : 'Generate New Custom .env.local'}</span>
        </button>

        {/* Custom Generated Output */}
        {generatedEnv && (
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Generated Custom Environment Configuration</span>
              </span>

              <button
                onClick={() => handleCopy(generatedEnv, 'custom')}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedSection === 'custom' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'custom' ? 'Copied' : 'Copy Output'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-80">
              <pre><code>{generatedEnv}</code></pre>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
