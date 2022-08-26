import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps, router }: AppProps) {
  const mapMode = router.pathname === "/edit";

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <div>
        <header>
          <nav className="flex items-center justify-between flex-wrap bg-purple-500 p-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Link href="/">
                <a>
                  <span className="font-semibold text-xl tracking-tight">
                    地図マネージャー
                  </span>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/setting">
                <a className="inline-block text-base px-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-0">
                  設定
                </a>
              </Link>
            </div>
          </nav>
        </header>
        {mapMode ? (
          <main className="body-font">
            <Component {...pageProps} />
          </main>
        ) : (
          <main className="body-font">
            <div className="container p-1 mx-auto">
              <div className="mx-6">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default MyApp;
