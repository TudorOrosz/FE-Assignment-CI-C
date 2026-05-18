export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  rating: { average: number | null };
  summary: string | null;
  image: { medium: string; original: string } | null;
  premiered: string | null;
  officialSite: string | null;
  network: { name: string } | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}
