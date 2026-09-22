import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../../core/models/movie.model';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-section.component.html',
  styleUrl: './movie-section.component.css'
})
export class MovieSectionComponent {

  @Input({ required: true}) title!: string;

  @Input({ required: true}) movies: Movie[] = [];

}
