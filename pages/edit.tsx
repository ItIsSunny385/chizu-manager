import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDB } from "../utils/hook";
const MapMain = dynamic(() => import("../components/MapMain"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Edit: NextPage = () => {
  const db = useDB();
  const router = useRouter();
  const [id, setId] = useState<string>();

  useEffect(() => {
    const nextId = router.query.id;
    setId(nextId != null ? nextId.toString() : undefined);
  }, []);

  return db != null && id != null ? (
    <MapMain db={db} id={id} />
  ) : (
    <React.Fragment />
  );
};

export default Edit;
