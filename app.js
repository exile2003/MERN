const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
//const router = require('./routes/auth.routes')
//import router from './routes/auth.routes'

const app = express()

app.use(express.json({extended: true})) //Это строка нужна, чтобы Nodejs воспринимал body как json-объект (по умолчанию он воспринимает body как stream)
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


/*
app.use('/api/auth', function(req, res) {
    console.log('OK')
    res.send(`Hello. Your port is ${PORT}`)
})
*/

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production' ) {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
