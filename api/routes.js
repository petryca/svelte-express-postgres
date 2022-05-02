const express = require("express");
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:secret@localhost:5432/school');

router.get("/students", (req, res) => {

  db.any('SELECT * FROM students')
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.status(500).json({error: error});
  });

});

router.get("/student/:id", (req, res) => {

  db.one('SELECT * FROM students WHERE id = $1', req.params.id)
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.status(500).json({error: error});
  });

});

router.delete("/student/:id", (req, res) => {

  db.none('DELETE FROM students WHERE id = $1', req.params.id)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    res.status(500).json({error: error});
  });

});

router.post("/student/", (req, res) => {

  db.none('INSERT INTO students (name) VALUES ($1)', req.body.name)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    res.status(500).json({error: error});
  });

});


module.exports = router;
