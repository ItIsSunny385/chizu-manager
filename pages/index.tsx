import type { NextPage } from "next";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const Home: NextPage = () => {
  const router = useRouter();

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
      <div className="flex flex-wrap">
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
      </div>
    </>
  );
};

export default Home;
