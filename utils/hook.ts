import { IDBPDatabase } from "idb";
import { useEffect, useState } from "react";
import { Chizu, Config, Status } from "../types/db";
import {
  ChizuManagerDB,
  getAllStatus,
  getDB,
  getConfig,
  getChizu,
  getAllChizu,
} from "./db";

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

export const useConfig = (db: IDBPDatabase<ChizuManagerDB>) => {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    (async () => {
      const newConfig = await getConfig(db);
      setConfig(newConfig);
    })();
  }, [db]);

  return config;
};

export const useChizu = (db: IDBPDatabase<ChizuManagerDB>, key: string) => {
  const [chizu, setChizu] = useState<Chizu | null>();

  useEffect(() => {
    (async () => {
      const newChizu = await getChizu(db, key);
      setChizu(newChizu);
    })();
  }, [db, key]);

  return chizu;
};

export const useChizues = (
  db: IDBPDatabase<ChizuManagerDB> | undefined,
  count: number
) => {
  const [chizues, setChizues] = useState<Chizu[]>();

  useEffect(() => {
    (async () => {
      if (db != null) {
        const data = await getAllChizu(db);
        setChizues(data);
      } else {
        setChizues([]);
      }
    })();
  }, [db, count]);

  return chizues;
};
