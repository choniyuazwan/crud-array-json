import CommonResponse from '../models/common-response';
const fs = require('fs');
const database = `${__dirname}/../config/database.json`;
const Route = require('express').Router();
import * as User from '../dao/customer-dao';


Route.post('/customers', (req, res, next) => {
    const user = User.insert(req.body);
    res.json(user);
})


Route.get('', (req, res, next) => {
    res.json({"message": "hello world"})
})

Route.get('/customers', (req, res, next) => {
    User.findAll()
    .then(users => {
        const resp = new CommonResponse("01", "success", JSON.parse(users));
        res.json(resp);
    })
})


Route.get('/customer/:id', (req, res, next) => {
    User.find(req.params.id)
    .then(user => {
        if(user) {
            const resp = new CommonResponse("01", "success", user);
            res.json(resp);
        }
    })
})

Route.delete('/customer/:id', (req, res, next) => {
    let user = User.remove(req.params.id);
    res.json(user)
})

Route.put('/customer/:id', (req, res, next) => {
    const user = User.update(req.body, req.params.id);
    res.json(user);
})

module.exports = Route;