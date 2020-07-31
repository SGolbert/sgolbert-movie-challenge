import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../../../components/Layout";
import GoBack from "../../../components/GoBack";

export async function getStaticProps({ params }) {
  let movies = [];

  for (let index = 1; index <= 10; index++) {
    // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
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

export default function MoviesByGenre({ movies, category }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const currPage =
      localStorage.getItem(`movie_challenge_${category}_curr_page`) || 0;
    setCurrentPage(Number(currPage));
  }, []);

  function handlePageClick(data) {
    let selected = data.selected;
    localStorage.setItem(`movie_challenge_${category}_curr_page`, selected);
    setCurrentPage(selected);
  }

  // trick to restore state out of local storage for server rendered pages
  if (!hasMounted) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{category} movies</title>
      </Head>
      <main>
        <h1>{category} movies</h1>
        <div className="movieContainer">
          {movies.map((movie, index) =>
            index >= currentPage * 8 && index < (currentPage + 1) * 8 ? (
              <Link
                href={`/movies/[movie_id]`}
                as={`/movies/${movie.id}`}
                key={movie.id}
              >
                <a className="movieItem">
                  <img
                    height="513px"
                    width="342px"
                    src={`https://image.tmdb.org/t/p/w342${movie.image}`}
                  />
                  <p className="movieTitle">{movie.title}</p>
                </a>
              </Link>
            ) : (
              ""
            )
          )}
        </div>

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

        <GoBack />
      </main>
      <style jsx>{`
        .movieContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .movieItem {
          align-items: center;
          flex: 0 1 calc(50% - 20px);
          line-height: 1.65;
          justify-content: center;
          margin: 0 20px 20px 0;
          text-align: center;
          text-decoration: none;
        }

        .movieItem:hover {
          box-shadow: 4px 4px 1px blue;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .movieTitle:hover {
        }
      `}</style>
    </Layout>
  );
}

MoviesByGenre.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  category: PropTypes.string,
};
