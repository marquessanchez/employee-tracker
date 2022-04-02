const express = require('express');
const cTable = require("console.table");
const router = express.Router();

const db = require('../../db/connection');

router.put('/api/employees/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employeess SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


// Get all employeess 
router.get('/api/employeess', (req, res) => {
  const sql = `SELECT employeess.*, parties.name 
             AS party_name 
             FROM employeess 
             LEFT JOIN parties 
             ON employeess.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


// Delete a employees
router.delete('api/employees/:id', (req, res) => {
  const sql = `DELETE FROM employeess WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'employees not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a employees
router.post('/api/employees', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO employeess (first_name, last_name, industry_connected) VALUES (?,?,?)`;

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.mesaage });
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


// Get a single employees
router.get('api/employeess/:id', (req, res) => {
  const sql = `SELECT employeess.*, parties.name 
             AS party_name 
             FROM employeess 
             LEFT JOIN parties 
             ON employeess.party_id = parties.id
             WHERE employeess.id = ?`;
  const params = [req.params.id];

db.query(sql, params, (err, rows) => {
  if (err) {
    res.status(400).json({ error : err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});


module.exports = router;