import React from "react";
import { render, cleanup } from "@testing-library/react";
import Home from "../pages/index";
import CategoryListPage from "../pages/categories/[category_id]/[genre]";
import MoviePage from "../pages/movies/[movie_id]";
import SearchPage from "../pages/search/[query]";

afterEach(cleanup);

it("renders homepage unchanged", () => {
  const categories = [
    { name: "Action", id: "1" },
    { name: "Crime", id: "2" },
  ];

  const { asFragment } = render(<Home categories={categories} />);
  expect(asFragment()).toMatchSnapshot();
});

const movieList = [
  {
    title: "Back to the future",
    id: "1",
    image: "/1234",
  },
  {
    title: "Star Wars",
    id: "2",
    image: "/1234",
  },
];

it("renders category page unchanged", () => {
  const { asFragment } = render(<CategoryListPage movies={movieList} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders search page unchanged", () => {
  const { asFragment } = render(<SearchPage movies={movieList} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders movie page unchanged", () => {
  const movieDetails = {
    title: "Back to the future",
    original_language: "en",
    release_date: "1980-01-01",
    overview: "Great movie!",
    vote_count: 10000,
    vote_average: 10,
    poster_path: "/1234",
  };
  const { asFragment } = render(<MoviePage movie={movieDetails} />);
  expect(asFragment()).toMatchSnapshot();
});
