import type { NextPage } from "next";
import { useState } from "react";
import Button from "../components/Button";
import StatusModal from "../components/StatusModal";
import { Status } from "../types/db";
import { useDB, useStatuses } from "../utils/hook";
import { v4 as uuidv4 } from "uuid";
import { deleteStatus, putStatus } from "../utils/db";
import dynamic from "next/dynamic";
import { getMarkerBase64 } from "../utils/marker";
import Table from "../components/Table";
import Tbody from "../components/Tbody";
import Tr from "../components/Tr";
import Td from "../components/Td";
import H2 from "./H2";
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
          <H2>ステータス</H2>
        </div>
        <div>
          {statuses == null ? (
            <p className="text-center">データ取得中です。</p>
          ) : statuses.length === 0 ? (
            <p className="text-center">データがありません。</p>
          ) : (
            <Table>
              <Tbody>
                {statuses.map((x, i) => (
                  <Tr key={x.id}>
                    <Td>{x.name}</Td>
                    <Td>
                      <img
                        src={getMarkerBase64(x.color, x.abb, x.letterColor)}
                        width="26x"
                        height="26px"
                      />
                    </Td>
                    <Td>
                      <span>
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (i === 0 || db == null) return;
                            [statuses[i].order, statuses[i - 1].order] = [
                              statuses[i - 1].order,
                              statuses[i].order,
                            ];
                            await putStatus(db, statuses[i]);
                            await putStatus(db, statuses[i - 1]);
                            setCount((x) => x + 1);
                          }}
                        >
                          ↑
                        </a>
                      </span>
                      <span className="ml-2">
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (i === statuses.length || db == null) return;
                            [statuses[i].order, statuses[i + 1].order] = [
                              statuses[i + 1].order,
                              statuses[i].order,
                            ];
                            await putStatus(db, statuses[i]);
                            await putStatus(db, statuses[i + 1]);
                            setCount((x) => x + 1);
                          }}
                        >
                          ↓
                        </a>
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
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
          <H2>デフォルト地図</H2>
          <p className="my-1">
            地図作成時にデフォルトで表示される地図の Zoom
            レベルと中心座標を指定します。
          </p>
        </div>
        {db && <MapSetting db={db} />}
      </div>
    </>
  );
};

export default Setting;
