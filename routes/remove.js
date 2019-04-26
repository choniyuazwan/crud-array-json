const fs = require('fs');
const database = `${__dirname}/../config/database.json`;
const RemoveRoute = require('express').Router();
import * as User from '../models/user';

RemoveRoute.delete('/users/:id', (req, res, next) => {
    let user = User.remove(req.params.id);
    res.json(user)
})

module.exports = RemoveRoute;