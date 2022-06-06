const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("quotes.db"), { fileMustExist: false });

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

function exec(sql) {
  return db.exec(sql);
}

function transaction(sql, items) {
  const insert = db.prepare(sql);

  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(item);
  });

  insertMany(items);
}

module.exports = {
  transaction,
  exec,
  query,
  run,
};
