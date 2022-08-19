const express = require('express');
const router = express.Router();

router.use('/users', require('./users/router'))
router.use('/', require('./admin/router'))

module.exports = router;