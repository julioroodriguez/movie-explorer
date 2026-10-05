import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

import { MovieService } from '../../../../core/services/movie.service';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

const movieServiceMock = {

  getPopularMovies: jasmine
    .createSpy('getPopularMovies')
    .and.returnValue(
      of({
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0
      })
    ),

  getTrendingMovies: jasmine
    .createSpy('getTrendingMovies')
    .and.returnValue(
      of({
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0
      })
    ),

  getUpcomingMovies: jasmine
    .createSpy('getUpcomingMovies')
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
    imports: [HomeComponent],

    providers: [

      provideRouter([]),

      {
        provide: MovieService,
        useValue: movieServiceMock
      }

    ]

  }).compileComponents();

  fixture =
    TestBed.createComponent(HomeComponent);

  component =
    fixture.componentInstance;

  fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
