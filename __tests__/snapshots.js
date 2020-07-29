import React from "react";
import renderer from "react-test-renderer";
import Home from "../pages/index";
import CategoryListPage from "../pages/categories/[category_id]";
import MoviePage from "../pages/movies/[movie_id]";

it("renders homepage unchanged", () => {
  const categories = [
    { name: "Action", id: 1 },
    { name: "Crime", id: 2 },
  ];

  const tree = renderer.create(<Home categories={categories} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders category page unchanged", () => {
  const movieList = [
    { title: "Back to the future", id: 1 },
    { title: "Star Wars", id: 2 },
  ];

  const tree = renderer
    .create(<CategoryListPage movies={movieList} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
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
  const tree = renderer.create(<MoviePage movie={movieDetails} />).toJSON();
  expect(tree).toMatchSnapshot();
});
