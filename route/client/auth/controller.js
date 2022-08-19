const db = require('../../database/index');
const bcrypt = require('bcrypt');

exports.login = (credentials) => {
    return new Promise(async(resolve, reject) => {

        const sql = `SELECT * FROM users where email = ?`

        db.query(sql, credentials.email, async(err, rows) => {
            if (err) {
                console.log(err.message);
                return reject(500);
            } else {
                console.log(rows[0].password)
                const isValid = await bcrypt.compare(credentials.password, rows[0].password)
                console.log(isValid)
                if (!isValid) {
                    console.log('Invalid password');
                    return reject({ status: 500, message: "Password did not match!" })
                } else {
                    // login success send jwt or cookie
                    return resolve(rows)
                }
            }
        })
    })
}