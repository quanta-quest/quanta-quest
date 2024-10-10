export interface SearchResultItem {
  app: number;
  source_id: string;
  url: string;
  data: unknown;
}

export interface SearchResultDocument {
  key: string;
  app_id: number;
  // pharase_id: number;
  // doc_id: number;
  source_id: string;
  title: string;
  url: string;
  content: string;
  desc: string;
  extra: unknown;
}

export interface SearchResultWithAI {
  results: SearchResultDocument[];
  ai_result: string;
}
