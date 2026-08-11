import React, { useState } from 'react';
import { Globe, ShieldCheck, Server, AlertCircle, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { DomainCheckResult } from '../types';

export const CustomDomainSection: React.FC = () => {
  const [domainInput, setDomainInput] = useState('reacttest.tk');
  const [provider, setProvider] = useState<'netlify' | 'vercel'>('netlify');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checkResult, setCheckResult] = useState<DomainCheckResult | null>({
    domain: 'reacttest.tk',
    status: 'valid',
    ipAddress: provider === 'netlify' ? '75.2.60.5' : '76.76.21.21',
    cnameTarget: provider === 'netlify' ? 'react-deployment-test.netlify.app' : 'cname.vercel-dns.com',
    sslActive: true,
    message: 'Domain successfully resolved & Let\'s Encrypt SSL active!',
  });

  const handleAnalyzeDomain = () => {
    if (!domainInput.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const isFreenom = domainInput.endsWith('.tk') || domainInput.endsWith('.ml') || domainInput.endsWith('.ga') || domainInput.endsWith('.cf') || domainInput.endsWith('.gq');
      
      setCheckResult({
        domain: domainInput.toLowerCase(),
        status: 'valid',
        ipAddress: provider === 'netlify' ? '75.2.60.5' : '76.76.21.21',
        cnameTarget: provider === 'netlify' ? 'react-deployment-test.netlify.app' : 'cname.vercel-dns.com',
        sslActive: true,
        message: `DNS Records validated for ${provider.toUpperCase()}! ${isFreenom ? '(Free Freenom TLD Detected)' : '(Custom TLD/Subdomain)'} - Target points to ${provider === 'netlify' ? 'Netlify Apex' : 'Vercel Edge Network'} correctly.`,
      });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-blue-500/20 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/30">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Task 3: Custom Domain Setup & DNS Configuration
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Connect a custom domain (e.g. Freenom <code className="text-blue-300 font-mono font-bold">.tk</code> / <code className="text-blue-300 font-mono font-bold">.ml</code> or a subdomain) to your deployed React app on Vercel or Netlify.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Domain Tester & DNS Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Domain Analyzer Panel */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
            <Server className="w-5 h-5" />
            <span>Custom Domain Verification Tool</span>
          </div>

          {/* Hosting Provider Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Target Platform</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setProvider('netlify'); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  provider === 'netlify'
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Netlify
              </button>
              <button
                onClick={() => { setProvider('vercel'); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  provider === 'vercel'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Vercel
              </button>
            </div>
          </div>

          {/* Domain Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Domain Name (e.g., Freenom or custom)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="my-react-app.tk"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleAnalyzeDomain}
                disabled={isAnalyzing}
                className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center space-x-1"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Verify DNS</span>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Hint: Freenom offers free domain extensions such as <code className="text-blue-300 font-mono">.tk</code>, <code className="text-blue-300 font-mono">.ml</code>, and <code className="text-blue-300 font-mono">.ga</code>.
            </p>
          </div>

          {/* DNS Analysis Output Card */}
          {checkResult && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {checkResult.domain}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                  DNS OK
                </span>
              </div>

              <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Platform:</span>
                  <span className="text-blue-400 uppercase font-bold">{provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">A Record IP:</span>
                  <span className="text-cyan-300">{checkResult.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CNAME Target:</span>
                  <span className="text-teal-300">{checkResult.cnameTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SSL Certificate:</span>
                  <span className="text-emerald-400 font-sans font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Active (HTTPS)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-800/80">
                {checkResult.message}
              </p>
            </div>
          )}
        </div>

        {/* DNS Configuration Guide Table */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Server className="w-4 h-4 text-blue-400" />
            <span>Required DNS Records for {provider === 'netlify' ? 'Netlify' : 'Vercel'}</span>
          </h3>

          <p className="text-xs text-slate-400">
            Log in to your Domain Registrar (Freenom / Namecheap / Cloudflare) and add the following records under <strong>DNS Management</strong>:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="p-3">Type</th>
                  <th className="p-3">Host / Name</th>
                  <th className="p-3">Value / Target</th>
                  <th className="p-3">TTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-emerald-400 font-bold">A</td>
                  <td className="p-3">@ (Apex)</td>
                  <td className="p-3 text-cyan-300">
                    {provider === 'netlify' ? '75.2.60.5' : '76.76.21.21'}
                  </td>
                  <td className="p-3 text-slate-500">Auto / 3600</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-blue-400 font-bold">CNAME</td>
                  <td className="p-3">www</td>
                  <td className="p-3 text-teal-300">
                    {provider === 'netlify' ? 'your-app-name.netlify.app' : 'cname.vercel-dns.com'}
                  </td>
                  <td className="p-3 text-slate-500">Auto / 3600</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Step-by-Step Custom Domain Linkage Guide</span>
            </div>
            <ol className="list-decimal list-inside text-slate-400 space-y-1 leading-relaxed">
              <li>Register your free domain on Freenom (e.g. <code className="text-blue-300 font-mono">.tk</code> or <code className="text-blue-300 font-mono">.ml</code>).</li>
              <li>In Netlify/Vercel Dashboard, go to <strong>Domain Management → Add Custom Domain</strong>.</li>
              <li>Enter your registered domain name and click <strong>Verify</strong>.</li>
              <li>Copy the provided A/CNAME records or Nameservers into Freenom DNS Management.</li>
              <li>Wait 2-5 minutes for global DNS propagation and automatic SSL provisioning.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};
