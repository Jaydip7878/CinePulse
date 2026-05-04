# CinePulse

A modern React movie discovery app built with Vite.

## Overview

CinePulse helps users browse popular films, search for movies, and view polished movie detail pages with an Apple-like visual style.

## Features

- Popular movie discovery
- Search movies by title
- Featured movie hero on each page
- Movie detail view with summary, metadata, and genres
- Favorite movies support
- Responsive design and theme support

## Project structure

- `src/App.jsx` — main application shell and routes
- `src/pages/Home.jsx` — home page with search, pagination, and featured movie
- `src/pages/MovieDetail.jsx` — detailed movie view with enhanced styling
- `src/pages/Favorites.jsx` — favorites page
- `src/components/MovieCard.jsx` — reusable movie card component
- `src/services/api.js` — API calls to fetch movie data

## Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser to view the app.

## Notes

- The homepage keeps the featured movie visible while showing the full movie grid.
- The MovieDetail page has updated styling for clarity and a polished product feel.
- Use the `CinePulse` name for the project and branding.
