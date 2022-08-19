const express = require('express');
const router = express.Router();

const authController = require('./controller')

router.post('/register', async(req, res) => {

    const credentials = {
        first_name,
        middle_name,
        last_name,
        email,
        birthdate,
        password,
        image
    } = req.body;

    const user = await authController.register(credentials).then(data => {
        res.status(200).json({
            status: 200,
            data: user
        })
    }).catch(status => {
        res.status(500).json({
            status
        })
    })

})

module.exports = router;