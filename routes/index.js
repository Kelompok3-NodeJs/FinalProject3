const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const UserController = require('../controllers/usercontroller');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.use(authentication);
router.put('/users', authorization ,UserController.putUsers);
module.exports = router;