import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';
import { Movie } from '../../../../core/models/movie.model';
import { MovieSectionComponent } from '../../../../shared/components/movie-section/movie-section.component';
import { MovieService } from '../../../../core/services/movie.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieSectionComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchControl = new FormControl('', {
    nonNullable: true
  });

  movies: Movie[] = [];

  loading = false;
  errorMessage = '';
  hasSearched = false;

  constructor(private movieService: MovieService){
    this.searchControl.valueChanges.pipe(
      debounceTime(400),

      distinctUntilChanged(),

      switchMap(query => {
        const cleanQuery = query.trim();

        if(cleanQuery.length<2){
          this.movies = [];
          this.hasSearched = false;
          return of(null);
        }

        this.loading =true;
        this.errorMessage = '';
        this.hasSearched = true;

        return this.movieService.searchMovies(cleanQuery).pipe(
          catchError(error => {
            console.error('Error searching movies:', error);
            
            this.errorMessage = 'No se pudo realizar la busqueda.';

            return of(null);
          }
        
        ),
        finalize(()=> {
          this.loading = false;
        })
        );
      })
    ).subscribe(response => {
      if(response){
        this.movies = response.results;
      }
    });
  }
}
