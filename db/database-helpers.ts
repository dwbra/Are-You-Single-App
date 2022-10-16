import * as SQLite from "expo-sqlite";
import { boolean } from "yup";
import { UserType, AdminType } from "../type-models";

// // const tableName = "user-data";

// export const getDBConnection = async () => {
//   return SQLite.openDatabase("aysa");
// };

console.log("FUCKING DATABASE HELPERS ARE LOADING CUNT!");

const db = SQLite.openDatabase("aysa");
// console.log(db);

export const dbLoad = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists adminData (id integer primary key autoincrement, name text not null, age int not null);",
      null!,
      (_, results) => {
        const { insertId, rows, rowsAffected } = results;
        console.log("adminData table created as " + insertId);
      },
      (_, error): boolean => {
        console.warn(error);
        return false;
      }
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists userData (id integer primary key autoincrement, name text not null, number int not null);",
      null!,
      (_, results) => {
        const { insertId, rows, rowsAffected } = results;
        console.log("userData table created as " + insertId);
      },
      (_, error): boolean => {
        console.warn(error);
        return false;
      }
    );
  });
};

export const createAdmin = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into adminData (name, age) values (?,?)",
      ["daniel", "30"],
      (_, results) => {
        console.log("admin user is created " + results.rows);
      },
      (_, error): boolean => {
        console.warn(error);
        return false;
      }
    );
  });
};

// export const getData = async () => {
//   let data: any[] = [];
//   db.transaction((tx) => {
//     tx.executeSql("select * from admin-data", [], (_, { rows }) =>
//       console.log(JSON.stringify(rows))
//     );
//     tx.executeSql("select * from user-data", [], (_, { rows: { _array } }) =>
//       data.push(_array)
//     );
//   });

//   console.log(data);
// };

// export const createAdminTable = async () => {
//   return new Promise((resolve) => {
//     db.transaction((tx: any) => {
//       tx.executeSql(
//         "create table if not exists admin-data (id integer primary key autoincrement, name text not null, age int not null);",
//         (_: any, result: any) => {
//           resolve(result);
//           console.log("promise resolved");
//         },
//         (_: any, error: any): boolean => {
//           console.warn(error);
//           resolve([]);
//           return false;
//         }
//       );
//     });
//   });
// };
// createAdminTable();

// export const createAdminTable = async () => {
//   db.transaction(
//     (tx: any) => {
//       tx.executeSql(
//         "create table if not exists admin-data (id integer primary key autoincrement, name text not null, age int not null);"
//       );
//     },
//     (error: any) => {
//       console.log(error);
//     }
//   );
// };
// createAdminTable();

// export const getData = async (db: SQLiteDatabase, tableName: string) => {
//   try {
//     //create two correctly typed array variables
//     const userAccounts: UserType[] = [];
//     const adminAccount: AdminType[] = [];

//     //use a ternary to select which to correctly push data into before storing in db
//     let data;
//     data = tableName === "user-data" ? userAccounts : adminAccount;

//     const results = await db.executeSql(
//       `SELECT rowid as id,value FROM ${tableName}`
//     );
//     results.forEach((result) => {
//       for (let index = 0; index < result.rows.length; index++) {
//         data.push(result.rows.item(index));
//       }
//     });
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw Error("Failed to get user accounts !!!");
//   }
// };

// export const saveAdminData = async (db: any) => {
//   db.transaction((tx: any) => {
//     tx.executeSql(
//       "INSERT INTO admin-data (name, age) values (?, ?)",
//       ["gibberish", 0],
//       (txObj: any, resultSet: any) => console.log(resultSet),
//       (txObj: any, error: any) => console.log("Error", error)
//     );
//   });
// };

// export const getAdminData = async (db: any) => {
//   db.transaction((tx: any) => {
//     // sending 4 arguments in executeSql
//     tx.executeSql(
//       "SELECT * FROM admin-data",
//       null, // passing sql query and parameters:null
//       // success callback which sends two things Transaction object and ResultSet Object
//       (txObj: any, resultSet: any) => console.log(resultSet),
//       // failure callback which sends two things Transaction object and Error
//       (txObj: any, error: any) => console.log("Error ", error)
//     ); // end executeSQL
//   }); // end transaction
// };

// export const deleteRow = async (
//   db: SQLiteDatabase,
//   tableName: string,
//   id: number
// ) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };
