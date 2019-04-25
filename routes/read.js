const fs = require('fs');
const database = `${__dirname}/../config/database.json`;
const ReadRoute = require('express').Router();
import * as User from '../models/user';

ReadRoute.get('', (req, res, next) => {
    res.json({"message": "hello world"})
})

ReadRoute.get('/users', (req, res, next) => {
    if(!fs.existsSync(database)) next();
    const users = fs.readFileSync(database, {encoding: 'utf8'});
    res.json(JSON.parse(users));
})

ReadRoute.get('/users/:id', (req, res, next) => {
    let user = User.find(req.params.id);
    if(user) res.json(user);
    else next();
})

module.exports = ReadRoute;