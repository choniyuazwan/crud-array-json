import CommonResponse from '../models/common-response';
const fs = require('fs');
const database = `${__dirname}/../config/employee.json`;
const Route = require('express').Router();
import * as Employee from '../dao/employee-dao';


Route.post('/employees', (req, res, next) => {
    const employee = Employee.insert(req.body);
    res.json(employee);
})


// Route.get('', (req, res, next) => {
//     res.json({"message": "hello world"})
// })

Route.get('/employees', (req, res, next) => {
    Employee.findAll()
    .then(employees => {
        const resp = new CommonResponse("01", "success", JSON.parse(employees));
        res.json(resp);
    })
})


Route.get('/employee/:nik', (req, res, next) => {
    Employee.find(req.params.nik)
    .then(employee => {
        if(employee) {
            const resp = new CommonResponse("01", "success", employee);
            res.json(resp);
        }
    })
})

Route.get('/employee/bonus/:nik', (req, res, next) => {
    Employee.bonus(req.params.nik)
    .then(employee => {
        if(employee) {
            const resp = new CommonResponse("01", "success", employee);
            res.json(resp);
        }
    })
})

Route.delete('/employee/:nik', (req, res, next) => {
    let employee = Employee.remove(req.params.nik);
    res.json(employee)
})

// Route.put('/employee/:nik', (req, res, next) => {
//     const employee = Employee.update(req.body, req.params.nik);
//     res.json(employee);
// })

Route.get('/find', (req, res) => {
    let query = 'SELECT * from `employee` order by nik asc'

    db.query =(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = Route;