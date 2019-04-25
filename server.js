const routes = `${__dirname}/routes`;
const ReadRoute = require('./routes/read')
const CreateRoute = require('./routes/create')
const UpdateRoute = require('./routes/update')

import bodyParser from 'body-parser'
import Express from 'express'

const app = Express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(ReadRoute)
app.use(CreateRoute)
app.use(UpdateRoute)

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});