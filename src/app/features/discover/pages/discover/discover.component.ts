import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { finalize } from 'rxjs';

import { Genre } from '../../../../core/models/genre.model';
import { Movie } from '../../../../core/models/movie.model';
import { MovieService } from '../../../../core/services/movie.service';

import { MovieSectionComponent } from '../../../../shared/components/movie-section/movie-section.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MovieSectionComponent,
    PaginationComponent
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit {

  genres: Genre[] = [];
  movies: Movie[] = [];

  currentPage = 1;
  totalPages = 1;

  loading = false;
  errorMessage = '';

  readonly currentYear =
    new Date().getFullYear();

  filterForm = new FormGroup({

    genreId:
      new FormControl<number | null>(null),

    year:
      new FormControl<number | null>(null),

    sortBy:
      new FormControl(
        'popularity.desc',
        { nonNullable: true }
      )

  });

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();
  }

  loadGenres(): void {

    this.movieService
      .getGenres()
      .subscribe({

        next: response => {
          this.genres = response.genres;
        },

        error: error => {
          console.error(
            'Error loading genres:',
            error
          );
        }

      });
  }

  loadMovies(): void {

    const {
      genreId,
      year,
      sortBy
    } = this.filterForm.getRawValue();

    this.loading = true;
    this.errorMessage = '';

    this.movieService
      .discoverMovies({
        genreId: genreId ?? undefined,
        year: year ?? undefined,
        sortBy,
        page: this.currentPage
      })
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({

        next: response => {

          this.movies = response.results;

          this.totalPages = Math.min(
            response.total_pages,
            500
          );

        },

        error: error => {

          console.error(
            'Error discovering movies:',
            error
          );

          this.errorMessage =
            'No se pudieron cargar las películas.';

        }

      });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadMovies();
  }

  clearFilters(): void {

    this.filterForm.reset({
      genreId: null,
      year: null,
      sortBy: 'popularity.desc'
    });

    this.currentPage = 1;

    this.loadMovies();
  }

  changePage(page: number): void {

    this.currentPage = page;

    this.loadMovies();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}