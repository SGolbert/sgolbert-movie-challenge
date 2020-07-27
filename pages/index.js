import Head from "next/head";

export async function getStaticProps() {
  let movies = [];

  for (let index = 1; index <= 1; index++) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${index}`;

    const res = await fetch(url);
    const moviePage = await res.json();

    movies = movies.concat(
      moviePage.results.map((result) => {
        return {
          id: result.id.toString(),
          title: result.title,
          note: result.vote_average,
          image: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        };
      })
    );
  }

  return {
    props: {
      movies,
    },
  };
}

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Movie Database Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Best rated movies at The Movie Database</h1>
        <button>Test</button>
        <ul>
          {props.movies.map((movie) => (
            <li>
              <p>{movie.title}</p>
              <p>{movie.note}</p>
              <p>{movie.image}</p>
              <img src={movie.image} />
            </li>
          ))}
        </ul>
        {/* {props.movies.map((movie) => (
          <img src="{movie.image}" />
        ))} */}
      </main>
    </div>
  );
}
