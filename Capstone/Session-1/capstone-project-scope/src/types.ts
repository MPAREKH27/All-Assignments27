export type TaskId = 'overview' | 'scope' | 'ecommerce' | 'resume' | 'flow' | 'capstone';

export interface ScopeData {
  appName: string;
  originalApp: string;
  problemStatement: string;
  proposedSolution: string;
  targetAudience: {
    persona: string;
    description: string;
    keyNeeds: string[];
  }[];
}

export interface FeatureItem {
  id: number;
  title: string;
  oneLiner: string;
  detailedExplanation: string;
  category: string;
  iconName: string;
}

export interface FlowStep {
  id: number;
  title: string;
  description: string;
  actor: 'User' | 'System' | 'AI Engine';
  type: 'action' | 'decision' | 'system' | 'completion';
  details: string[];
}

export interface ThemeComparison {
  id: string;
  name: string;
  focus: string;
  complexity: 'Medium' | 'High' | 'Very High';
  marketImpact: string;
  keySkills: string[];
  pros: string[];
  cons: string[];
}
