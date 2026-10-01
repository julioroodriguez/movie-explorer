import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';
import { Movie } from '../../../../core/models/movie.model';
import { MovieSectionComponent } from '../../../../shared/components/movie-section/movie-section.component';
import { MovieService } from '../../../../core/services/movie.service';
import { query } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MovieSectionComponent, PaginationComponent],
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
  currentPage = 1;
  totalPages = 1;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute
  ){

    

    this.searchControl.valueChanges.pipe(
      debounceTime(400),

      distinctUntilChanged(),

      switchMap(query => {
        const cleanQuery = query.trim();

        this.router.navigate([], {
      relativeTo: this.route,
      queryParams:{
        q: cleanQuery || null
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });

        if(cleanQuery.length<2){
          this.movies = [];
          this.hasSearched = false;
          return of(null);
        }

        this.loading =true;
        this.errorMessage = '';
        this.hasSearched = true;

        return this.movieService.searchMovies(cleanQuery, this.currentPage).pipe(
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

        this.totalPages = Math.min(
          response.total_pages, 500
        );
      }
    });

    
  }

  changePage(page: number):void {
      
    const query = this.searchControl.value.trim();

    if (query.length < 2){
      return;
    }

    this.currentPage = page;
    this.loading = true;

    this.movieService.searchMovies(query, page).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: response => {

        this.movies = response.results;

        this.totalPages = Math.min(response.total_pages, 500);

        window.scrollTo({
          top:0,
          behavior: 'smooth'
        });
      },
      error: error => {
        console.error('Error changing search page', error);
        this.errorMessage = 'No se pudieron cargar los resultados';
      }
    });

    }
}
