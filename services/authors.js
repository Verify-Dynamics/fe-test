const db = require("../services/db");
const config = require("../config");

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM author LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push("No object is provided");
  }

  if (!quote.firstname) {
    messages.push("First name is empty");
  }

  if (!quote.lastname) {
    messages.push("Last name is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(authorObj) {
  validateCreate(authorObj);
  const { firstname, lastname } = authorObj;
  const result = db.run(
    "INSERT INTO author (firstname, lastname) VALUES (@firstname, @lastname)",
    { quote, author }
  );

  let message = "Error in creating author";
  if (result.changes) {
    message = "Author created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
};
