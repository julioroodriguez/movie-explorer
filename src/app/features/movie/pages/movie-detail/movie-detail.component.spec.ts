import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const activatedRouteMock = {

  paramMap: of(
    convertToParamMap({
      id: '550'
    })
  )

};

const movieServiceMock = {

  getMovieDetails: jasmine
    .createSpy('getMovieDetails')
    .and.returnValue(
      of({
        id: 550,
        title: 'Fight Club',
        original_title: 'Fight Club',
        overview: 'Test overview',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        release_date: '1999-10-15',
        runtime: 139,
        vote_average: 8.4,
        vote_count: 1000,
        genres: [],
        original_language: 'en',
        status: 'Released',
        tagline: 'Test tagline'
      })
    ),

  getMovieCredits: jasmine
    .createSpy('getMovieCredits')
    .and.returnValue(
      of({
        id: 550,
        cast: []
      })
    ),

  getMovieRecommendations: jasmine
    .createSpy('getMovieRecommendations')
    .and.returnValue(
      of({
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0
      })
    )

};

  beforeEach(async () => {

  await TestBed.configureTestingModule({
    imports: [MovieDetailComponent],

    providers: [

      {
        provide: ActivatedRoute,
        useValue: activatedRouteMock
      },

      {
        provide: MovieService,
        useValue: movieServiceMock
      }

    ]

  }).compileComponents();

  fixture =
    TestBed.createComponent(MovieDetailComponent);

  component =
    fixture.componentInstance;

  fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
