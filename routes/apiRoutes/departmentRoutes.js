const express = require ('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.put('/api/department/:id', (req, res) => {
  const errors = inputCheck(req.body, 'employee_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE departments SET employee_id = ? 
               WHERE id = ?`;
  const params = [req.body.employee_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
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


// Get all departments 
router.get('/api/departments', (req, res) => {
  const sql = `SELECT departments.*, employees.name 
             AS employee_name 
             FROM departments 
             LEFT JOIN employees 
             ON departments.employee_id = employees.id`;

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


// Delete a department
router.delete('api/department/:id', (req, res) => {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'department not found'
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

// Create a department
router.post('/api/department', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO departments (name, department) VALUES (?,?,?)`;

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


// Get a single department
router.get('api/departments/:id', (req, res) => {
  const sql = `SELECT departments.*, parties.name 
             AS employee_name 
             FROM departments 
             LEFT JOIN parties 
             ON departments.employee_id = parties.id
             WHERE departments.id = ?`;
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
