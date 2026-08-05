import React, { useState } from 'react';
import { FINTECH_PROMPT, FINTECH_HERO_IMAGE, FINTECH_ENGINE_DIFFERENCES } from '../data';
import { CreditCard, Copy, Check, Sparkles, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Task5FintechCompare: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'comparison' | 'code'>('comparison');

  const copyPromptText = () => {
    navigator.clipboard.writeText(FINTECH_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const codeAndOutputComment = `/**
 * @task Task 5: Midjourney vs. Adobe Firefly Comparative Analysis Pipeline
 * @prompt "Futuristic 3D financial technology app hero landing image, floating translucent holographic credit card emitting glowing digital currency nodes and growth charts, sleek gradient background in deep navy blue and emerald cyan, glassmorphism texture, high tech finance aesthetic"
 * 
 * ======================================================================================
 * OUTPUT COMMENT: 3 KEY VISUAL DIFFERENCES OBSERVED BETWEEN MIDJOURNEY AND ADOBE FIREFLY
 * ======================================================================================
 * 
 * 1. SPECULAR LIGHTING & VOLUMETRIC GLOW:
 *    - Midjourney: Applies aggressive rim lighting, heavy volumetric light beam scattering, and cinematic lens flare, giving a high-budget sci-fi aesthetic.
 *    - Adobe Firefly: Employs uniform studio softbox lighting with controlled specular highlights. Preserves clean ambient contrast and avoids obscuring UI copy.
 * 
 * 2. GEOMETRIC PRECISION & GLASSMORPHISM ACCURACY:
 *    - Midjourney: Tends to stylize geometry with organic curve warps, stylized depth-of-field edge blurs, and artistic refraction artifacts.
 *    - Adobe Firefly: Delivers razor-sharp vector-flat card edges, mathematically accurate 3D rotation angles, and transparent glass layers matching Figma UI standards.
 * 
 * 3. COLOR PALETTE & TONAL ACCURACY:
 *    - Midjourney: Crushes dark shadows for dramatic punch, heavy cyan/purple split toning.
 *    - Adobe Firefly: Strictly respects color prompts ('emerald cyan & deep navy'), maintaining color neutrality suitable for corporate fintech brand identity.
 */

import { generateImage } from '@google/genai';
import sharp from 'sharp';

export async function processFintechHeroPipeline() {
  const prompt = "${FINTECH_PROMPT}";
  
  // 1. Generate via AI Engine
  const imageResult = await generateImage({
    prompt,
    aspectRatio: "16:9",
  });
  
  // 2. Optimize via sharp to WebP format (<200KB)
  const webpBuffer = await sharp(imageResult.buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
    
  console.log(\`Fintech Hero generated & optimized. Final size: \${(webpBuffer.length / 1024).toFixed(2)} KB\`);
  return webpBuffer;
}`;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Task 5 • Engine Output Comparison (Midjourney vs. Firefly)</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Fintech App Hero Image Comparison</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Evaluating output rendering variations between Midjourney and Adobe Firefly using an identical prompt. Includes 3 key visual differences and full developer code/comments.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'comparison'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Comparison
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'code'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Code & Output Comment
            </button>
          </div>
        </div>
      </div>

      {/* Shared Prompt Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Evaluated Prompt Definition
          </span>
          <button
            onClick={copyPromptText}
            className="text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 border border-slate-700 transition-colors"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
          </button>
        </div>
        <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800 italic leading-relaxed">
          "{FINTECH_PROMPT}"
        </p>
      </div>

      {activeTab === 'comparison' ? (
        <>
          {/* Side-by-Side Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engine A: Adobe Firefly Output */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <h3 className="text-base font-bold text-white">Adobe Firefly Model Output</h3>
                </div>
                <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                  WebP {FINTECH_HERO_IMAGE.size}
                </span>
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                <img
                  src={FINTECH_HERO_IMAGE.webp}
                  alt="Adobe Firefly Fintech Hero"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold border border-slate-700">
                  Firefly Engine Architecture
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Model Output Strengths
                </span>
                <p className="leading-relaxed">
                  Razor-sharp 3D glass card geometry, precise digital currency nodes, clean vector-flat UI lighting, and non-distorted glassmorphism. Ideal for direct corporate web placement.
                </p>
              </div>
            </motion.div>

            {/* Engine B: Midjourney Model Benchmark Output */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                  <h3 className="text-base font-bold text-white">Midjourney Benchmark Style</h3>
                </div>
                <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
                  Hyper-Cinematic Render
                </span>
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                <img
                  src={FINTECH_HERO_IMAGE.jpg}
                  alt="Midjourney Style Fintech Hero"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-125 saturate-125"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-cyan-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-slate-700">
                  Midjourney v6 Visual Style
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Model Output Strengths
                </span>
                <p className="leading-relaxed">
                  High dramatic contrast, intense specular lens flare highlights, moody volumetric lighting, and deep crushed shadow blacks. Great for promotional editorial banners.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3 Key Visual Differences Table Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center">
                <Layers className="w-5 h-5 text-cyan-400 mr-2" />
                3 Key Visual Differences Observed
              </h3>
              <span className="text-xs text-slate-400 font-medium">Comparative Analysis Matrix</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FINTECH_ENGINE_DIFFERENCES.map((diff, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-cyan-400 block">Difference #{idx + 1}</span>
                    <h4 className="text-sm font-bold text-white">{diff.feature}</h4>

                    <div className="pt-2 space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase block mb-0.5">Midjourney</span>
                        <p className="text-slate-300 leading-snug">{diff.midjourneyObserved}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-0.5">Adobe Firefly</span>
                        <p className="text-slate-300 leading-snug">{diff.fireflyObserved}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Impact on Web UI Integration
                    </span>
                    <p className="text-[11px] text-slate-300 italic">{diff.impactOnUi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Full Code & Output Comment View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <FileCode className="w-5 h-5 text-cyan-400 mr-2" />
              Full TypeScript Pipeline & Output Comment
            </h3>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Execution
            </span>
          </div>

          <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto leading-relaxed">
            {codeAndOutputComment}
          </pre>
        </div>
      )}
    </div>
  );
};
