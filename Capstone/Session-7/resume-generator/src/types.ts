export type ToneType = 
  | "inspirational" 
  | "funny" 
  | "serious" 
  | "sarcastic" 
  | "poetic" 
  | "philosophical" 
  | "energetic";

export interface ToneOption {
  id: ToneType;
  label: string;
  emoji: string;
  description: string;
  promptPrefix: string;
}

export interface QuoteResult {
  id: string;
  quote: string;
  tone: ToneType;
  model: string;
  source: string;
  promptUsed: string;
  timestamp: string;
}

export interface ResumeFormData {
  fullName: string;
  targetRole: string;
  experienceYears: string;
  skills: string;
  achievements: string;
  bio: string;
}

export interface ResumeSummaryResult {
  summary: string;
  source: string;
  provider: string;
  timestamp: string;
}

export interface BlogSummaryResult {
  summary: string;
  promptReceived: string;
  source: string;
  timestamp: string;
}

export interface APIErrorState {
  type: string;
  message: string;
  status?: number;
}

export type SimulatedErrorType = "none" | "network" | "invalid_key" | "rate_limit";
