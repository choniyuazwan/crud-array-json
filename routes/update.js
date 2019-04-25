import * as User from '../models/user'
const UpdateRoute = require('express').Router();

// UpdateRoute.put('/users/:id', (req, res, next) => {
//     const user = User.update(req.body);
//     res.json(user);
// })

UpdateRoute.put('/users/:id', (req, res, next) => {
    const user = User.update(req.body, req.params.id);
    res.json(user);
})

module.exports = UpdateRoute;