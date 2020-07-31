import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../components/Layout";

export async function getStaticProps() {
  let movies = [];

  // eslint-disable-next-line no-undef
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

function Home({ categories }) {
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
    if (selected > currentPage) {
      window.scrollTo(0, 0);
    }
    setCurrentPage(selected);
  }

  // trick to restore state out of local storage for server rendered pages
  if (!hasMounted) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Movie Database Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          These are the most popular movies at The Movie Database
        </h1>

        <div className="categoryContainer">
          {categories.map((category, index) =>
            index >= currentPage * 4 && index < (currentPage + 1) * 4 ? (
              <Link
                href={`/categories/[category_id]/[genre]`}
                as={`/categories/${category.id}/${category.name}`}
                key={category.id}
              >
                <a className="categoryItem">{category.name}</a>
              </Link>
            ) : (
              ""
            )
          )}
        </div>

        <div className="paginate">
          <ReactPaginate
            activeClassName={"active"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            containerClassName={"pagination"}
            initialPage={Number(currentPage)}
            marginPagesDisplayed={2}
            nextLabel={"next"}
            onPageChange={handlePageClick}
            pageCount={Math.ceil(categories.length / 4)}
            previousLabel={"previous"}
            pageRangeDisplayed={2}
            subContainerClassName={"pages pagination"}
          />
        </div>

        <style jsx>{`
          .categoryContainer {
            display: flex;
            flex-wrap: wrap;
          }

          .categoryItem {
            align-items: center;
            background: black;
            color: white;
            display: flex;
            flex: 0 1 calc(50% - 20px);
            font-size: 50px;
            height: 500px;
            line-height: 1.65;
            justify-content: center;
            margin: 0 20px 20px 0;
            text-align: center;
            text-decoration: none;
          }

          .categoryItem:hover {
            background: blue;
          }

          @media screen and (max-width: 650px) {
            .categoryItem {
              flex: 1 0 100%;
            }
          }
        `}</style>
      </main>
    </Layout>
  );
}

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default Home;
