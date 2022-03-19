DROP DATABASE IF EXISTS employee;

CREATE DATABASE employee;
USE employee;

CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department INT
);