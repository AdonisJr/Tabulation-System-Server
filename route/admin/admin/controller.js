const db = require('../../database/index');
const bcrypt = require('bcrypt');

exports.getAllUsers = () => {
    return new Promise(async(resolve, reject) => {
        const sql = `SELECT * FROM admins`

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message)
                return reject({ status: 500, message: 'Internal Server Error' })
            }
            return resolve({ status: 200, data: rows })
        })
    })
}

exports.newUser = (credentials) => {
    return new Promise(async(resolve, reject) => {
        const sql = `INSERT INTO admins (name, email, password)
        values (?, ?, ?)`;

        let hash = '';

        if (!credentials.password) {
            hash = null
        } else {
            hash = await bcrypt.hash(credentials.password, 13);
        }

        const values = [
            credentials.name,
            credentials.email,
            hash
        ]

        db.query(sql, values, (err, rows) => {
            if (err) {
                console.log(err.message)
                return reject({ status: 400, description: 'Bad request', message: 'Name, Email, Password is required' })
            }
            return resolve({ status: 200, data: rows })
        })
    })
}

exports.searchUser = (user_id) => {
    return new Promise(async(resolve, reject) => {
        const sql = `SELECT * FROM admins where user_id = ?`

        db.query(sql, user_id, (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject({ status: 500, message: 'Internal Server Error' })
            }
            return resolve({ status: 200, data: rows })
        })
    })
}

exports.updateUser = (user_id, user_details) => {
    return new Promise(async(resolve, reject) => {
        const sql = `UPDATE admins SET name = ?, email = ? where user_id = ?`;

        const values = [
            user_details.name,
            user_details.email,
            user_id
        ];

        db.query(sql, values, (err, rows) => {
            if (err) {
                console.log(err.message)
                return reject({ status: 500, message: 'Internal Server Error' })
            }
            resolve({ status: 200, data: rows })
        })
    })
}

exports.deleteUser = (user_id) => {
    return new Promise(async(resolve, reject) => {
        const sql = `DELETE from admins WHERE user_id = ?`;

        db.query(sql, user_id, (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject({ status: 500, message: 'Internal Server Error' });
            }
            return resolve({ status: 200, data: rows })
        })
    })
}