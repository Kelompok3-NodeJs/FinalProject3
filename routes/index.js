const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const {authorization,adminAuthorization} = require('../middlewares/authorization');
const CategoryController = require('../controllers/CategoryController');
const UserController = require('../controllers/usercontroller');


// user routes
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.use(authentication);
router.put('/users', authorization ,UserController.putUsers);
router.delete('/users', authorization ,UserController.deleteUsers);
router.patch('/users/topup', authorization ,UserController.userTopUp);

// category routes
router.post('/categories', adminAuthorization ,CategoryController.PostCategory);
router.get('/categories', adminAuthorization ,CategoryController.GetCategory);
module.exports = router;