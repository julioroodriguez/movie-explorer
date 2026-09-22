import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { Movie } from '../../../../core/models/movie.model';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieSectionComponent } from '../../../../shared/components/movie-section/movie-section.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MovieSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

 popularMovies: Movie[] = [];
  trendingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  loading = false;
  errorMessage = '';

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
      this.loadHomeMovies();
  }

  loadHomeMovies(): void{
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      popular: this.movieService.getPopularMovies(),
      trending: this.movieService.getTrendingMovies(),
      upcoming: this.movieService.getUpcomingMovies()
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: ({ popular, trending, upcoming }) => {
        this.popularMovies = popular.results;
        this.trendingMovies = trending.results;
        this.upcomingMovies = upcoming.results;
      },
      error: (error) => {
        console.error('Error loading home movies', error);

        this.errorMessage = 'No se pudieron cargar las peliculas';
      }
    });
  }

}
