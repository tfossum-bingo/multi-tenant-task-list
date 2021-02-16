const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const getToken = (request, response, next) => {
    console.log('req.header.auth: ', request.headers['authorization'])
    const token = request.headers['authorization'].split(' ')[1]
    response.locals.token = token
    next()
}

const verifyToken = (request, response, next) => {
    let token = response.locals.token
    jwt.verify(token, secretKey, (err, t) => {
        if (err) {
            return response.status(401).json({ msg: 'unauthorized' })
        }
        return next()
    })
}

const createToken = (request, response) => {
    const token = jwt.sign(response.locals.payload, secretKey)
    response.send({ user: response.locals.payload, token })
}

module.exports = {
    createToken,
    verifyToken,
    getToken
}