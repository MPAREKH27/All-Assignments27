export type TaskId = 'overview' | 'task1' | 'task2' | 'task3' | 'task4' | 'task5';

export interface TaskStatus {
  id: TaskId;
  title: string;
  subtitle: string;
  completed: boolean;
  uploadedArtifact?: string;
  notes?: string;
}

export interface WireframeSection {
  id: string;
  name: string;
  type: 'sidebar' | 'header' | 'player' | 'grid' | 'banner' | 'list';
  description: string;
  visible: boolean;
}

export interface SurprisingFeature {
  id: string;
  title: string;
  category: 'Search' | 'Featured Restaurants' | 'Promotional Banner' | 'Cart & Delivery';
  description: string;
  aiInsight: string;
  highlightCoordinates: { x: number; y: number; width: number; height: number };
}

export interface MovieCardData {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  voteCount: string;
  genre: string[];
  language: string;
  format: string;
  duration: string;
  releaseDate: string;
  synopsis: string;
}

export interface FigmaTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  previewUrl?: string;
  htmlCode: string;
  cssCode: string;
}

export interface HandoffStep {
  stepNumber: number;
  title: string;
  summary: string;
  detail: string;
  toolsRecommended: string[];
  bestPractices: string[];
  codeSnippet?: string;
}
