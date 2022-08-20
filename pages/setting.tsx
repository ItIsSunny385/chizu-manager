import type { NextPage } from "next";

const statuses = [
  { name: "未訪問", color: "緑" },
  { name: "不在", color: "水色" },
  { name: "会えた", color: "オレンジ" },
  { name: "外国人", color: "黄色" },
  { name: "拒否", color: "赤" },
];

const Setting: NextPage = () => {
  return (
    <>
      <div className="my-5">
        <div className="my-3">
          <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
            ステータス
          </h2>
        </div>
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                ステータス名
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                色
              </th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((x, i) => (
              <tr>
                <td
                  className={`${
                    i !== 0 ? "border-t-2 border-gray-200" : ""
                  } px-4 py-3`}
                >
                  {x.name}
                </td>
                <td
                  className={`${
                    i !== 0 ? "border-t-2 border-gray-200" : ""
                  } px-4 py-3`}
                >
                  {x.color}
                </td>
                <td
                  className={`${
                    i !== 0 ? "border-t-2 border-gray-200" : ""
                  } px-4 py-3`}
                >
                  <span>
                    <a href="#">編集</a>
                  </span>
                  <span className="ml-2">
                    <a href="#">削除</a>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Setting;
