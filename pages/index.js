import Head from "next/head";
import Link from "next/link";
import { useState, useLayoutEffect, useEffect } from "react";
import ReactPaginate from "react-paginate";

export async function getStaticProps() {
  let movies = [];

  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  const fetchedCategories = await res.json();

  const categories = movies.concat(
    fetchedCategories.genres.map((result) => {
      return {
        id: result.id.toString(),
        name: result.name,
      };
    })
  );

  return {
    props: {
      categories,
    },
  };
}

export default function Home(props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const currPage =
      localStorage.getItem("movie_challenge_landing_curr_page") || 0;
    setCurrentPage(Number(currPage));
  }, []);

  function handlePageClick(data) {
    let selected = data.selected;

    localStorage.setItem("movie_challenge_landing_curr_page", selected);
    setCurrentPage(selected);
  }

  // trick to restore state out of local storage for SSG pages
  if (!hasMounted) {
    return null;
  }

  return (
    <div className="container">
      <Head>
        <title>Movie Database Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          These are the most popular movies at The Movie Database
        </h1>
        <ul>
          {props.categories.map((category, index) =>
            index >= currentPage * 4 && index < (currentPage + 1) * 4 ? (
              <li>
                <Link
                  href={`/categories/[category_id]/[genre]`}
                  as={`/categories/${category.id}/${category.name}`}
                >
                  <a>{category.name}</a>
                </Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>

        <div className="pagination">
          <ReactPaginate
            activeClassName={"active"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            containerClassName={"pagination"}
            initialPage={Number(currentPage)}
            marginPagesDisplayed={2}
            nextLabel={"next"}
            onPageChange={handlePageClick}
            pageCount={Math.ceil(props.categories.length / 4)}
            previousLabel={"previous"}
            pageRangeDisplayed={2}
            subContainerClassName={"pages pagination"}
          />
        </div>
      </main>
    </div>
  );
}
