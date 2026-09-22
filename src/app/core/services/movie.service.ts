import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MovieResponse } from '../models/movie-response.model';



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
    `${this.apiUrl}trending/movie/week`,
    {
      headers: this.headers
    }
  );
}

getUpcomingMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/movie/popular`,
     {
      headers: this.headers
    }
  );
}
}
