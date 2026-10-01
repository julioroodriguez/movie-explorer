# 🎬 Movie Explorer

Movie Explorer is a responsive web application built with Angular and TypeScript that allows users to discover, search and explore movies using data from the TMDB API.

The project was created as part of my frontend development portfolio, with a focus on Angular architecture, reusable components, reactive programming with RxJS and API integration.

---

## ✨ Features

### Home

- Trending movies
- Popular movies
- Upcoming movies
- Responsive movie grids
- Reusable movie cards
- Navigation to movie details

### Search

- Search movies by title
- Reactive search with Angular Forms
- Debounced API requests
- Request cancellation using RxJS `switchMap`
- Loading, error and empty states
- Search result pagination

### Movie Details

- Movie title and overview
- Poster
- Release year
- Runtime
- Rating
- Genres
- Tagline
- Cast information
- Movie recommendations
- Dynamic routes using movie IDs

### Discover

- Browse movies using TMDB Discover
- Filter by genre
- Filter by release year
- Sort by:
  - Popularity
  - Rating
  - Release date
- Pagination
- Clear/reset filters

### UX

- Responsive layout
- Mobile-friendly movie grids
- Loading states
- Error states
- Empty result states
- Lazy-loaded images
- Keyboard focus styles
- Reduced-motion accessibility support

---

## 🛠️ Tech Stack

- Angular 18
- TypeScript
- HTML
- CSS
- RxJS
- Angular Reactive Forms
- Angular Router
- Angular HttpClient
- TMDB API
- Git
- GitHub

---

## 🧠 Angular Concepts Used

This project includes several core Angular concepts:

- Standalone components
- Component-based architecture
- Dependency injection
- Services
- Angular Router
- Dynamic route parameters
- Query parameters
- Reactive Forms
- `@Input`
- `@Output`
- HttpClient
- TypeScript interfaces
- Angular control flow:
  - `@if`
  - `@for`
  - `@empty`

RxJS is used for asynchronous data handling with operators such as:

- `switchMap`
- `forkJoin`
- `debounceTime`
- `distinctUntilChanged`
- `catchError`
- `finalize`
- `map`

---

## 🏗️ Project Structure

The application follows a feature-based structure:

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── movie-card/
│   │       ├── movie-section/
│   │       ├── pagination/
│   │       ├── navbar/
│   │       └── footer/
│   │
│   ├── features/
│   │   ├── home/
│   │   ├── search/
│   │   ├── discover/
│   │   └── movie/
│   │
│   ├── app.component.*
│   ├── app.config.ts
│   └── app.routes.ts
│
├── environments/
└── styles.css
```

---

## 🔗 Application Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/search` | Movie search |
| `/discover` | Movie discovery and filters |
| `/movie/:id` | Movie details |

Example:

```text
/movie/550
```

loads the movie whose TMDB ID is `550`.

---

## 🌐 TMDB API

Movie Explorer uses the [TMDB API](https://developer.themoviedb.org/) to retrieve movie information.

Main endpoints currently used include:

```text
/movie/popular
/movie/upcoming
/trending/movie/week
/search/movie
/discover/movie
/genre/movie/list
/movie/:id
/movie/:id/credits
/movie/:id/recommendations
```

The application uses TMDB's API Read Access Token for authentication.

---

## 🔐 Environment Configuration

API configuration is stored using Angular environment files.

Create:

```text
src/environments/environment.development.ts
```

using the example file:

```text
environment.development.example.ts
```

Example configuration:

```ts
export const environment = {
  production: false,
  tmdbApiUrl: 'https://api.themoviedb.org/3',
  tmdbToken: 'YOUR_TMDB_API_READ_ACCESS_TOKEN',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500'
};
```

The real development environment file is ignored by Git so credentials are not committed to the repository.

> Note: because this is a client-side Angular application, credentials used by the browser should not be considered fully secret in a production environment.

---

## 🚀 Running the Project Locally

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd movie-explorer
```

Install dependencies:

```bash
npm install
```

Configure your TMDB environment file.

Then start the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## 🏭 Production Build

To create a production build:

```bash
ng build
```

The compiled application will be generated inside:

```text
dist/movie-explorer/
```

---

## 📈 Development Progress

### ✅ Sprint 1 — Project Foundation

- Angular 18 project setup
- Git and GitHub configuration
- Standalone component architecture
- Application routing
- Home page
- Search page
- Movie detail route
- Shared navbar
- Shared footer
- Responsive base layout

### ✅ Sprint 2 — TMDB Integration

- Angular HttpClient configuration
- TMDB API environment configuration
- TypeScript movie models
- MovieService
- TMDB authentication
- Popular movies API integration
- Loading handling
- Error handling
- RxJS Observable integration

### ✅ Sprint 3 — Home Movie Sections

- Reusable `MovieCard` component
- Reusable `MovieSection` component
- Popular movies
- Trending movies
- Upcoming movies
- TMDB poster integration
- Parallel API requests using `forkJoin`
- Responsive movie grids
- Dynamic navigation to movie details

### ✅ Sprint 4 — Search & Movie Details

- Reactive movie search
- Angular Reactive Forms
- `FormControl.valueChanges`
- `debounceTime`
- `distinctUntilChanged`
- `switchMap`
- Search API integration
- Dynamic movie routes
- Route parameter handling with `ActivatedRoute`
- Complete movie information
- Cast integration
- Movie recommendations
- Loading, error and empty states

### 🚧 Sprint 5 — Discover & UX

- Movie discovery page
- Genre filters
- Release year filter
- Movie sorting
- Reusable pagination component
- Search pagination
- Discover pagination
- Improved responsive design
- Accessibility improvements
- Image lazy loading
- Improved empty and error states

### ⏳ Sprint 6 — Production

Planned:

- Testing
- Code cleanup
- Performance optimization
- Final UI polish
- Final documentation
- Screenshots
- AWS deployment
- CI/CD
- Production release

---

## 🎯 Project Goals

The main goal of Movie Explorer is to strengthen and demonstrate practical frontend development skills including:

- Building scalable Angular applications
- Consuming REST APIs
- Working with asynchronous data
- Reactive programming with RxJS
- Designing reusable components
- Managing application routing
- Creating responsive interfaces
- Applying clean project organization
- Using Git and feature branches
- Following a sprint-based development workflow

---

## 📌 Future Improvements

Possible future additions include:

- User favourites
- LocalStorage persistence
- Advanced filtering
- Actor detail pages
- Movie trailers
- Improved skeleton loading states
- Additional unit tests
- CI/CD pipeline
- AWS deployment

---

## 📄 Disclaimer

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie data and images are provided by TMDB.