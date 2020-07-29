import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 4);

    setCurrentPage(selected);

    // console.log(currentPage);
  }

  return (
    <div className="container">
      <Head>
        <title>Movie Database Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Best rated movies at The Movie Database</h1>
        <ul>
          {props.categories.map((category, index) =>
            index >= currentPage * 4 && index < (currentPage + 1) * 4 ? (
              <li>
                <Link
                  href={`/categories/[category_id]`}
                  as={`/categories/${category.id}`}
                >
                  <a>{category.name}</a>
                </Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>

        <div className="commentBox">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(props.categories.length / 4)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </main>
    </div>
  );
}
