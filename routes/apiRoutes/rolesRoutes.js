const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.put('/api/roles/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE roless SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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


// Get all roless 
router.get('/api/roless', (req, res) => {
  const sql = `SELECT roless.*, parties.name 
             AS party_name 
             FROM roless 
             LEFT JOIN parties 
             ON roless.party_id = parties.id`;

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


// Delete a roles
router.delete('api/roles/:id', (req, res) => {
  const sql = `DELETE FROM roless WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'roles not found'
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

// Create a roles
router.post('/api/roles', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO roless (first_name, last_name, industry_connected) VALUES (?,?,?)`;

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


// Get a single roles
router.get('api/roless/:id', (req, res) => {
  const sql = `SELECT roless.*, parties.name 
             AS party_name 
             FROM roless 
             LEFT JOIN parties 
             ON roless.party_id = parties.id
             WHERE roless.id = ?`;
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