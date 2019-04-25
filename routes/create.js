import * as User from '../models/user'
const CreateRoute = require('express').Router();

CreateRoute.post('/users', (req, res, next) => {
    const user = User.insert(req.body);
    res.json(user);
})

module.exports = CreateRoute;