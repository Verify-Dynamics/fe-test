const db = require("../services/db");
const config = require("../config");

function createAuthorTable() {
  const sql = `CREATE TABLE IF NOT EXISTS author (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      firstname TEXT NOT NULL, 
      lastname text NOT NULL, dob DATE NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);`;
  return db.exec(sql);
}

function createQuoteTable() {
  const sql = `CREATE TABLE IF NOT EXISTS quote (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      passage TEXT NOT NULL UNIQUE, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
      author_id INTEGER, 
      CONSTRAINT fk_author
      FOREIGN KEY (id) 
      REFERENCES author(id));`;
  return db.exec(sql);
}

const addAuthors = (authors) => {
  const sql =
    "INSERT INTO author (firstname,lastname,dob) VALUES (@firstname,@lastname,@dob)";
  db.transaction(sql, authors);
};

const addQuotes = (quotes) => {
  const sql = "INSERT INTO quote (passage,author_id) VALUES (@text,@author_id)";
  db.transaction(sql, quotes);
};

function initialiseTables(dummyData) {
  createAuthorTable();
  addAuthors(dummyData.authors);
  createQuoteTable();
  addQuotes(dummyData.quotes);
  const data = db.query(
    "SELECT name FROM  sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
    {}
  );
  return data;
}

module.exports = initialiseTables;
