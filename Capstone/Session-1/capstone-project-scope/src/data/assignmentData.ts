import { ScopeData, FeatureItem, FlowStep, ThemeComparison } from '../types';

export const scopeData: ScopeData = {
  appName: 'SoundScape (React Edition)',
  originalApp: 'Spotify',
  problemStatement:
    'Modern music streaming platforms often become overloaded with cluttered algorithm feeds, intrusive promotional banners, and passive listening experiences. Users struggle to discover indie/local artists organically, lack instant mood-based dynamic playlist curation without manual search, and cannot host synchronized real-time listening rooms with friends without fragmented third-party browser extensions.',
  proposedSolution:
    'SoundScape is a focused, high-performance React web audio app that pairs a distraction-free audio player with a real-time AI mood audio mixer, instant social co-listening rooms, and organic artist discovery cards.',
  targetAudience: [
    {
      persona: 'Gen Z & Millennial Music Enthusiasts / Daily Commuters',
      description: 'Active daily listeners seeking quick contextual audio tailored to study, deep work, workouts, or mood shifts.',
      keyNeeds: [
        'Instant 1-click mood & genre blending',
        'Minimalist, distraction-free playback UI',
        'Fast lightweight mobile and web performance',
      ],
    },
    {
      persona: 'Indie Music Collectors & Social Playlisters',
      description: 'Music curators who love sharing new tracks, customizing playlist visuals, and hosting virtual listening parties with friends.',
      keyNeeds: [
        'Real-time synchronized listening sessions',
        'Custom canvas cover generator',
        'Organic community recommendation feeds',
      ],
    },
  ],
};

export const ecommerceFeatures: FeatureItem[] = [
  {
    id: 1,
    title: 'Real-Time Sales & Revenue Analytics Matrix',
    oneLiner: 'Gives sellers instant visibility into hourly/daily sales trends, average order value (AOV), and peak revenue windows to optimize business strategy.',
    detailedExplanation:
      'Presents interactive multi-axis area charts and KPI metrics showing Gross Merchandise Value (GMV), net revenue after returns, and unit sales velocity. Helps sellers time promotional blitzes accurately.',
    category: 'Analytics',
    iconName: 'TrendingUp',
  },
  {
    id: 2,
    title: 'AI-Powered Automated Inventory & Low-Stock Forecaster',
    oneLiner: 'Predicts SKU stockouts before they occur using historical velocity and seasonal demand, alerting sellers to reorder high-demand inventory automatically.',
    detailedExplanation:
      'Calculates Days of Inventory Remaining (DIR) based on recent sales spikes and lead times, offering 1-click supplier purchase order generation to prevent lost sales.',
    category: 'Inventory',
    iconName: 'PackageCheck',
  },
  {
    id: 3,
    title: 'Smart Order Fulfillment & Batch Dispatch Tracker',
    oneLiner: 'Streamlines order fulfillment into a single-click packaging workflow with automated shipping label generation and live courier tracking pipeline.',
    detailedExplanation:
      'Groups incoming pending orders by courier partner or destination zone, allowing sellers to batch print shipping manifests, invoices, and packing slips simultaneously.',
    category: 'Operations',
    iconName: 'Truck',
  },
  {
    id: 4,
    title: 'Dynamic Price Optimization & Competitor Benchmarking Tool',
    oneLiner: 'Recommends competitive pricing adjustments and automatically guards target profit margins during platform-wide festive discount sales.',
    detailedExplanation:
      'Monitors competitor pricing changes on identical listings and provides real-time pricing suggestions that preserve profit margins while boosting buy-box win probability.',
    category: 'Pricing',
    iconName: 'Tags',
  },
  {
    id: 5,
    title: 'Integrated Buyer Review Sentiment & Return Analysis Engine',
    oneLiner: 'Categorizes buyer reviews and return reasons using AI sentiment analysis so sellers can fix product defect or sizing issues before ratings decline.',
    detailedExplanation:
      'Parses return reason text (e.g. "zipper stuck", "smaller than expected") into actionable quality control reports, flagging defective batches early.',
    category: 'Customer Intelligence',
    iconName: 'MessageSquareText',
  },
];

export const resumeFeatures: FeatureItem[] = [
  {
    id: 1,
    title: 'Job Description ATS Alignment & Keyword Gap Analyzer',
    oneLiner: 'Parses target job postings against your resume to calculate a live ATS match score and pinpoint exact missing skills and keywords.',
    detailedExplanation:
      'Extracts required hard and soft skills from job descriptions, highlighting missing industry terms (e.g. "TypeScript", "CI/CD", "Cross-functional leadership") and suggesting seamless inline placement.',
    category: 'ATS Optimization',
    iconName: 'Target',
  },
  {
    id: 2,
    title: 'Dynamic AI Bullet Point Impact Enhancer (Quantification Engine)',
    oneLiner: 'Transforms passive job descriptions into metric-driven achievement statements powered by real quantified impact metrics.',
    detailedExplanation:
      'Uses language models to convert weak statements like "Managed social media account" into high-impact bullet points like "Grew organic Instagram engagement by 42% across 6 months by introducing weekly video tutorials".',
    category: 'Content Writing',
    iconName: 'Sparkles',
  },
  {
    id: 3,
    title: 'Role-Tailored AI Portfolio & Project Storyteller',
    oneLiner: 'Analyzes raw GitHub repos or project summaries to generate concise, recruiter-focused technical project summaries matching target roles.',
    detailedExplanation:
      'Summarizes key tech stack choices, architectural decisions, and problem-solving highlights from user repository links, presenting them in standardized STAR method formatting.',
    category: 'Project Showcase',
    iconName: 'FolderGit2',
  },
  {
    id: 4,
    title: 'Interactive AI Mock Interviewer & Resume Q&A Coach',
    oneLiner: 'Generates customized technical and behavioral interview questions based directly on claims made in your generated resume.',
    detailedExplanation:
      'Acts as a hiring manager persona, quizzing candidates on bullet points in their resume, evaluating voice or text answers, and delivering constructive feedback on response clarity.',
    category: 'Interview Prep',
    iconName: 'BotHandshake',
  },
  {
    id: 5,
    title: 'Real-Time Visual Tone & Executive Persona Scaler',
    oneLiner: 'Instantly rephrases resume tone to match targeted company culture—from conservative corporate executive to crisp startup engineer.',
    detailedExplanation:
      'Adjusts vocabulary formality, active verb selection, and length density with a simple slider, ensuring the candidate sounds perfectly calibrated for corporate finance or early-stage YC startups.',
    category: 'Personalization',
    iconName: 'SlidersHorizontal',
  },
];

export const flowSteps: FlowStep[] = [
  {
    id: 1,
    title: 'Landing Page & One-Click Authentication',
    description: 'User visits the application landing page, learns about features, and initiates a secure session.',
    actor: 'User',
    type: 'action',
    details: [
      'Visits responsive landing page displaying feature highlights and live ATS match teaser.',
      'Clicks "Get Started" or "Upload Resume".',
      'Logs in via Google OAuth or chooses "Quick Guest Session" to test immediately.',
    ],
  },
  {
    id: 2,
    title: 'Dashboard & Target Job Input',
    description: 'User enters the main dashboard workspace and inputs job parameters or existing draft.',
    actor: 'User',
    type: 'action',
    details: [
      'Redirected to main creation workspace.',
      'Selects resume baseline: Upload PDF/DOCX or Start from Scratch.',
      'Pastes target Job Description URL/Text to enable AI keyword alignment.',
    ],
  },
  {
    id: 3,
    title: 'AI Resume Optimization & Impact Generation',
    description: 'The background AI processing engine analyzes input data, computes ATS match score, and suggests metric enhancements.',
    actor: 'AI Engine',
    type: 'system',
    details: [
      'System calculates initial ATS Keyword Match Score (e.g. 64%).',
      'AI generates auto-quantified bullet points and missing skill chips.',
      'User accepts or edits AI bullet point rewrites with 1-click apply.',
    ],
  },
  {
    id: 4,
    title: 'Real-Time Layout Preview & PDF Export',
    description: 'User reviews the polished resume template, customizes styling, exports the final document, and safely logs out.',
    actor: 'User',
    type: 'completion',
    details: [
      'Live dynamic preview renders with strict ATS-friendly typography and margins.',
      'User selects typography style (Serif / Modern Sans / Clean Tech).',
      'Clicks "Export High-Res PDF" to download ATS-verified file.',
      'User saves profile to cloud or safely logs out of session.',
    ],
  },
];

export const themeComparisons: ThemeComparison[] = [
  {
    id: 'resume',
    name: 'AI-Powered Resume Builder',
    focus: 'LLM text parsing, ATS optimization algorithms, metric quantification, and dynamic PDF document layout.',
    complexity: 'High',
    marketImpact: 'Direct personal value for every job seeker, high viral sharing potential on LinkedIn/X, strong portfolio standout.',
    keySkills: ['Server-Side Gemini API Integration', 'Structured JSON Prompt Design', 'Dynamic PDF/HTML Rendering', 'Interactive Form State'],
    pros: [
      'Solves an urgent high-stakes problem (getting hired)',
      'Rich demonstration of modern generative AI capabilities',
      'Clear, measurable impact (ATS score improvements)',
    ],
    cons: [
      'Requires strict prompt engineering to prevent text hallucinations',
      'Demands precise typographic layout for PDF output',
    ],
  },
  {
    id: 'ecommerce',
    name: 'Smart E-Commerce Dashboard',
    focus: 'Data visualization (Recharts), inventory forecasting logic, batch order processing, and status tables.',
    complexity: 'High',
    marketImpact: 'Essential enterprise B2B tool stack showcasing data density handling and complex state orchestration.',
    keySkills: ['Complex Data Visualization (Recharts)', 'Multi-filter State Management', 'Batch UI Operations', 'Responsive Grid Layouts'],
    pros: [
      'Demonstrates mastery over high-density analytical dashboards',
      'Strongly aligned with frontend enterprise software developer roles',
    ],
    cons: [
      'Requires rich mock/real data pipelines to feel alive',
      'Less focus on generative AI capabilities',
    ],
  },
  {
    id: 'blog',
    name: 'AI Blog & Content Creator',
    focus: 'Rich text editing, automated SEO keyword generation, blog outline synthesis, and featured image prompts.',
    complexity: 'Medium',
    marketImpact: 'Great utility for content marketers, bloggers, and newsletter creators needing fast draft iterations.',
    keySkills: ['Rich Text WYSIWYG Editor', 'SEO Meta Analysis', 'Markdown Parsing', 'Image Generation Integration'],
    pros: [
      'Straightforward CRUD architecture with clear content lifecycle',
      'Fun visual output combining text and generated images',
    ],
    cons: [
      'Highly saturated project space with standard AI blog tools',
      'Fewer unique technical constraints compared to ATS Resume scoring',
    ],
  },
];

export const capstoneChoiceReasoning = {
  chosenTheme: 'AI-Powered Resume Builder',
  reason1Title: 'Direct Alignment with Modern AI/LLM Engineering Career Goals',
  reason1Description:
    'Building an AI-Powered Resume Builder forces hands-on mastery of full-stack AI architecture: prompt engineering, structured JSON extraction from LLMs, server-side API proxy security, and real-time state synchronization. As tech companies increasingly prioritize candidates with practical generative AI experience, demonstrating a production-grade LLM app provides a decisive edge in software engineering interviews.',
  reason2Title: 'Tangible Real-World Utility & High Personal / Peer Impact',
  reason2Description:
    'Resume creation is a high-anxiety task where generic templates fall short against Automated Applicant Tracking Systems (ATS). Creating a tool that provides real, quantified ATS match scoring and automated bullet point improvement delivers immediate value to my own career journey and fellow peers, making it a highly rewarding and showcase-worthy capstone project.',
};
