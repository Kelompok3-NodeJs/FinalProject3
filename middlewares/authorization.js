const { TransactionHistory } = require('../models');
function authorization (req, res, next) {
    const authenticatedUserId = res.locals.user.id;
    if (authenticatedUserId) {
        next();
    } else {
        res.status(401).json({message: 'unauthorized'})
    }
}

function adminAuthorization (req, res, next) {
    const authenticatedUserId = res.locals.user.id;
    const authenticatedUserRole = res.locals.user.role;
    if (authenticatedUserId && authenticatedUserRole === 'admin') {
        next();
    } else {
        res.status(401).json({message: 'unauthorized: only admin can access this route'})
    }
}

function getTransactionByIdAuth (req, res, next) {
    const user = res.locals.user;
    const hasTransaction = TransactionHistory.findOne({
        where: {
            id: req.params.id,
            UserId: user.id
        }
    })
    if (user.role === 'admin' || hasTransaction) {
        next();
    }
    else {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = {
    authorization,
    adminAuthorization,
    getTransactionByIdAuth
}