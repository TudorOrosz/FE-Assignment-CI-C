export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string | null;
  officialSite: string | null;
  rating: { average: number | null };
  network: { name: string } | null;
  image: { medium: string; original: string } | null;
  summary: string | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}
