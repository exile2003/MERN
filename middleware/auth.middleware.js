const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') { // OPTIONS это специальный метод, который присутствует в RestAPI, который
        // проверяет доступность сервера. Если это OPTIONS нам ничего лелать не нужно. Мы возвращаем next(), т. е.
        // продолжаем делать запрос. Если это обычный запрос (post или get) мы будем обрабатывать его в блоке try catch.
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1] // Поле authorization представляет собой строку 'Bearer
        // TOKEN'

        if (!token) {
            res.status(401).json({ message: 'Нет авторизации' })
        }

        const decode = jwt.verify(token, config.get('jwtSecret'))
        req.user = decode
        next()

    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}