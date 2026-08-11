export type DeviceMode = 'mobile' | 'tablet' | 'desktop' | 'responsive';

export interface DeviceSpec {
  id: DeviceMode;
  name: string;
  width: number;
  height: number;
  iconName: string;
  description: string;
  uaString: string;
}

export interface LayoutDifference {
  feature: string;
  mobileView: string;
  tabletDesktopView: string;
  impact: string;
  icon: string;
}

export interface CrossBrowserIssue {
  id: string;
  featureName: string;
  chromeBehavior: string;
  firefoxBehavior: string;
  rootCause: string;
  solution: string;
  severity: 'low' | 'medium' | 'high';
}

export interface LighthouseMetric {
  name: string;
  key: string;
  beforeValue: string;
  afterValue: string;
  unit: string;
  scoreBefore: number; // 0-100
  scoreAfter: number; // 0-100
  description: string;
}

export interface LighthouseOpportunity {
  id: string;
  title: string;
  description: string;
  savings: string;
  category: 'Performance' | 'Accessibility' | 'Best Practices' | 'SEO';
  fixedInApp: boolean;
  fixActionKey: string;
}

export interface ChatGPTSuggestion {
  id: string;
  title: string;
  promptText: string;
  recommendation: string;
  impactSummary: string;
  codeSnippet: string;
  isApplied: boolean;
}

export interface AppOptimizationState {
  highContrastMode: boolean;
  optimizedImages: boolean;
  lazyLoadOffscreen: boolean;
  fontDisplaySwap: boolean;
  contentVisibility: boolean;
}

export interface TechProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  reviewsCount: number;
  tag: string;
  imageUrl: string;
  unoptimizedUrl: string;
  price: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}
