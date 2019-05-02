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

// ===========================================================================================

Route.get('/finds', (req, res) => {
    let query = "SELECT * FROM `employee`";

    db.query(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

Route.get('/find/:nik', (req, res) => {
    let nik = req.params.nik
    let query = "SELECT * FROM `employee` where nik = "+nik;

    db.query(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

Route.post('/find', (req, res) => {
    let data = req.body
    let query = "insert into `employee` values ('"+data.nik+"','"+data.nama+"','"+data.jk+"','"+data.alamat+"','"+data.salary+"','"+data.grade+"')";

    db.query(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(req.body)
        }
    })
})

Route.delete('/find/:nik', (req, res, next) => {
    let nik = req.params.nik
    let query = "delete from `employee` where nik = '"+nik+"'" 
    db.query(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

Route.put('/find/:nik', (req, res, next) => {
    let nik = req.params.nik
    let data = req.body
    let query = "update `employee` set nama='"+data.nama+"', jk='"+data.jk+"', alamat='"+data.alamat+"', salary='"+data.salary+"', grade='"+data.grade+"' where nik='"+nik+"'";

    db.query(query, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(req.body)
        }
    })
})

module.exports = Route;