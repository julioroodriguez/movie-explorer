import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { MovieDetails } from '../../../../core/models/movie-details.model';
import { CastMember } from '../../../../core/models/cast-member.model';
import { Movie } from '../../../../core/models/movie.model';
import { MovieService } from '../../../../core/services/movie.service';
import { MovieSectionComponent } from '../../../../shared/components/movie-section/movie-section.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [MovieSectionComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movie: MovieDetails | null = null;

  cast: CastMember[] =[];

  recommendations: Movie[] = [];

  loading = true;

  errorMessage = '';

  readonly imageBaseUrl = environment.tmdbImageBaseUrl;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {

    this.route.paramMap.pipe(
      map(params => 
        Number(params.get('id'))
      ),

      switchMap(id => {
        this.loading = true;
        this.errorMessage = '';

        return forkJoin({
          movie:
          this.movieService.getMovieDetails(id),
          credits:
          this.movieService.getMovieCredits(id),
          recommendations:
          this.movieService.getMovieRecommendations(id)
        });

      })

    )
    .subscribe({

      next: ({movie,credits,recommendations}) => {
        this.movie = movie;

          this.cast =
            credits.cast.slice(0, 10);

          this.recommendations =
            recommendations.results;

          this.loading = false;
      },

      error: error => {
        console.error(
          'Error loading movie details:',
          error
        );
        
        this.errorMessage = 'No se pudo cargar la pelicula.';

        this.loading = false;

      }

    });

  }


}
