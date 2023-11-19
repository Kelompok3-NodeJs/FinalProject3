function authorization (req, res, next) {
    const authenticatedUserId = res.locals.user.id;
    if (authenticatedUserId) {
        next();
    } else {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = authorization