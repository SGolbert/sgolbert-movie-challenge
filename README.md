This website shows the most popular movies of [TMDB](https://www.themoviedb.org/) grouped by category. It has been bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

TMDB is a movie database open to the public through a REST API. Developers around the world can sign up, get a API key for free and then query the database in different ways.

This website uses the API to get the following kinds of data:

- List of genres
- List of movies by genre
- Single movie details

Each type of data is used by a different page, as explained in the following sections.

## Index page

The index page is used to display the different genres using **pagination**. It is _statically_ generated and therefore will be served very fast by the CDN without making an API call.

Once the user clicks on a genre, he will be taken to the next page: list of movies under that genre.

## Movies under a genre page

This page is also _statically_ generated fetching the first two pages of the list of movies for that genre, order by popularity. It is just as easy to statically generate either pagination or actual pages for all the movies of the genre, but that has been left out to avoid taxing the API unnecessarilly.

When a particular movie is clicked, the user will be taken to the movie's details.

## Movie detail page

This pages shows a series of characteristics about the movie, including the language, release date and release poster. This page is _server rendered_, because it would take a lot of API calls to statically generate all of the movie's detail pages. However, if the underlying data is stable it would be beneficial both to the users and the host to statically generate the detail pages, as that will guarantee only one API call per movie as opposed to thousands of calls for the most popular movies.
