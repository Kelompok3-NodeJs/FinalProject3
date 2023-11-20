const {TransactionHistory,Product,Category,User} = require('../models')

class TransactionHistoryController{
    static async PostTransaction(req,res){
        try {
            const {productId,quantity} = req.body 
            const User = res.locals.user
            const product = await Product.findOne({
                where:{
                    id: productId
                }
            })
            // cek product ada atau tidak
            if(!product){
                res.status(404).json({error: 'Product not found'})
            }
            // cek stock
            if(product.stock < quantity){
                res.status(400).json({error: 'Not enough stock'})
            }
            // cek balance cukup atau tidak
            const total = product.price * quantity
            if(User.balance < total){res.status(400).json({error: 'Not enough balance'})}

            // update stock
            await Product.update({
                stock: product.stock - quantity
            },{
                where:{
                    id: productId
                }
            })

            // update balance
            await User.update({
                balance: User.balance - total
            },{
                where:{
                    id: User.id
                }
            })

            // update sold product amount in category
            Category.increment('sold_product_amount', {
                by: quantity,
                where: {
                    id: product.CategoryId
                }
            })
            

            // create transaction
            const transaction = await TransactionHistory.create({
                ProductId: product.id,
                UserId: User.id,
                quantity,
                total_price: total,
            }) 
                const response = {
                    message: 'You have successfully purchased the product',
                    transactionBill: {
                        total_price: `Rp ${transaction.total_price.toLocaleString('id-ID')}`,
                        quantity: transaction.quantity,
                        product_name: product.title,
                    }
                }
                res.status(201).json(response)
            

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static GetTransactionUser(req,res){
        try {
            const User = res.locals.user
            TransactionHistory.findAll({
                where:{
                    UserId: User.id
                },
                include: [{model: Product}]
            })
            .then((result) => {
                let response = result.map((transaction) => {
                    return {
                        transactionHistories:
                        [
                            {
                                ProductId: transaction.ProductId,
                                UserId: transaction.UserId,
                                quantity: transaction.quantity,
                                total_price: `Rp ${transaction.total_price.toLocaleString('id-ID')}`,
                                createdAt: transaction.createdAt,
                                updatedAt: transaction.updatedAt,
                                Product: {
                                    id: transaction.Product.id,
                                    title: transaction.Product.title,
                                    price: `Rp ${transaction.Product.price.toLocaleString('id-ID')}`,
                                    stock: transaction.Product.stock,
                                    CategoryId: transaction.Product.CategoryId
                                }
                            }
                        ]
                    }
                })
                res.status(200).json(response);
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static GetTransactionAdmin(req,res){
        try {
            TransactionHistory.findAll({
                include: [{model: Product},{model: User}]
            })
            .then((result) => {
                let response = result.map((transaction) => {
                    return {
                        transactionHistories:
                        [
                            {
                                ProductId: transaction.ProductId,
                                UserId: transaction.UserId,
                                quantity: transaction.quantity,
                                total_price: `Rp ${transaction.total_price.toLocaleString('id-ID')}`,
                                createdAt: transaction.createdAt,
                                updatedAt: transaction.updatedAt,
                                Product: {
                                    id: transaction.Product.id,
                                    title: transaction.Product.title,
                                    price: `Rp ${transaction.Product.price.toLocaleString('id-ID')}`,
                                    stock: transaction.Product.stock,
                                    CategoryId: transaction.Product.CategoryId
                                },
                                User: {
                                    id: transaction.User.id,
                                    email: transaction.User.email,
                                    role: transaction.User.role,
                                    balance:`Rp ${transaction.User.balance.toLocaleString('id-ID')}`,
                                    createdAt: transaction.User.createdAt,
                                    updatedAt: transaction.User.updatedAt,
                                }
                            }
                        ]
                    }
                })
                res.status(200).json(response);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static getTransactionById(req, res) {
        try {
            const id = req.params.id;
            TransactionHistory.findByPk(id, {
                include: [{ model: Product }],
            }).then((result) => {
                if (!result) {
                    res.status(404).json({ error: 'Transaction not found' });
                } else if (result.UserId !== res.locals.user.id) {
                    res.status(401).json({ error: 'Unauthorized: Other user transaction, please use your own transactionId' });
                } else {
                    let response = {
                        ProductId: result.ProductId,
                        UserId: result.UserId,
                        quantity: result.quantity,
                        total_price: `Rp ${result.total_price.toLocaleString('id-ID')}`,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt,
                        Product: {
                            id: result.Product.id,
                            title: result.Product.title,
                            price: `Rp ${result.Product.price.toLocaleString('id-ID')}`,
                            stock: result.Product.stock,
                            CategoryId: result.Product.CategoryId,
                        },
                    };
                    res.status(200).json(response);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

module.exports = TransactionHistoryController