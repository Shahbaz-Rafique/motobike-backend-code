const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12618235',
  password: 'pWpLqzhkb5',
  database: 'sql12618235',
  port:"3306",
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports={connection}
