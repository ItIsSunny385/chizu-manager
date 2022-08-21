import { IDBPDatabase } from "idb";
import { useEffect, useState } from "react";
import { Status } from "../types/db";
import { ChizuManagerDB, getAllStatus, getDB } from "./db";

export const useDB = (): IDBPDatabase<ChizuManagerDB> | undefined => {
  const [db, setDB] = useState<IDBPDatabase<ChizuManagerDB>>();

  useEffect(() => {
    (async () => {
      const newDB = await getDB();
      setDB(newDB);
    })();
  }, []);

  return db;
};

export const useStatuses = (
  db: IDBPDatabase<ChizuManagerDB> | undefined,
  count: number
): Status[] | undefined => {
  const [statuses, setStatuses] = useState<Status[]>();

  useEffect(() => {
    (async () => {
      if (db != null) {
        const newStatuses = await getAllStatus(db);
        setStatuses(newStatuses);
      } else {
        setStatuses(undefined);
      }
    })();
  }, [db, count]);

  return statuses;
};
