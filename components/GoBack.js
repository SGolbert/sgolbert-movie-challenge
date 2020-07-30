import { useRouter } from "next/router";

export default function GoBack() {
  const router = useRouter();

  return (
    <>
      <button className="goback" onClick={() => router.back()}>
        Go back
      </button>
      {/* <style jsx>
        {`
          .goback {
            cursor: pointer;
            font-size: 1.2rem;
            margin: 20px 20px;
          }
        `}
      </style> */}
    </>
  );
}
