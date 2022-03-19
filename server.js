const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require ('express');
const db = require('./db/connection.js')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
// app.use('./api', apiRoutes);

// Default response for any other request (Not Found)
// Catchall route, this route can override all other routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
});

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3001,
//     user: 'root',
//     password: 'password',
//     database: 'employee'
// })

// connection.connect(function (err) {
//     if (err) throw err;
//     init();
// })

const init = async () => {
    try {
        let answer = await inquirer.prompt({
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
                employeeView();
                break

            case 'View Departments':
                departmentView();
                break

            case 'View Roles':
                roleView();
                break

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                departmentAdd();
                break

            case 'Add Roles':
                roleAdd();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                connection.end();
                break
        };
    } catch (err) {
        console.log(err);
        init();
    };
}

const employeeView = async () => {
    init();
}

const departmentView = async () => {
    init();
}

const roleView = async () => {
  init();
}

init();

// Create a function to write README file
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(),fileName),data);
}

// Create a function to initialize app
// function init() {
//   inquirer.prompt(questions).then(res=>{
//     console.log('Generating README...');
//     writeToFile('README.md', generateMarkdown({ ...res}))
//   })
// }

// Function call to initialize app
init();

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
    

//     init();
// }

// const departmentView = async () => {
    
// }

// const roleView = async () => {
    
// }

// init();