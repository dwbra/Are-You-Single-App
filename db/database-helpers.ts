import {
  enablePromise,
  openDatabase,
  SQLiteDatabase
} from "react-native-sqlite-storage";
import { UserType, AdminType } from "../type-models";
enablePromise(true);

// const tableName = "user-data";

export const getDBConnection = async () => {
  return openDatabase({ name: "single-app-data.db", location: "default" });
};

export const createTable = async (db: SQLiteDatabase, tableName: string) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getData = async (db: SQLiteDatabase, tableName: string) => {
  try {
    //create two correctly typed array variables
    const userAccounts: UserType[] = [];
    const adminAccount: AdminType[] = [];

    //use a ternary to select which to correctly push data into before storing in db
    let data;
    data = tableName === "user-data" ? userAccounts : adminAccount;

    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`
    );
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get user accounts !!!");
  }
};

export const saveData = async (
  db: SQLiteDatabase,
  tableName: string,
  user: UserType[],
  admin: AdminType[]
) => {
  if (tableName === "user-data") {
    const userData = user || [];
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
      userData.map((i) => `(${i.id}, '${i.name}')`).join(",");
    return db.executeSql(insertQuery);
  } else {
    const adminData = admin || [];
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
      adminData.map((i) => `(${i.id}, '${i.name}')`).join(",");
    return db.executeSql(insertQuery);
  }
};

export const deleteRow = async (
  db: SQLiteDatabase,
  tableName: string,
  id: number
) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
