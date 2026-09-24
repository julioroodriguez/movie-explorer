export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;
  runtime: number | null;

  vote_average: number;
  vote_count: number;

  genres: Genre[];

  original_language: string;
  status: string;
  tagline: string;
}