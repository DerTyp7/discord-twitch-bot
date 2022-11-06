const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database.sqlite");

function createDatabaseStructure() {
  db.serialize(() => {
    db.run(
      "CREATE TABLE server (id INTEGER, ownerId INTEGER, twitchOAuth TEXT)"
    );
  });
}

function insertServer(id, ownerId, twitchOAuth) {
  db.serialize(() => {
    db.run(
      `INSERT INTO server(id, ownerId, twitchOAuth) VALUES(${id}, ${ownerId}, '${
        twitchOAuth ? twitchOAuth : "null"
      }')`
    );
  });
}

// createDatabaseStructure();

module.exports = { db, insertServer, createDatabaseStructure };
