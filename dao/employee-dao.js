import fs from 'fs';

const source = `${__dirname}/../config/employee.json`;
const employees = (fs.existsSync(source) ? JSON.parse(fs.readFileSync(source)) : [])
const database = `${__dirname}/../config/employee.json`;

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(fs.readFileSync(database, {encoding: 'utf8'}))
    })
}

// function find(nik) {
//     return new Promise((resolve, reject) => {
//         resolve(employees.find((employees) => { return employees.nik == nik }))
//     }) 
// }

function find(nik) {
    return new Promise((resolve, reject) => {
        resolve(employees.find((employees) => { return employees.nik == nik }))
    }) 
}

function search(nik) {
    return employees.find((employees) => { return employees.nik == nik })
}

function bonus(nik) {
    return new Promise((resolve, reject) => {
        const index = employees.findIndex((employee) => { 
            return employee.nik == nik 
        })
        if(index<0) {
            resolve({"message":"data not found"});        
        } else {
            // resolve(employees.find((employees) => { 
            //     if(employees.nik == nik) {
            //         if(employees.grade == "A") {
            //             employees.salary *= 3
            //             return employees 
            //         } else if(employees.grade == "B") {
            //             employees.salary *= 2
            //             return employees 
            //         }
            //     }
            // }))
            let adding
            employees.find((employees) => { 
                if(employees.nik == nik) {
                    if(employees.grade == "A") {
                        adding = employees.salary * 3
                    } else if(employees.grade == "B") {
                        adding = employees.salary * 2
                    }
                }
            })
            resolve(adding)
        }
    }) 
}

function insert(data) {
    const index = employees.findIndex((employee) => { 
        return employee.nik == data.nik 
    })
    if(index<0) {
        employees.push(data)
    }
    save(employees);
    return search(data.nik)
    // return find(data.nik)
    //     .then(result => {
    //         result;
    //     })
}

// function update(data, nik) {
//     const index = employees.findIndex((employee) => { 
//         return employee.nik == nik 
//     })
//     // if(index<0) {
//     //     return {"message":"data not found"};        
//     // } else if(checkUsername(nik, data.employeename, data.fullname, data.email)) {
//     //     return {"message":"employeename already exist"};
//     // } else if(data.email == "" || data.email == null) {
//     //     return {"message":"email cannot be empty"};
//     // } else {
//     //     let newEmployees = change(nik, data.employeename, data.fullname, data.email)
//     //     save(newEmployees);
//     // }
//     if(index<0) {
//         return {"message":"data not found"};        
//     } else {
//         let newEmployees = change(nik, data.employeename, data.fullname, data.email)
//         save(newEmployees);
//     }
//     return find(nik)
// }

function remove(nik) {
    const index = employees.findIndex((employee) => { 
        return employee.nik == nik 
    })
    if(index<0) {
        return {"message":"data not found"};       
    } else {
        let newEmployees = erase(nik)
        save(newEmployees)
        return {"message":"employee has been deleted successfully"}
    }
}

// function change(nik, employeename, fullname, email) {
//     for (var i in employees) {
//       if (employees[i].nik == nik) {
//             employees[i].employeename = employeename;
//             employees[i].fullname = fullname;
//             employees[i].email = email;
//             break; //Stop this loop, we found it!
//       }
//     }
//     return employees;
// }

function erase(nik) {
    for (let i in employees) {
        if(employees[i].nik == nik) {
            return employees.splice(employees.indexOf(employees[i]), 1);
        }
    }
}

// function checkUsername(nik, employeename, fullname, email) {
//     for (let i in employees) {
//         if(employees[i].nik != nik) {
//             if (employees[i].employeename == employeename) {
//                 return true;
//             }
//         }
//     }
// }

function save(data) {
    fs.writeFileSync(source, JSON.stringify(employees))
}

// export {findAll, find, insert, update, save, remove};
export {findAll, find, insert, remove, bonus};