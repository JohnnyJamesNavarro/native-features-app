import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    // Transaction for creating the database table in case it doesn't exist.
    // NOTE: In case it did exist, the query would be a success, not an error. Thus the promise will resolve.
    db.transaction((t) => {
      t.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        // this _ syntax means you want to ignore that argument.
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, latitute, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((t) => {
      t.executeSql(
        "INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?);",
        [title, imageUri, address, latitute, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((t) => {
      t.executeSql(
        "SELECT * FROM places;",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};
