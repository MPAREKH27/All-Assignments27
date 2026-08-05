export interface Task1Data {
  title: string;
  product: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  headHtml: string;
}

export interface Task2Data {
  title: string;
  targetFile: string;
  dishName: string;
  blogIntro: string;
  altTexts: string[];
}

export interface SentenceMatch {
  text: string;
  matched: boolean;
  matchPercent: number;
}

export interface Task3Data {
  title: string;
  productName: string;
  brand: string;
  productDescription: string;
  plagiarismReport: {
    checker: string;
    uniquenessScore: number;
    plagiarismScore: number;
    status: string;
    wordCount: number;
    characterCount: number;
    readabilityGrade: string;
    sentenceBreakdown: SentenceMatch[];
    sourceMatches: string[];
  };
}

export interface FlaggedIssue {
  claim: string;
  reason: string;
}

export interface Task4Data {
  title: string;
  category: string;
  rawOutput: {
    title: string;
    description: string;
    altText1: string;
    altText2: string;
  };
  flaggedIssues: FlaggedIssue[];
  editedOutput: {
    title: string;
    description: string;
    altText1: string;
    altText2: string;
  };
  htmlSnippet: string;
}

export interface KeywordCluster {
  name: string;
  intent: string;
  keywords: string[];
  targetPageType: string;
  seoStrategy: string;
}

export interface Task5Data {
  title: string;
  keywords: string[];
  clusters: KeywordCluster[];
  oneLineExplanation: string;
}

export interface AllTasksData {
  task1: Task1Data;
  task2: Task2Data;
  task3: Task3Data;
  task4: Task4Data;
  task5: Task5Data;
}
