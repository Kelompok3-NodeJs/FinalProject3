const {User} = require('../models');
const {verifyToken} = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.get('token')
        const userDecoded = verifyToken(token)
        const user = await User.findOne({
            where: {
                id: userDecoded.id,
                email: userDecoded.email
            }
        })
        if (!user) {
            throw {
                name: 'user authentication error',
                devMessage: 'user not found',
            }
        }
        res.locals.user = user
        return next()
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = authentication