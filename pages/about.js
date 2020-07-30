import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import GoBack from "../components/GoBack";

function About() {
  return (
    <Layout>
      <Head>
        <title>Movie Database Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">A Next.js project by Sebastian Golbert</h1>

        <p className="message">
          This website has been creating using Next.js and the Movie Database
          API. The source code can be found{" "}
          <a
            href="https://github.com/SGolbert/sgolbert-movie-challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <GoBack />

        <style jsx>{`
          .message {
            margin-bottom: 50px;
          }
        `}</style>
      </main>
    </Layout>
  );
}

export default About;
