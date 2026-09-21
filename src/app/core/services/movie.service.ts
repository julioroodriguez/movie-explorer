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

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(
    `${this.apiUrl}/movie/popular`,
    {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
  );
}
}
