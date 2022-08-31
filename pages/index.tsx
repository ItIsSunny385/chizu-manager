import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Tbody from "../components/Tbody";
import Td from "../components/Td";
import Tr from "../components/Tr";
import { deleteChizu } from "../utils/db";
import { useChizues, useDB } from "../utils/hook";

const Home: NextPage = () => {
  const router = useRouter();
  const db = useDB();
  const [count, setCount] = useState(0);
  const chizues = useChizues(db, count);

  return (
    <>
      <div className="md:flex md:items-center my-6">
        <div>
          <Input type="text" />
        </div>
        <div className="mt-2 md:mt-0 md:ml-3">
          <Button>検索</Button>
        </div>
        <div className="mb-0 ml-auto text-right mt-3 md:mt-0">
          <Button onClick={() => router.push(`/edit/?id=${uuidv4()}`)}>
            新規追加
          </Button>
        </div>
      </div>
      <div>
        {db == null || chizues == null ? (
          <p>データ取得中です。</p>
        ) : chizues.length === 0 ? (
          <p>データがありません。</p>
        ) : (
          <Table>
            <Tbody>
              {chizues.map((x) => (
                <Tr key={x.id}>
                  <Td>{x.name.length > 0 ? x.name : "（未設定）"}</Td>
                  <Td>{x.description}</Td>
                  <Td>
                    <Link href={`/edit/?id=${x.id}`}>
                      <a>編集</a>
                    </Link>
                    <a
                      href="#"
                      onClick={async () => {
                        await deleteChizu(db, x.id);
                        setCount((x) => x + 1);
                      }}
                      className="ml-2"
                    >
                      削除
                    </a>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default Home;
