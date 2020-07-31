import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import GoBack from "../../components/GoBack";

export async function getServerSideProps({ params }) {
  let movies = [];

  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${params.query}&page=1&include_adult=false`;

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

  return {
    props: {
      movies,
    },
  };
}

export default function MoviesByGenre({ movies }) {
  return (
    <Layout>
      <Head>
        <title>Search results</title>
      </Head>
      <main>
        <h1>Search results</h1>
        <div className="movieContainer">
          {movies.length === 0
            ? "No movie found"
            : movies.map((movie) => (
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
              ))}
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
};
