import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="text-gray-600 body-font bg-gray-200">
        <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900">
            <span className="ml-3 text-xl">地図マネージャー</span>
          </a>
        </div>
      </header>
      <main className="body-font">
        <div className="container p-1">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
