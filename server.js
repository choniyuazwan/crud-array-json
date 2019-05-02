// const route = require('./routes/user')
// const route = require('./routes/customer-route')
const customerRoute = require('./routes/customer-route')
const employeeRoute = require('./routes/employee-route')

import bodyParser from 'body-parser'
import Express from 'express'

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(customerRoute)
app.use(employeeRoute)

const mysql = require('mysql');
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'apiexpress'
})

db.connect((err) => {
  if(err) {throw err}
  console.log('Connected to database')
})

global.db = db;

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});