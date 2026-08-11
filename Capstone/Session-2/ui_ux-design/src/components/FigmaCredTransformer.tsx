import React, { useState } from 'react';
import { JOB_PROFILE_DATA, CRED_REWARDS_DATA } from '../data/mockData';
import { 
  Wand2, 
  Sparkles, 
  Briefcase, 
  Award, 
  Eye, 
  TrendingUp, 
  CreditCard, 
  Coins, 
  ShieldCheck, 
  Gift, 
  RefreshCw, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Star,
  Zap,
  ArrowLeftRight
} from 'lucide-react';

export const FigmaCredTransformer: React.FC = () => {
  const [promptInput, setPromptInput] = useState<string>('Generate layout for job profile dashboard');
  const [isTransformed, setIsTransformed] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userCoins, setUserCoins] = useState<number>(CRED_REWARDS_DATA.credCoins);
  const [claimedPerks, setClaimedPerks] = useState<string[]>([]);
  const [showDiffInspector, setShowDiffInspector] = useState<boolean>(false);

  const handleRunTransformation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsTransformed(!isTransformed);
    }, 800);
  };

  const handleClaimPerk = (perkId: string, cost: number) => {
    if (userCoins >= cost && !claimedPerks.includes(perkId)) {
      setUserCoins(prev => prev - cost);
      setClaimedPerks(prev => [...prev, perkId]);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-500 font-sans ${
      isTransformed 
        ? 'bg-[#0b0b0d] text-zinc-100' 
        : 'bg-slate-100 text-slate-800'
    }`}>
      
      {/* Exercise Header */}
      <div className={`max-w-6xl mx-auto mb-6 rounded-2xl p-5 border transition-all shadow-md flex flex-wrap items-center justify-between gap-4 ${
        isTransformed 
          ? 'bg-zinc-900/90 border-amber-500/30 text-white' 
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded border ${
              isTransformed 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-purple-100 text-purple-800 border-purple-300'
            }`}>
              Exercise 5: Figma AI Design Transformer
            </span>
            <h1 className="text-xl font-bold">Job Profile → CRED Rewards Transformation</h1>
          </div>
          <p className="text-xs opacity-80 mt-1">
            Generates initial layout from prompt, then transforms layout, icons, colors, and titles into a CRED-style luxury dark rewards dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDiffInspector(!showDiffInspector)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all ${
              showDiffInspector 
                ? 'bg-amber-500 text-black border-amber-600' 
                : isTransformed 
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700' 
                  : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {showDiffInspector ? 'Hide Design Diff' : 'Compare Diff'}
          </button>
        </div>
      </div>

      {/* Figma AI Prompt Simulator Input Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className={`p-4 rounded-2xl border transition-all shadow-lg flex flex-col sm:flex-row items-center gap-3 ${
          isTransformed 
            ? 'bg-zinc-900 border-amber-500/40 shadow-amber-500/5' 
            : 'bg-white border-purple-200 shadow-purple-500/5'
        }`}>
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
            <Wand2 className="w-5 h-5 text-purple-500 animate-pulse" />
            <span>Figma AI Prompt:</span>
          </div>

          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className={`flex-1 border rounded-xl px-4 py-2 text-xs font-medium outline-none transition-all ${
              isTransformed 
                ? 'bg-black/60 border-zinc-700 text-amber-200' 
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />

          <button
            onClick={handleRunTransformation}
            disabled={isGenerating}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap ${
              isTransformed
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:brightness-110'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Remapping Figma Tokens...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isTransformed ? 'Revert to Job Profile' : 'Transform to CRED Dashboard'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Comparative Diff Inspector Drawer */}
      {showDiffInspector && (
        <div className="max-w-6xl mx-auto mb-6 bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 text-xs space-y-2">
          <h3 className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-xs">
            <Layers className="w-4 h-4" /> Figma AI Token Remapping Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-2.5 bg-black/40 border border-amber-500/20 rounded-xl">
              <span className="text-amber-300 font-bold block">1. Color Palette:</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Shifted from Corporate White/Slate-200 to CRED Ultra-Dark #0B0B0D with Gold Metal Highlights.
              </p>
            </div>
            <div className="p-2.5 bg-black/40 border border-amber-500/20 rounded-xl">
              <span className="text-amber-300 font-bold block">2. Typography & Headers:</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                "Experience & Projects" → "Exclusive Member Perks", "Skills" → "CRED Coins Balance".
              </p>
            </div>
            <div className="p-2.5 bg-black/40 border border-amber-500/20 rounded-xl">
              <span className="text-amber-300 font-bold block">3. Iconography:</span>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Swapped standard briefcases & view eye icons for metallic coins, luxury badges & credit gauges.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container - Renders either Job Profile or CRED Rewards */}
      <div className="max-w-6xl mx-auto">
        {!isTransformed ? (
          /* STATE 1: JOB PROFILE DASHBOARD */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            
            {/* Header Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 pb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                AS
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-black text-slate-900">{JOB_PROFILE_DATA.name}</h2>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">PRO UNLOCKED</span>
                </div>
                <p className="text-sm font-semibold text-slate-600">{JOB_PROFILE_DATA.title} at {JOB_PROFILE_DATA.company}</p>
                <p className="text-xs text-slate-400">{JOB_PROFILE_DATA.location} • {JOB_PROFILE_DATA.experience}</p>
              </div>

              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">
                Edit Profile
              </button>
            </div>

            {/* Profile Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {JOB_PROFILE_DATA.stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs text-slate-500 font-bold uppercase">{stat.label}</span>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Skills & Recent Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" /> Key Design Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {JOB_PROFILE_DATA.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" /> Recent Featured Projects
                </h3>
                <div className="space-y-2">
                  {JOB_PROFILE_DATA.recentProjects.map((p, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{p.name}</span>
                        <span className="text-slate-500 text-[11px]">{p.role}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{p.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* STATE 2: CRED-STYLE REWARDS DASHBOARD */
          <div className="bg-[#0b0b0d] border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6 text-white relative overflow-hidden">
            
            {/* Background Neon Accent Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* CRED Metal Card Header */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-neutral-900 to-stone-950 border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-3 py-1 text-[10px] font-black tracking-widest bg-amber-500 text-black rounded uppercase">
                  {CRED_REWARDS_DATA.tier}
                </span>
                <h2 className="text-3xl font-black text-white tracking-wider">{CRED_REWARDS_DATA.userName}</h2>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-amber-200 font-mono">
                  <span>CREDIT SCORE: <strong className="text-emerald-400 font-black">{CRED_REWARDS_DATA.creditScore} EXCELLENT</strong></span>
                </div>
              </div>

              {/* Coin Counter Pill */}
              <div className="p-4 rounded-2xl bg-black/80 border border-amber-500/50 text-center space-y-1 shadow-inner min-w-[200px]">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> CRED COINS BALANCE
                </span>
                <p className="text-3xl font-black text-amber-300 font-mono">
                  {userCoins.toLocaleString()}
                </p>
              </div>

            </div>

            {/* Upcoming Credit Card Bills Row */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" /> Upcoming Credit Card Bills
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CRED_REWARDS_DATA.upcomingBills.map((bill, i) => (
                  <div key={i} className="p-3.5 bg-black/60 border border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white block">{bill.title}</span>
                      <span className="text-amber-400 font-mono text-[11px]">{bill.dueDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-white block">{bill.amount}</span>
                      <button className="text-[10px] font-bold text-emerald-400 underline">PAY NOW</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Perks Feed */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-widest text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" /> EXCLUSIVE MEMBER PERKS & DISCOUNTS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CRED_REWARDS_DATA.perks.map(perk => {
                  const isClaimed = claimedPerks.includes(perk.id);
                  return (
                    <div 
                      key={perk.id}
                      className={`p-5 rounded-2xl bg-gradient-to-br ${perk.bgGradient} border border-amber-500/30 flex flex-col justify-between space-y-4 shadow-xl relative group`}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">
                          {perk.brand}
                        </span>
                        <h4 className="font-bold text-sm text-white leading-snug">
                          {perk.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-200">
                          {perk.coinCost.toLocaleString()} Coins
                        </span>

                        <button
                          disabled={isClaimed || userCoins < perk.coinCost}
                          onClick={() => handleClaimPerk(perk.id, perk.coinCost)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isClaimed
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : userCoins < perk.coinCost
                                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                : 'bg-amber-400 text-black hover:bg-amber-300 shadow-md'
                          }`}
                        >
                          {isClaimed ? 'CLAIMED ✓' : 'CLAIM PERK'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
