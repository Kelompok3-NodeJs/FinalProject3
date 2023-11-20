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

module.exports = {
    authorization,
    adminAuthorization
}