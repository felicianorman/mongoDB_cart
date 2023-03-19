const path = require('path');
const { NotFound, NotFoundError } = require('../utils/error')

exports.notFoundMiddleware = (req, res, next) => {
    const apiPath = req.path && req.path.startsWith('/api')

    if (apiPath) {
        throw new NotFoundError('Endpoint doesnt exist')
    }
}

exports.notFound = (req, res) => res.status(404).send('Route doesnt exist')