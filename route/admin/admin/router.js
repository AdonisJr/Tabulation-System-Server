const express = require('express');
const router = express.Router();

const CONTROLLER = require('./controller')

// LANDING PAGE
router.get('/', (req, res) => {
    res.render('index')
})

// LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/admin', async(req, res) => {
    await CONTROLLER.getAllUsers().then(data => {
        res.status(200).json(data);
    }).catch(status => {
        res.status(500).json(status);
    })
})

router.post('/admin/new', async(req, res) => {
    const credentials = {
        name,
        email,
        password
    } = req.body;

    await CONTROLLER.newUser(credentials).then(data => {
        res.status(200).json(data)
    }).catch(status => {
        res.status(400).json(status)
    })
})

router
    .route('/admin/:user_id')
    .get(async(req, res) => {

        await CONTROLLER.searchUser(req.params.user_id).then(data => {
            res.status(200).json(data);
        }).catch(status => {
            res.status(404).json(status);
        })

    }).put(async(req, res) => {

        const credentials = {
            name,
            email
        } = req.body
        console.log(credentials)

        await CONTROLLER.updateUser(req.params.user_id, credentials).then(data => {
            res.status(200).json({ data })
        }).catch(status => {
            res.status(404).json(status)
        })

    }).delete(async(req, res) => {

    })



module.exports = router;