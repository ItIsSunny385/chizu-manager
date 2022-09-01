import { DBSchema, IDBPDatabase, openDB } from "idb";
import {
  Bound,
  BoundConverter,
  Chizu,
  ChizuConverter,
  Config,
  ConfigConverter,
  Converter,
  Status,
  StatusConverter,
} from "../types/db";

export interface ChizuManagerDB extends DBSchema {
  config: {
    value: {
      id: string;
      defaultLatitude: number;
      defaultLongitude: number;
      defaultZ: number;
    };
    key: string;
  };
  status: {
    value: {
      id: string;
      name: string;
      abb: string;
      color: string;
      order: number;
    };
    key: string;
    indexes: { "by-order": number };
  };
  chizu: {
    value: {
      id: string;
      name: string;
      description: string;
    };
    key: string;
    indexes: { "by-name": string };
  };
  bound: {
    value: {
      id: string;
      chizuId: string;
      lat: number;
      lng: number;
      order: number;
    };
    key: string;
    indexes: { "by-chizuId": string };
  };
}

export type StoreNames = "status" | "config" | "chizu" | "bound";

export const getDB = async () => {
  const db = await openDB<ChizuManagerDB>("chizu-manager", 1, {
    upgrade(db, oldVersion) {
      const statusStore = db.createObjectStore("status", {
        keyPath: "id",
        autoIncrement: false,
      });
      statusStore.createIndex("by-order", "order");
      const configStore = db.createObjectStore("config", {
        keyPath: "id",
        autoIncrement: false,
      });
      const chizuStore = db.createObjectStore("chizu", {
        keyPath: "id",
        autoIncrement: false,
      });
      chizuStore.createIndex("by-name", "name");
      const boundStore = db.createObjectStore("bound", {
        keyPath: "id",
        autoIncrement: false,
      });
      boundStore.createIndex("by-chizuId", "chizuId");
    },
  });
  return db;
};

export async function get<T>(
  db: IDBPDatabase<ChizuManagerDB>,
  storeName: StoreNames,
  key: string,
  converter: Converter<T>
): Promise<T | null> {
  const data = await db.get(storeName, key);
  return data != null ? converter.toInstance(data) : null;
}

export async function getAll<T>(
  db: IDBPDatabase<ChizuManagerDB>,
  storeName: StoreNames,
  indexName: never,
  converter: Converter<T>
): Promise<T[]> {
  const response = await db.getAllFromIndex(storeName, indexName);
  return response.map((x) => converter.toInstance(x));
}

export async function add<T>(
  db: IDBPDatabase<ChizuManagerDB>,
  storeName: StoreNames,
  data: T,
  converter: Converter<T>
): Promise<IDBValidKey> {
  const response = await db.add(storeName, converter.toData(data));
  return response;
}

export async function put<T>(
  db: IDBPDatabase<ChizuManagerDB>,
  storeName: StoreNames,
  data: T,
  converter: Converter<T>
): Promise<IDBValidKey> {
  const response = await db.put(storeName, converter.toData(data));
  return response;
}

export async function del(
  db: IDBPDatabase<ChizuManagerDB>,
  storeName: StoreNames,
  key: string
): Promise<void> {
  return await db.delete(storeName, key);
}

export const getStatus = async (
  db: IDBPDatabase<ChizuManagerDB>,
  key: string
) => get<Status>(db, "status", key, StatusConverter);

export const getAllStatus = async (db: IDBPDatabase<ChizuManagerDB>) =>
  getAll<Status>(db, "status", "by-order" as never, StatusConverter);

export const addStatus = async (
  db: IDBPDatabase<ChizuManagerDB>,
  data: Status
) => add<Status>(db, "status", data, StatusConverter);

export const putStatus = async (
  db: IDBPDatabase<ChizuManagerDB>,
  data: Status
) => put<Status>(db, "status", data, StatusConverter);

export const deleteStatus = async (
  db: IDBPDatabase<ChizuManagerDB>,
  key: string
) => del(db, "status", key);

export const getConfig = async (db: IDBPDatabase<ChizuManagerDB>) => {
  const config = await get<Config>(db, "config", "default", ConfigConverter);
  return (
    config ||
    ({
      id: "default",
      defaultLatitude: 35.6895014,
      defaultLongitude: 139.6917337,
      defaultZ: 13,
    } as Config)
  );
};

export const putConfig = async (
  db: IDBPDatabase<ChizuManagerDB>,
  data: Config
) => put<Config>(db, "config", data, ConfigConverter);

export const getChizu = async (db: IDBPDatabase<ChizuManagerDB>, key: string) =>
  get<Chizu>(db, "chizu", key, ChizuConverter);

export const getAllChizu = async (db: IDBPDatabase<ChizuManagerDB>) =>
  getAll<Chizu>(db, "chizu", "by-name" as never, ChizuConverter);

export const addChizu = async (db: IDBPDatabase<ChizuManagerDB>, data: Chizu) =>
  add<Chizu>(db, "chizu", data, ChizuConverter);

export const putChizu = async (db: IDBPDatabase<ChizuManagerDB>, data: Chizu) =>
  put<Chizu>(db, "chizu", data, ChizuConverter);

export const deleteChizu = async (
  db: IDBPDatabase<ChizuManagerDB>,
  key: string
) => del(db, "chizu", key);

export const getBound = async (db: IDBPDatabase<ChizuManagerDB>, key: string) =>
  get<Bound>(db, "bound", key, BoundConverter);

export const getAllBounds = async (db: IDBPDatabase<ChizuManagerDB>) =>
  getAll<Bound>(db, "bound", "by-chizuId" as never, BoundConverter);

export const getBounds = async (
  db: IDBPDatabase<ChizuManagerDB>,
  chizuId: string
) => {
  const all = await getAllBounds(db);
  return all
    .filter((x) => x.chizuId === chizuId)
    .sort((a, b) => a.order - b.order);
};

export const addBound = async (db: IDBPDatabase<ChizuManagerDB>, data: Bound) =>
  add<Bound>(db, "bound", data, BoundConverter);

export const putBound = async (db: IDBPDatabase<ChizuManagerDB>, data: Bound) =>
  put<Bound>(db, "bound", data, BoundConverter);

export const deleteBound = async (
  db: IDBPDatabase<ChizuManagerDB>,
  key: string
) => del(db, "bound", key);
