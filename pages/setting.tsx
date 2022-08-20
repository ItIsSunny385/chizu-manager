import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Status } from "../types/db";
import { getAllStatus, getDB } from "../utils/db";

const Setting: NextPage = () => {
  const [statuses, setStatuses] = useState<Status[]>();
  const [displayStatusModal, setDisplayStatusModal] = useState(false);

  useEffect(() => {
    (async () => {
      const db = await getDB();
      const newStatuses = await getAllStatus(db);
      setStatuses(newStatuses);
    })();
  }, []);

  return (
    <>
      <div className="my-5">
        <div className="my-3">
          <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
            ステータス
          </h2>
        </div>
        <div>
          {statuses == null ? (
            <p className="text-center">データ取得中です。</p>
          ) : statuses.length === 0 ? (
            <p className="text-center">データがありません。</p>
          ) : (
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
                  <tr key={x.name}>
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
          )}
        </div>
        <div className="ml-auto text-right">
          <Button onClick={() => setDisplayStatusModal(true)}>新規追加</Button>
        </div>
        {displayStatusModal && <Modal />}
      </div>
      <hr className="my-5" />
      <div className="my-5">
        <div className="my-3">
          <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
            中心座標
          </h2>
        </div>
      </div>
      <hr className="my-5" />
      <div className="my-5">
        <div className="my-3">
          <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
            Google Map
          </h2>
        </div>
      </div>
    </>
  );
};

export default Setting;
