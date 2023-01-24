require('dotenv').config();
// console.log(process.env.TOKEN)
const express = require('express')
var cors = require('cors')
const app = express()
// settings
app.set('port', process.env.PORT || 3000)
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// routes
app.use('/api/v1/forms', require('./src/routes/forms/SendForm'))
app.use('/api/v1/forms', require('./src/routes/forms/Qualification'))

app.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`)
})