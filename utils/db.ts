import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Converter, Status, StatusConverter } from "../types/db";

export interface ChizuManagerDB extends DBSchema {
    status: {
        value: {
            id: string,
            name: string;
            color: string;
            order: number;
        };
        key: string;
        indexes: { 'by-order': number };
    },
}

export type StoreNames = "status";

export const getDB = async () => {
    const db = await openDB<ChizuManagerDB>('chizu-manager', 1, {
        upgrade(db) {
          const store = db.createObjectStore('status', {
            keyPath: 'id',
            autoIncrement: false,
          });
          store.createIndex('by-order', 'order');
        },
      });
    return db;
}

export async function get<T>(db: IDBPDatabase<ChizuManagerDB>, storeName: StoreNames, key: string, converter: Converter<T>): Promise<T | undefined> {
    const data = await db.get(storeName, key);
    return data && converter.toInstance(data);
}

export async function getAll<T>(db: IDBPDatabase<ChizuManagerDB>, storeName: StoreNames, indexName: never, converter: Converter<T>): Promise<T[]> {
    const response = await db.getAllFromIndex(storeName, indexName);
    return response.map(x => converter.toInstance(x));
}

export async function add<T>(db: IDBPDatabase<ChizuManagerDB>, storeName: StoreNames, data: T, converter: Converter<T>): Promise<IDBValidKey> {
    const response = await db.add(storeName, converter.toData(data));
    return response;
}

export async function put<T>(db: IDBPDatabase<ChizuManagerDB>, storeName: StoreNames, data: T, converter: Converter<T>): Promise<IDBValidKey> {
    const response = await db.put(storeName, converter.toData(data));
    return response;
}

export async function del<T>(db: IDBPDatabase<ChizuManagerDB>, storeName: StoreNames, key: string): Promise<void> {
    return await db.delete(storeName, key);
}

export const getStatus = async (db: IDBPDatabase<ChizuManagerDB>, key: string) => get<Status>(db, "status", key, StatusConverter);

export const getAllStatus = async (db: IDBPDatabase<ChizuManagerDB>) => getAll<Status>(db, "status", "by-order" as never, StatusConverter);

export const addStatus = async (db: IDBPDatabase<ChizuManagerDB>, data: Status) => add<Status>(db, "status", data, StatusConverter);

export const putStatus = async (db: IDBPDatabase<ChizuManagerDB>, data: Status) => put<Status>(db, "status", data, StatusConverter);

export const deleteStatus = async (db: IDBPDatabase<ChizuManagerDB>, key: string) => del(db, "status", key);