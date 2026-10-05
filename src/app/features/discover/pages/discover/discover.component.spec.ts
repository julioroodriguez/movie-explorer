import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { of } from 'rxjs';
import { MovieService } from '../../../../core/services/movie.service';
describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

const movieServiceMock = {

  getGenres: jasmine
    .createSpy('getGenres')
    .and.returnValue(
      of({
        genres: []
      })
    ),

  discoverMovies: jasmine
    .createSpy('discoverMovies')
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
    imports: [DiscoverComponent],

    providers: [
      {
        provide: MovieService,
        useValue: movieServiceMock
      }
    ]

  }).compileComponents();

  fixture =
    TestBed.createComponent(DiscoverComponent);

  component =
    fixture.componentInstance;

  fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
