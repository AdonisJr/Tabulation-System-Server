const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./route/admin/admin'))
app.use('/api', require('./route/client/client'))

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`)
})