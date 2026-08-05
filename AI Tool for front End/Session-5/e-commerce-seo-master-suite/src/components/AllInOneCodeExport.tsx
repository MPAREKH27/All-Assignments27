import React, { useState } from 'react';
import { AllTasksData } from '../types';
import { Code2, Copy, Check, Download, FileCode, Terminal } from 'lucide-react';

interface Props {
  data: AllTasksData;
}

export const AllInOneCodeExport: React.FC<Props> = ({ data }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const fullHeadHtml = `<!-- Task 1: Flipkart-Style Wireless Earbuds Product Page Meta Tags -->
<title>${data.task1.metaTitle}</title>
<meta name="description" content="${data.task1.metaDescription}" />
<meta name="keywords" content="${data.task1.keywords.join(', ')}" />
<meta name="robots" content="index, follow" />

<!-- OpenGraph / Social Media Meta Tags -->
<meta property="og:type" content="product" />
<meta property="og:title" content="${data.task1.metaTitle}" />
<meta property="og:description" content="${data.task1.metaDescription}" />
<meta property="og:site_name" content="Flipkart.com" />
<meta property="og:price:amount" content="1299" />
<meta property="og:price:currency" content="INR" />`;

  const blogFileContent = `================================================================================
ZOMATO-STYLE FOOD BLOG CONTENT: PANEER BUTTER MASALA
================================================================================

[BLOG POST INTRODUCTION]
${data.task2.blogIntro}

--------------------------------------------------------------------------------
[IMAGE ALT TEXTS]

Image Alt Text 1:
"${data.task2.altTexts[0]}"

Image Alt Text 2:
"${data.task2.altTexts[1]}"

Image Alt Text 3:
"${data.task2.altTexts[2]}"
================================================================================`;

  const myntraCopyText = `PRODUCT: ${data.task3.productName} (${data.task3.brand})
CATEGORY: Myntra Fashion Outerwear

DESCRIPTION:
"${data.task3.productDescription}"

PLAGIARISM CHECK REPORT:
Checker: ${data.task3.plagiarismReport.checker}
Uniqueness Score: ${data.task3.plagiarismReport.uniquenessScore}% UNIQUE
Plagiarism Score: ${data.task3.plagiarismReport.plagiarismScore}% PLAGIARIZED
Status: ${data.task3.plagiarismReport.status}`;

  const task4HtmlSnippet = data.task4.htmlSnippet;

  const task5Json = JSON.stringify({
    seedKeywords: data.task5.keywords,
    clusters: data.task5.clusters,
    reachExplanation: data.task5.oneLineExplanation
  }, null, 2);

  return (
    <div className="space-y-6" id="all-code-export-container">
      {/* Header Banner */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Code2 className="w-4 h-4" />
              <span>Full Code Repository & Deliverables</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Full Source Code & Files Output</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Inspect or copy the complete, ready-to-use code snippets for all 5 SEO tasks.
            </p>
          </div>
        </div>
      </div>

      {/* Code Blocks List */}
      <div className="space-y-6">
        {/* Task 1 Code */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4" /> Task 1: Flipkart Earbuds &lt;head&gt; HTML Snippet
            </span>
            <button
              onClick={() => handleCopy(fullHeadHtml, 'task1')}
              className="text-xs text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-1"
            >
              {copiedSection === 'task1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'task1' ? 'Copied' : 'Copy HTML'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-yellow-300/90 leading-relaxed overflow-x-auto">
            {fullHeadHtml}
          </pre>
        </div>

        {/* Task 2 Code */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4" /> Task 2: /blogContent.txt (Zomato Food Blog Content)
            </span>
            <button
              onClick={() => handleCopy(blogFileContent, 'task2')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              {copiedSection === 'task2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'task2' ? 'Copied' : 'Copy File Content'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-rose-300/90 leading-relaxed overflow-x-auto">
            {blogFileContent}
          </pre>
        </div>

        {/* Task 3 Code */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4" /> Task 3: Myntra Denim Jacket Description & Plagiarism Report
            </span>
            <button
              onClick={() => handleCopy(myntraCopyText, 'task3')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              {copiedSection === 'task3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'task3' ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-indigo-300/90 leading-relaxed overflow-x-auto">
            {myntraCopyText}
          </pre>
        </div>

        {/* Task 4 Code */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4" /> Task 4: Edited Cricket Gear E-Commerce HTML Snippet
            </span>
            <button
              onClick={() => handleCopy(task4HtmlSnippet, 'task4')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              {copiedSection === 'task4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'task4' ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-amber-300/90 leading-relaxed overflow-x-auto">
            {task4HtmlSnippet}
          </pre>
        </div>

        {/* Task 5 Code */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Task 5: Food Delivery Keyword Clusters (JSON Architecture)
            </span>
            <button
              onClick={() => handleCopy(task5Json, 'task5')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              {copiedSection === 'task5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'task5' ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-cyan-300/90 leading-relaxed overflow-x-auto">
            {task5Json}
          </pre>
        </div>
      </div>
    </div>
  );
};
