# Full Stack Movie/Show watchlist application - uses React, Node, Express, Mongo - custom API as well as the TMDB developer API

## Backend Setups and needs

- [x] Name project - git init and npm init
- [x] Install backend dependencies (express, jsonwebtoken, axios, gravatar, mongoose, validator, bycryptjs)
- [x] Install concurrently for use with front end - write run dev script
- [x] Create the MongoDB Cluster for Movie Partners

  - [x] Connect cluster to Mongo Compass
  - [x] Set env vars for production cluster as well as dev cluster on local mongo instance
  - [x] Create db folder in backend and make db.js file
    - [x] Import Mongoose and connect to database

- [x] Configure dev environment in Postman to test routes
- [x] Sign up for TMDB API Develper Keys

  - https://www.themoviedb.org/documentation/api

- [x] Build Models
  - user - include userschema methods to remove password/tokens from json and get auth tokens
  - profile
  - watchlist
  - title
- [x] Build Routes
  - user
    - login
    - create new user
    - logout
    - delete user
  - profile
    - create/edit new/existing profile
    - get profile by id
  - watchlist
    - create new watchlist
    - delete watchlist
    - get watchlist by id
  - title
    - create new title
    - get title by id
    - get watchlist titles by array of ids - $in
- [x] Build auth middleware to authenticate users

## Frontend Setups and needs

- [x] Create react app in client folder
- [x] Clean up unwanted react app folders and assets
- [x] Install dependencies (axios, node-sass, react-router-dom)
- [x] Setup app to load from AppRouter file

* [x] Learn React useContext and useReducer (no Redux or 3rd party state management allowed!)

- [x] Build non-styled components to interact with custom API and TMDB API calls
  - [ ] Early components
    - Landing - trending movies and shows
    - TrendingMovies - component that holds the movies
    - TrendingShows - component that holds the shows
    - Media - component that shows the individual media item by id
    - Search - component search form for query TMDB API
    - SearchResults - component to display pagination result from user search
    - Add to Watchlist button
    - Invite Partner button
    - User Profile - display user profile data and link to watchlists
    - Watchlists - display watchlist names and partners
