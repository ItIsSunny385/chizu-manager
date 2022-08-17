import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="text-gray-600 body-font bg-gray-200">
        <div className="container flex flex-wrap p-3 flex-col flex-row">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900">
              <span className="ml-3 text-xl">地図マネージャー</span>
            </a>
          </Link>
        </div>
      </header>
      <main className="body-font">
        <div className="container p-1 mx-auto">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
