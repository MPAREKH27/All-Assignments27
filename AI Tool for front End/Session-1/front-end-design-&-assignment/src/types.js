export type TaskId = 'task1' | 'task2' | 'task3' | 'task4' | 'playground';

export interface PromptVariation {
  id: string;
  title: string;
  promptText: string;
  structureHighlights: string[];
  pros: string;
  cons: string;
}

export interface DesignToolComparison {
  feature: string;
  figmaAi: string;
  uizard: string;
  manualTools: string;
  impactScore: string;
  speedupMultiplier: string;
}

export interface ZomatoAiUseCase {
  id: number;
  useCase: string;
  description: string;
  timeSaved: string;
  ethicalRiskTitle: string;
  ethicalRiskDescription: string;
  riskCategory: 'IP/Copyright' | 'Bias & Hallucination' | 'Privacy & Security';
  mitigationStrategy: string;
}
