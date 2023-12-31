const fs = require('fs');
const path = './storage/storage.json';

class Service {
    getAllUsers() {
        const data = JSON.parse(fs.readFileSync(path));
        if (!data.length) throw new Error('data is empty');
        return data;
    }

    getById(id) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id == id);
        if (!filtered.length) throw new Error('id отсутствует')
        return filtered;
    }

    createUsers(name, surname, email, pwd) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.email == email);
        if (filtered.length > 0) throw new Error('такая почта уже есть');
        const item = {
            id: data.length + 1,
            name, surname, email, pwd
        }
        data.push(item);
        fs.writeFileSync(path, JSON.stringify(data));
        return data;
    }

    updateUsers(id, name, surname, email, pwd) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id != id);
        if (filtered.length == data.length) throw new Error('id отсутствует');
        const item = {
            id,
            name,
            surname,
            email,
            pwd
        }
        filtered.push(item);
        fs.writeFileSync(path, JSON.stringify(filtered))
        return filtered;
    }

    patchUsers(id, clientObj) {
        const data = JSON.parse(fs.readFileSync(path));
        const oldData = data.find((el) => el.id == id);
        const newData = { ...oldData, ...clientObj };
        const filtered = data.filter((el) => el.id != id);
        if (filtered.length == 0) throw new Error('id is not faund')
        filtered.push(newData);
        fs.writeFileSync(path, JSON.stringify(filtered));
        return filtered;
    }

    deleteUsers(id) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id != id);
        if (filtered.length == data.length) throw new Error('id отсутствует');
        fs.writeFileSync(path, JSON.stringify(filtered));
        return filtered;
    }
}

module.exports = { Service };