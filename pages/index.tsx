import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="mx-6">
      <div className="md:flex md:items-center my-6">
        <div>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
          />
        </div>
        <div className="mt-2 md:mt-0 md:ml-3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded text-right"
            type="button"
          >
            検索
          </button>
        </div>
        <div className="mb-0 ml-auto text-right mt-3 md:mt-0">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded text-right"
            type="button"
          >
            新規追加
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -m-4">
        <div className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-2">
          <Link href="#">
            <a className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-100">
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                31-A
              </h2>
              <p className="leading-relaxed text-base">牛久市役所周辺</p>
            </a>
          </Link>
        </div>
        <div className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-2">
          <Link href="#">
            <a className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-100">
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                31-A
              </h2>
              <p className="leading-relaxed text-base">牛久市役所周辺</p>
            </a>
          </Link>
        </div>
        <div className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-2">
          <Link href="#">
            <a className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-100">
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                31-A
              </h2>
              <p className="leading-relaxed text-base">牛久市役所周辺</p>
            </a>
          </Link>
        </div>
        <div className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-2">
          <Link href="#">
            <a className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-100">
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                31-A
              </h2>
              <p className="leading-relaxed text-base">牛久市役所周辺</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
