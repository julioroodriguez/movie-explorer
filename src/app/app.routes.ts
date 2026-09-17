import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { SearchComponent } from './features/search/pages/search/search.component'; 
import { MovieDetailComponent } from './features/movie/pages/movie-detail/movie-detail.component'; 

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
     {
        path: 'search',
        component: SearchComponent,
    },
     {
        path: 'movie/:id',
        component: MovieDetailComponent,
    },
     {
        path: '**',
        redirectTo: '',
    },
];
