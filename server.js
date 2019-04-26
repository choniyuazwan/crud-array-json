const routes = `${__dirname}/routes`;
const readRoute = require('./routes/read')
const createRoute = require('./routes/create')
const updateRoute = require('./routes/update')
const removeRoute = require('./routes/remove')

import bodyParser from 'body-parser'
import Express from 'express'

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(readRoute)
app.use(createRoute)
app.use(updateRoute)
app.use(removeRoute)

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});