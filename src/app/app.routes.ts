import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/pages/search/search.component')
        .then(m => m.SearchComponent)
  },
  {
    path: 'discover',
    loadComponent: () =>
      import('./features/discover/pages/discover/discover.component')
        .then(m => m.DiscoverComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie/pages/movie-detail/movie-detail.component')
        .then(m => m.MovieDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];