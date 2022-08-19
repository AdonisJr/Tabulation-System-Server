const express = require('express');
const router = express.Router();

const authController = require('./controller')

router.post('/login', async(req, res) => {

    const credentials = {
        email,
        password
    } = req.body;

    console.log(credentials)

    const user = await authController.login(credentials).then(data => {
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