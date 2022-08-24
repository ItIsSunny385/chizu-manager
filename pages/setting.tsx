import type { NextPage } from "next";
import { useState } from "react";
import Button from "../components/Button";
import StatusModal from "../components/StatusModal";
import { Status } from "../types/db";
import { useDB, useStatuses } from "../utils/hook";
import { v4 as uuidv4 } from "uuid";
import { deleteStatus, putStatus } from "../utils/db";
import dynamic from "next/dynamic";
const MapSetting = dynamic(() => import("../components/MapSetting"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Setting: NextPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<Status>();
  const [count, setCount] = useState(0);
  const db = useDB();
  const statuses = useStatuses(db, count);

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
                  <tr key={x.id}>
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
                        <a href="#">↑</a>
                      </span>
                      <span className="ml-2">
                        <a href="#">↓</a>
                      </span>
                      <span className="ml-2">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedStatus(x);
                          }}
                        >
                          編集
                        </a>
                      </span>
                      <span className="ml-2">
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (db != null) {
                              await deleteStatus(db, x.id);
                              setCount((x) => x + 1);
                            }
                          }}
                        >
                          削除
                        </a>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {db != null && statuses != null && (
          <>
            <div className="ml-auto text-right">
              <Button
                onClick={() =>
                  setSelectedStatus({
                    id: uuidv4(),
                    name: "",
                    abb: "",
                    color: "#000000",
                    letterColor: "#FFFFFF",
                    order: statuses.length,
                  })
                }
              >
                新規追加
              </Button>
            </div>
            {selectedStatus && (
              <StatusModal
                target={selectedStatus}
                onClickCanel={() => {
                  setSelectedStatus(undefined);
                }}
                onClickOK={async (status) => {
                  await putStatus(db, status);
                  setCount((x) => x + 1);
                  setSelectedStatus(undefined);
                }}
              />
            )}
          </>
        )}
      </div>
      <hr className="my-5" />
      <div className="my-5">
        <div className="my-3">
          <h2 className="text-2xl font-medium title-font mb-2 text-gray-900">
            中心座標・Zスケール
          </h2>
        </div>
        {db && <MapSetting db={db} />}
      </div>
    </>
  );
};

export default Setting;
