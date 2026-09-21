import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Movie } from '../../../../core/models/movie.model';
import { MovieService } from '../../../../core/services/movie.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies: Movie[] = [];
  loading = false;
  errorMessage = '';

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
      this.loadPopularMovies();
  }

  loadPopularMovies(): void{
    this.loading = true;
    this.errorMessage = '';

    this.movieService.getPopularMovies().pipe(
      finalize(()=> this.loading = false)
    ).subscribe(
      {
        next: (response) => {
          this.movies = response.results;
        },
        error: (error) => {
          console.error('Error loading popular movies:', error);
          this.errorMessage = 'Could not load movies.';
        }
      }
    );
  }
}
