import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { provideRouter } from '@angular/router';
describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

 beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MovieCardComponent],
    providers: [
      provideRouter([])
    ]
  })
  .compileComponents();

  fixture = TestBed.createComponent(MovieCardComponent);
  component = fixture.componentInstance;

  component.movie = {
    id: 1,
    title: 'Test Movie',
    original_title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: null,
    release_date: '2024-01-01',
    vote_average: 8,
    vote_count: 100,
    popularity: 10,
    genre_ids: [28],
    original_language: 'en',
    adult: false,
    video: false
  };

  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
