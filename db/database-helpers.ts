import * as SQLite from "expo-sqlite";

console.log("FUCKING DATABASE HELPERS ARE LOADING CUNT!");

const db = SQLite.openDatabase("aysa");

export const dbLoad = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists adminData (id integer primary key autoincrement, name text not null, age int not null);",
      null!,
      (_, results) => {
        const { insertId, rows, rowsAffected } = results;
        console.log("adminData table created");
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
        console.log("userData table created");
      },
      (_, error): boolean => {
        console.warn(error);
        return false;
      }
    );
  });
};

export const getAdminData = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from adminData",
        [],
        (_, results) => {
          const { insertId, rows, rowsAffected } = results;
          resolve(rows);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const getUserData = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from userData",
        [],
        (_, results) => {
          const { insertId, rows, rowsAffected } = results;
          resolve(rows);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const createAdmin = async (name: string, age: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into adminData (name, age) values (?,?)",
        [name, age],
        (_, results) => {
          const { insertId, rows, rowsAffected } = results;
          resolve({
            status: "adminData saved",
            data: rows,
            rowsAffected: rowsAffected,
            insertId: insertId
          });
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const updateAdmin = async (id: number, name: string, age: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "update adminData set name = ?, age = ? where id = ?",
        [name, age, id],
        (_, results) => {
          const { insertId, rows, rowsAffected } = results;
          resolve({
            status: "admin updated",
            data: rows,
            rowsAffected: rowsAffected,
            insertId: insertId
          });
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const deleteAdmin = async (id: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from adminData where id = ${id};`,
        [id],
        (_, results) => {
          const { insertId, rows, rowsAffected } = results;
          resolve({
            status: "admin deleted",
            data: rows,
            rowsAffected: rowsAffected,
            insertId: insertId
          });
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};
