import App from "next/app";
import "styles/mvp.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <style jsx global>
          {`
            .pagination {
              display: flex;
              justify-content: center;
              list-style-type: none;
              padding: 0;
              margin: 0 auto;
            }

            .pagination > li {
              margin-right: 20px;
              cursor: pointer;
              text-decoration: none;
            }

            .pagination > li.active > a {
              font-size: 1.5rem;
              font-weight: bold;
            }
          `}
        </style>
      </>
    );
  }
}
