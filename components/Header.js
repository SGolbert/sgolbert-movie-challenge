import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const router = useRouter();

  function onSubmitHandler(event) {
    event.preventDefault();

    const movieInput = document.querySelector(".movieQuery");
    router.push(`/search/${encodeURIComponent(movieInput.value)}`);
  }

  return (
    <>
      <header className="header">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <form onSubmit={onSubmitHandler}>
          <input
            className="movieQuery"
            type="input"
            placeholder="Search for a movie..."
          />
        </form>
      </header>
      <style jsx>{`
        .header {
          align-items: center;
          border-bottom: 1px solid black;
          display: flex;
          font-size: 20px;
          text-align: left;
        }

        .header > a {
          margin-right: 50px;
        }

        .movieQuery {
          margin: 0 50px 0 0;
        }

        .searchButton {
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default Header;
