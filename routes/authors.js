const express = require("express");
const router = express.Router();
const authors = require("../services/authors");

/* GET authors listing. */
router.get("/", function (req, res, next) {
  console.log("authors router get");
  try {
    res.json(authors.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting authors `, err.message);
    next(err);
  }
});

/* POST author */
router.post("/", function (req, res, next) {
  try {
    res.json(authors.create(req.body));
  } catch (err) {
    console.error(`Error while adding authors `, err.message);
    next(err);
  }
});

module.exports = router;
