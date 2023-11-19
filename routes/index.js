const router = require('express').Router();
const UserController = require('../controllers/usercontroller');

router.post('/users/register', UserController.register);
module.exports = router;