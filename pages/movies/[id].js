import Head from "next/head";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];

  for (let index = 1; index <= 1; index++) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${index}`;

    const res = await fetch(url);
    const moviePage = await res.json();

    paths = paths.concat(
      moviePage.results.map((result) => {
        return {
          params: {
            id: result.id.toString(),
          },
        };
      })
    );
  }

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ movie }) {
  console.log(movie);
  return (
    <div>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <h1>{movie.title}</h1>
    </div>
  );
}
