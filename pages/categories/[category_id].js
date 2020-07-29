import Head from "next/head";
import Link from "next/link";

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
      category: params.category_id,
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
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ movies, category }) {
  return (
    <div>
      <Head>
        <title>Category:</title>
      </Head>
      <h1>Category {category}</h1>
      <ul>
        {movies.map((movie) => (
          <li>
            <Link
              href={`/movies/[movie.id]`}
              as={`/movies/${movie.id}`}
              prefetch={false}
            >
              <a>{movie.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
