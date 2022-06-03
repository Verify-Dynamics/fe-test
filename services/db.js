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

module.exports = {
  exec,
  query,
  run,
};
