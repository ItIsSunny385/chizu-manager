import dynamic from "next/dynamic";
import React from "react";
import { useDB } from "../utils/hook";
const MapMain = dynamic(() => import("../components/MapMain"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Edit = () => {
  const db = useDB();
  return db != null ? <MapMain db={db} /> : <React.Fragment />;
};

Edit.mapPage = true;

export default Edit;
