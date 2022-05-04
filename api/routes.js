const express = require("express");
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:secret@localhost:5432/school');

router.get("/students", (req, res) => {

  db.any('SELECT * FROM students ORDER BY id')
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500));

});

router.get("/student/:id", (req, res) => {

  db.one('SELECT * FROM students WHERE id = $1', req.params.id)
  .then(data => res.json(data))
  .catch(() => res.sendStatus(500));

});

router.delete("/student/:id", (req, res) => {

  db.none('DELETE FROM students WHERE id = $1', req.params.id)
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));

});

router.post("/student/", (req, res) => {

  db.none('INSERT INTO students (name) VALUES ($1)', req.body.name)
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));

});

router.patch("/student/:id", (req, res) => {
  
  db.none('UPDATE students SET name = $1 WHERE id = $2', [req.body.name, req.params.id])
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));

});


module.exports = router;
