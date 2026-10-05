import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

import { MovieService } from '../../../../core/services/movie.service';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

const movieServiceMock = {

  searchMovies: jasmine
    .createSpy('searchMovies')
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
    imports: [SearchComponent],

    providers: [

      provideRouter([]),

      {
        provide: MovieService,
        useValue: movieServiceMock
      }

    ]

  }).compileComponents();

  fixture =
    TestBed.createComponent(SearchComponent);

  component =
    fixture.componentInstance;

  fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
