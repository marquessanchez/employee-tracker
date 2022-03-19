INSERT INTO department, department_id)
VALUES 
    ('Sales', '3'),
    ('Engineering', '1'),
    ('Finance', '2'),
    ('Legal', '4');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Salesperson', 70,000),
    ('Sales Manager', 100,000),
    ('Software Engineer', 80,000),
    ('Lead Engineer', 100,000),
    ('Accountant', 80,000),
    ('Account Manager', 100,000),
    ('Lawyer', 90,000),
    ('Legal Team Lead', 100,000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Mike', 'Chan', 1), NULL,
    ('Ashley', 'Rodriguez', 2, NULL),
    ('Kevin', 'Tupik', 3, 4),
    ('Kunal', 'Singh', 3, 4),
    ('Malia', 'Brown', 4, NULL),
    ('Sarah', 'Lourd', 5, 6),
    ('Tom', 'Allen', 6, NULL),
    ('Steve', 'Harvey', 7, 8),
    ('Jason', 'Adams', 8, NULL);