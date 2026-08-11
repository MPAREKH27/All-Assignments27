export interface DeploymentConfig {
  appName: string;
  buildFolder: 'dist' | 'build' | 'public';
  provider: 'netlify' | 'firebase' | 'vercel';
  customDomain: string;
  spaRewritesEnabled: boolean;
  ciCdEnabled: boolean;
}

export interface DomainCheckResult {
  domain: string;
  status: 'valid' | 'invalid' | 'checking';
  ipAddress?: string;
  cnameTarget?: string;
  sslActive?: boolean;
  message?: string;
}

export interface StepLog {
  id: string;
  stepNumber: number;
  title: string;
  command?: string;
  description: string;
  status: 'completed' | 'failed' | 'pending' | 'skipped';
  userNotes?: string;
}

export interface AiGuideResponse {
  prompt: string;
  guideText: string;
  source: 'gemini' | 'fallback';
  generatedAt: string;
}
