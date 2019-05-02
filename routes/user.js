import CommonResponse from '../models/common-response';
const fs = require('fs');
const database = `${__dirname}/../config/database.json`;
const Route = require('express').Router();
import * as User from '../models/user';


Route.post('/users', (req, res, next) => {
    const user = User.insert(req.body);
    res.json(user);
})


Route.get('', (req, res, next) => {
    res.json({"message": "hello world"})
})

Route.get('/users', (req, res, next) => {
    if(!fs.existsSync(database)) next();
    const users = fs.readFileSync(database, {encoding: 'utf8'});
    const response = new CommonResponse("01", "success", JSON.parse(users));
    res.json(response);
})

Route.get('/users/:id', (req, res, next) => {
    let user = User.find(req.params.id);
    if(user) res.json(user);
    else next();
})

Route.delete('/users/:id', (req, res, next) => {
    let user = User.remove(req.params.id);
    res.json(user)
})

Route.put('/users/:id', (req, res, next) => {
    const user = User.update(req.body, req.params.id);
    res.json(user);
})

// export {Route};
module.exports = Route;