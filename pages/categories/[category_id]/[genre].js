import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

export async function getStaticProps({ params }) {
  let movies = [];

  for (let index = 1; index <= 2; index++) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${index}&with_genres=${params.category_id}`;

    const res = await fetch(url);
    const fetchedMovies = await res.json();

    movies = movies.concat(
      fetchedMovies.results.map((result) => {
        return {
          id: result.id.toString(),
          title: result.title,
          note: result.vote_average,
          image: result.poster_path,
        };
      })
    );
  }

  return {
    props: {
      movies,
      category: params.genre,
    },
  };
}

export async function getStaticPaths() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  const categoriesPage = await res.json();

  const paths = categoriesPage.genres.map((result) => {
    return {
      params: {
        category_id: result.id.toString(),
        genre: result.name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ movies, category }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const currPage =
      localStorage.getItem(`movie_challenge_${category}_curr_page`) || 0;
    console.log("currPage", currPage);
    setCurrentPage(Number(currPage));
  }, []);

  function handlePageClick(data) {
    let selected = data.selected;
    console.log(selected);
    localStorage.setItem(`movie_challenge_${category}_curr_page`, selected);
    setCurrentPage(selected);
  }

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Category:</title>
      </Head>
      <main>
        <h1>{category} movies</h1>
        <ul>
          {movies.map((movie, index) =>
            index >= currentPage * 9 && index < (currentPage + 1) * 9 ? (
              <li>
                <Link href={`/movies/[movie_id]`} as={`/movies/${movie.id}`}>
                  <a>{movie.title}</a>
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
            breakClassName={"break-me"}
            breakLabel={"..."}
            containerClassName={"pagination"}
            initialPage={Number(currentPage)}
            marginPagesDisplayed={2}
            nextLabel={"next"}
            onPageChange={handlePageClick}
            previousLabel={"previous"}
            pageCount={Math.ceil(movies.length / 9)}
            pageRangeDisplayed={2}
            subContainerClassName={"pages pagination"}
          />
        </div>

        <Link href="/">
          <a>Go back</a>
        </Link>
      </main>
    </div>
  );
}
