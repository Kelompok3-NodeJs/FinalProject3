const bcryptjs = require('bcryptjs');

function hashPassword(password) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
}

module.exports = hashPassword;