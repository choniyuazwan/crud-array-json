import fs from 'fs';

const source = `${__dirname}/../config/database.json`;
const users = (fs.existsSync(source) ? JSON.parse(fs.readFileSync(source)) : [])

function findAll() {
    return users;
}

function find(id) {
    return users.find((users) => { return users.id === Number(id) })
}

function insert(data) {
    const index = users.findIndex((user) => { 
        return user.id === Number(data.id) 
    })
    if(index<0) {
        users.push(data)
    }
    save(users);
    return find(data.id)
}

function update(data, id) {
    const index = users.findIndex((user) => { 
        return user.id === Number(id) 
    })
    if(index<0) {
        return {"message":"response not found"};        
    } else if(checkUsername(id, data.username, data.fullname, data.email)) {
        return {"message":"username already exist"};
    } else if(data.email == "" || data.email == null) {
        return {"message":"email cannot be empty"};
    } else {
        let newUsers = change(id, data.username, data.fullname, data.email)
        save(newUsers);
    }
    return find(id)
}

function remove(id) {
    const index = users.findIndex((user) => { 
        return user.id === Number(id) 
    })
    if(index<0) {
        return {"message":"response not found"};        
    } else {
        let newUsers = erase(id)
        save(newUsers)
        return {"message":"user has been deleted successfully"}
    }
}

function change(id, username, fullname, email) {
    for (var i in users) {
      if (users[i].id == id) {
            users[i].username = username;
            users[i].fullname = fullname;
            users[i].email = email;
            break; //Stop this loop, we found it!
      }
    }
    return users;
}

function erase(id) {
    for (let i in users) {
        if(users[i].id == id) {
            return users.splice(users.indexOf(users[i]), 1);
        }
    }
}

function checkUsername(id, username, fullname, email) {
    for (let i in users) {
        if(users[i].id != id) {
            if (users[i].username == username) {
                return true;
            }
        }
    }
}

function save(data) {
    fs.writeFileSync(source, JSON.stringify(users))
}

export {findAll, find, insert, update, save, remove};