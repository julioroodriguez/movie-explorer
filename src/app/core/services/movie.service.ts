import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MovieResponse } from '../models/movie-response.model';
import { MovieDetails } from '../models/movie-details.model';
import { CreditsResponse } from '../models/credits-response.model';

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

searchMovies(query: string): Observable<MovieResponse> {
  const params = new HttpParams()
  .set('query',query);

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
