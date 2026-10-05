import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { MovieService } from './movie.service';

import { environment }
  from '../../../environments/environment';

describe('MovieService', () => {

  let service: MovieService;

  let httpMock:
    HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service =
      TestBed.inject(MovieService);

    httpMock =
      TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpMock.verify();

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should request popular movies', () => {

  const mockResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  service
    .getPopularMovies()
    .subscribe(response => {

      expect(response)
        .toEqual(mockResponse);

    });

  const request =
    httpMock.expectOne(
      `${environment.tmdbApiUrl}/movie/popular`
    );

  expect(
    request.request.method
  ).toBe('GET');

  request.flush(mockResponse);

});

it('should search movies with query and page', () => {

  const mockResponse = {
    page: 2,
    results: [],
    total_pages: 5,
    total_results: 100
  };

  service
    .searchMovies('Dune', 2)
    .subscribe(response => {

      expect(response)
        .toEqual(mockResponse);

    });

  const request =
    httpMock.expectOne(req =>

      req.url ===
        `${environment.tmdbApiUrl}/search/movie`

      &&

      req.params.get('query') ===
        'Dune'

      &&

      req.params.get('page') ===
        '2'

    );

  expect(
    request.request.method
  ).toBe('GET');

  request.flush(mockResponse);

});
it('should discover movies using filters', () => {

  service.discoverMovies({
    genreId: 28,
    year: 2024,
    sortBy: 'popularity.desc',
    page: 3
  }).subscribe();

  const request =
    httpMock.expectOne(req =>

      req.url ===
        `${environment.tmdbApiUrl}/discover/movie`

    );

  expect(
    request.request.method
  ).toBe('GET');

  expect(
    request.request.params.get('with_genres')
  ).toBe('28');

  expect(
    request.request.params.get(
      'primary_release_year'
    )
  ).toBe('2024');

  expect(
    request.request.params.get('sort_by')
  ).toBe('popularity.desc');

  expect(
    request.request.params.get('page')
  ).toBe('3');

  request.flush({
    page: 3,
    results: [],
    total_pages: 10,
    total_results: 200
  });

});
});