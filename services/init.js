const db = require("../services/db");
const config = require("../config");

function createAuthorTable() {
  const sql =
    "CREATE TABLE IF NOT EXISTS author (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname text NOT NULL, lastname text NOT NULL, dob DATE NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);";
  return db.exec(sql);
}

function createQuoteTable() {
  const sql =
    "CREATE TABLE IF NOT EXISTS quote (id INTEGER PRIMARY KEY AUTOINCREMENT, quote text NOT NULL UNIQUE, author text NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);";
  return db.exec(sql);
}

function initialiseTables() {
  createAuthorTable();
  // addAuthors();
  createQuoteTable();
  // addQuotes();
  const data = db.query(
    "SELECT name FROM  sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
    {}
  );
  return data;
}

module.exports = initialiseTables;
