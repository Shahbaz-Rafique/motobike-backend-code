const mysql = require('mysql');

// create a connection to the database
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12610340',
  password: 'bIKz4r6gNy',
  database: 'sql12610340',
  port:"3306",
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports={connection}