const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const {authorization,adminAuthorization,getTransactionByIdAuth} = require('../middlewares/authorization');
const CategoryController = require('../controllers/CategoryController');
const UserController = require('../controllers/usercontroller');
const ProductController = require('../controllers/ProductController');
const TransactionHistoryController = require('../controllers/TransactionHistoryController');


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

// transcation routes
router.post('/transactions', authorization ,TransactionHistoryController.PostTransaction);
router.get('/transactions/user', authorization ,TransactionHistoryController.GetTransactionUser);
router.get('/transactions/admin', adminAuthorization ,TransactionHistoryController.GetTransactionAdmin);
router.get('/transactions/:id', authorization, getTransactionByIdAuth ,TransactionHistoryController.getTransactionById);
module.exports = router;