import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input({ required: true}) movie!: Movie;

  private readonly imageBaseUrl = environment.tmdbImageBaseUrl;

  get posterUrl(): string {
    return `${this.imageBaseUrl}${this.movie.poster_path}`;
  }
}
