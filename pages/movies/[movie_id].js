import PropTypes from "prop-types";
import Head from "next/head";
import Layout from "../../components/Layout";
import GoBack from "../../components/GoBack";

export async function getServerSideProps({ params }) {
  // eslint-disable-next-line no-undef
  const url = `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}

export default function Movie({ movie }) {
  return (
    <Layout>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <main>
        <h1>{movie.title}</h1>
        <div className="movieDataContainer">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <p>
            <span className="detail">Language:</span> {movie.original_language}
          </p>
          <p>
            <span className="detail">Release date:</span> {movie.release_date}
          </p>
          <p>
            <span className="detail">Overview:</span> {movie.overview}
          </p>
          <p>
            <span className="detail">Number of votes:</span> {movie.vote_count}
          </p>
          <p>
            <span className="detail">Average rating:</span> {movie.vote_average}
          </p>
        </div>
        <GoBack />
      </main>
      <style jsx>
        {`
          .movieDataContainer {
            align-items: start;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: 1fr 1fr;
          }

          .movieDataContainer > img {
            grid-row: 1 / 6;
            margin: 0 auto;
            max-width: 500px;
            width: 100%;
          }

          .detail {
            font-weight: bold;
          }

          @media screen and (max-width: 750px) {
            .movieDataContainer {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </Layout>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    original_language: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    vote_count: PropTypes.number,
    vote_average: PropTypes.number,
  }),
};
