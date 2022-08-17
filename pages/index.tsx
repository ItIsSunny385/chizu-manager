import type { NextPage } from "next";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const Home: NextPage = () => {
  return (
    <div className="mx-6">
      <div className="md:flex md:items-center my-6">
        <div>
          <Input type="text" />
        </div>
        <div className="mt-2 md:mt-0 md:ml-3">
          <Button>検索</Button>
        </div>
        <div className="mb-0 ml-auto text-right mt-3 md:mt-0">
          <Button>新規追加</Button>
        </div>
      </div>
      <div className="flex flex-wrap -m-4">
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
        <Card href="#" name="31-A" description="牛久市役所周辺" />
      </div>
    </div>
  );
};

export default Home;
