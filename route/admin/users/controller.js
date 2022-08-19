const db = require('../../database/index');
const bcrypt = require('bcrypt');

exports.register = credentials => {
    return new Promise(async(resolve, reject) => {
        const sql = `INSERT INTO users (first_name, middle_name, last_name, email, birthdate, password, image)
        values (?, ?, ?, ?, ?, ?, ?)`

        const hash = await bcrypt.hash(credentials.password, 13);

        const values = [
            credentials.first_name,
            credentials.middle_name,
            credentials.last_name,
            credentials.email,
            credentials.birthdate,
            hash,
            credentials.image
        ]

        db.query(sql, values, (err, rows) => {
            if (err) {
                console.log(err.message);
                return reject(500);
            } else {
                return resolve(rows);
            }
        })
    })
}