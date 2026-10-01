import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MovieResponse } from '../models/movie-response.model';
import { MovieDetails } from '../models/movie-details.model';
import { CreditsResponse } from '../models/credits-response.model';

import { GenreResponse } from '../models/genre-response.model';
import { DiscoverFilters } from '../models/discover-filters.model';


@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private readonly apiUrl = environment.tmdbApiUrl;
  private readonly token = environment.tmdbToken;

  private readonly headers = {
    Authorization: `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) { }

  getGenres(): Observable<GenreResponse> {
  return this.http.get<GenreResponse>(
    `${this.apiUrl}/genre/movie/list`,
    {
      headers: this.headers
    }
  );
}

discoverMovies(filters: DiscoverFilters): Observable<MovieResponse> {

  let params = new HttpParams()
    .set('sort_by', filters.sortBy ?? 'popularity.desc')
    .set('page', String(filters.page ?? 1))
    .set('include_adult', 'false')
    .set('include_video', 'false');

  if (filters.genreId) {
    params = params.set(
      'with_genres',
      String(filters.genreId)
    );
  }

  if (filters.year) {
    params = params.set(
      'primary_release_year',
      String(filters.year)
    );
  }

  if (filters.sortBy === 'vote_average.desc') {
    params = params.set(
      'vote_count.gte',
      '100'
    );
  }

  return this.http.get<MovieResponse>(
    `${this.apiUrl}/discover/movie`,
    {
      headers: this.headers,
      params
    }
  );
}
  getPopularMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/movie/popular`,
    {
      headers: this.headers
    }
  );
}

  getTrendingMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/trending/movie/week`,
    {
      headers: this.headers
    }
  );
}

getUpcomingMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/movie/upcoming`,
     {
      headers: this.headers
    }
  );
}

searchMovies(
  query: string,
  page: number = 1
): Observable<MovieResponse> {

  const params = new HttpParams()
    .set('query', query)
    .set('page', String(page))
    .set('include_adult', 'false');

  return this.http.get<MovieResponse>(
    `${this.apiUrl}/search/movie`,
    {
      headers: this.headers,
      params
    }
  );
}

getMovieDetails(id: number): Observable<MovieDetails> {
  return this.http.get<MovieDetails>(
   `${this.apiUrl}/movie/${id}`,
   {
    headers: this.headers,
   }
  );
}


getMovieCredits(id: number): Observable<CreditsResponse> {
  return this.http.get<CreditsResponse>(
   `${this.apiUrl}/movie/${id}/credits`,
   {
    headers: this.headers,
   }
  );
}


getMovieRecommendations(id: number): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
   `${this.apiUrl}/movie/${id}/recommendations`,
   {
    headers: this.headers,
   }
  );
}
}
