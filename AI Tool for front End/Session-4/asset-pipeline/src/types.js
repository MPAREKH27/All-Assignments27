export interface AppIconItem {
  id: string;
  name: string;
  category: string;
  prompt: string;
  jpgUrl: string;
  webpUrl: string;
  pngUrl: string;
  jpgSize: string;
  webpSize: string;
  pngSize: string;
}

export interface ImageOptimizationData {
  filename: string;
  originalJpg: string;
  originalSize: string;
  optimizedWebp: string;
  optimizedSize: string;
  reductionPercentage: string;
  width: number;
  height: number;
}

export interface HeroPromptComparison {
  id: string;
  styleName: string;
  prompt: string;
  imageUrl: string;
  webpUrl: string;
  fileSize: string;
  strengths: string[];
  bestUseCases: string[];
}

export interface EngineDifference {
  feature: string;
  midjourneyObserved: string;
  fireflyObserved: string;
  impactOnUi: string;
}
