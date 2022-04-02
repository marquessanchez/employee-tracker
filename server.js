const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require ('express');
const db = require('./db/connection.js');
// const cTable = require("c.table");
const { connect } = require('./db/connection.js');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
// app.use('./api', apiRoutes);

// Default response for any other request (Not Found)
// Catchall route, this route can override all other routes
// app.use((req, res) => {
//   res.status(404).end();
// });

// // Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
  
//   app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//   });
// });

// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     port: 3001,
// //     user: 'root',
// //     password: 'password',
// //     database: 'employee'
// // })

// // connection.connect(function (err) {
// //     if (err) throw err;
// //     init();
// // })

// const init = async () => {
//     try {
//         let answer = await inquirer.prompt({
//             name: 'choice',
//             type: 'list',
//             message: 'What would you like to do?',
//             choices: [
//                 'View Employees',
//                 'View Departments',
//                 'View Roles',
//                 'Add Employees',
//                 'Add Departments',
//                 'Add Roles',
//                 'Update Employee Role',
//                 'Exit'
//             ]
//         });
//         switch (answer.choice) {
//             case 'View Employees':
//                 employeeView();
//                 break

//             case 'View Departments':
//                 departmentView();
//                 break

//             case 'View Roles':
//                 roleView();
//                 break

//             case 'Add Employees':
//                 employeeAdd();
//                 break

//             case 'Add Departments':
//                 departmentAdd();
//                 break

//             case 'Add Roles':
//                 roleAdd();
//                 break

//             case 'Update Employee Role':
//                 employeeUpdate();
//                 break

//             case 'Exit':
//                 connection.end();
//                 break
//         };
//     } catch (err) {
//         console.log(err);
//         init();
//     };
// }

// const employeeView = async () => {
//     // db.connect.promise().query('select * from employees;').then(data=> console.log(data));
//     db.promise().query(`
//         SELECT
//             e.id,
//             e.first_name,
//             e.last_name, 
//             r.title,
//             d.name,
//             r.salary,
//             CONCAT(e2.first_name+' '+e2.last_name)
//         FROM employees e
//         JOIN roles r
//         ON e.role_id=r.id
//         JOIN department d
//         ON r.department_id=d.id
//         JOIN employees e2
//         ON e.manager_id=e2.id;`
//     ).then((rows)=> console.log(rows))
//     // init();
// }

// const departmentView = async () => {
//     init();
// }

// const roleView = async () => {
//   init();
// }

// employeeView();

// init();

// Create a function to write README file
// function writeToFile(fileName, data) {
//   return fs.writeFileSync(path.join(process.cwd(),fileName),data);
// }
// 
// Create a function to initialize app
// function init() {
//   inquirer.prompt(questions).then(res=>{
//     console.log('Generating README...');
//     writeToFile('README.md', generateMarkdown({ ...res}))
//   })
// }

// Function call to initialize app

// const express = require('express');
// const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
// // const db = require('.db/db')
// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Use apiRoutes
// app.use('./api', apiRoutes);

// // Default response for any other request (Not Found)
// // Catchall route, this route can override all other routes
// app.use((req, res) => {
//   res.status(404).end();
// });

// // Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
  
//   app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//   });
// });

const init = () => {
    let answer = inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employees',
            'Add Departments',
            'Add Roles',
            'Update Employee Role',
            'Exit'
        ]
    });
    switch (answer.choice) {
        case 'View Employees':
             viewEmployee();
             break;

        case 'View Departments':
            viewDepartment();
            break;

        case 'View Roles':
            viewRole();
             break;

        case 'Add Employees':
            addEmployee();
            break;

        case 'Add Departments':
            addDepartment();
            break;

        case 'Add Roles':
            addRole();
            break;

        case 'Update Employee Role':
            updateEmployee();
            break;

        case 'Exit':
            connection.end();
            break;
    };
   
}

// add case functions here
const addDepartment = async () => {
    inquirer.prompt({
        type: "input",
        message: "What is the department name?",
        name: "department"
    })
    .answer = () => {
        connect.query("INSERT INTO department (department) VALUES (?)", [answer.department], err => {
            if (err) throw err;
            console.table(res);
            init();
        })
    }
}
const addRole = async () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is their title?",
            name: "title"
        },
        {
            type: "input",
            message: "What is their department id?", 
            name: "salary"
        },
        {
            type: "input",
            message: "What is their salary?",
            name: "salary"
        }
    ])
    .answer = () => {
        connect.query("INSERT INTO role (title, department, salary)) VALUES (?,?,?)", [answer.title, answer.department, answer.salary], err => {
            if (err) throw err;
            console.table(res);
            init();
        })
    }
}

const viewDepartment = async () => {
    let query = "SELECT * FROM department";
    connect.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewRole = async () => {
    let query = "SELECT * FROM role";
    connect.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}
const exit = async () => {
    connect.end();
}

init();