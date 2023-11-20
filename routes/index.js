const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const {authorization,adminAuthorization} = require('../middlewares/authorization');
const CategoryController = require('../controllers/CategoryController');
const UserController = require('../controllers/usercontroller');
const ProductController = require('../controllers/ProductController');


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
router.patch('/categories/:id', adminAuthorization ,CategoryController.patchCategory);
router.delete('/categories/:id', adminAuthorization ,CategoryController.deleteCategory);

// product routes
router.post('/products', adminAuthorization ,ProductController.PostProducts);
router.get('/products', authorization ,ProductController.GetProducts);
router.put('/products/:id', adminAuthorization ,ProductController.PutProductWithId);
router.patch('/products/:id', adminAuthorization ,ProductController.PatchProductWithId);
router.delete('/products/:id', adminAuthorization ,ProductController.DeleteProductWithId);
module.exports = router;