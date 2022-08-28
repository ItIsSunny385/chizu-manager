import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useDB } from "../utils/hook";
const MapMain = dynamic(() => import("../components/MapMain"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Edit: NextPage = () => {
  const db = useDB();
  const router = useRouter();

  return db != null && router.query.id != null ? (
    <MapMain db={db} id={router.query.id.toString()} />
  ) : (
    <React.Fragment />
  );
};

export default Edit;
