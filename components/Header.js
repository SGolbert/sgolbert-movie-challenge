import Link from "next/link";

function Header() {
  return (
    <>
      <header className="header">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </header>
      <style jsx>{`
        .header {
          border-bottom: 1px solid black;
          display: flex;
          font-size: 20px;
          text-align: left;
        }

        .header > a {
          margin-right: 50px;
        }
      `}</style>
    </>
  );
}

export default Header;
