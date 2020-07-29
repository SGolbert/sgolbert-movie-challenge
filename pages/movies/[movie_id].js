import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const url = `https://api.themoviedb.org/3/movie/${params.movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}

export default function Post({ movie }) {
  return (
    <div>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <main>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <p>Language: {movie.original_language}</p>
        <p>Release date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
        <p>Number of votes: {movie.vote_count}</p>
        <p>Average rating: {movie.vote_average}</p>
      </main>
    </div>
  );
}
