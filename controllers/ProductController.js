const {Product,Category} = require('../models');


class ProductController {
    static PostProducts(req, res) {
        try {
            const { title, price, stock, CategoryId } = req.body;
            Category.findOne({ where: { id: CategoryId } })
                .then((category) => {
                    if (!category) {
                        return res.status(404).json({ error: ' Category not Found' });
                    }
                    Product.create({
                        title,
                        price,
                        stock,
                        CategoryId,
                    })
                        .then((result) => {
                            let response = {
                                id: result.id,
                                title: result.title,
                                price: `Rp ${result.price.toLocaleString('id-ID')}`,
                                stock: result.stock,
                                CategoryId: result.CategoryId,
                                updatedAt: result.updatedAt,
                                createdAt: result.createdAt,
                            };
                            res.status(201).json(response);
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).json(error);
                        });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static GetProducts(req, res) {
        Product.findAll()
            .then((result) => {
                let response = result.map((product) => {
                    return {
                        id: product.id,
                        title: product.title,
                        price: `Rp ${product.price.toLocaleString('id-ID')}`,
                        stock: product.stock,
                        CategoryId: product.CategoryId,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    };
                });
                res.status(200).json(response);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    }

    static PutProductWithId(req, res) {
        try {
            const {price,stock,title} = req.body;
            const id = req.params.id;
            Product.update({
                price,
                stock,
                title
            }, {
                where: {
                    id
                },
                returning: true
            })
            .then(([rowsUpdate, [result]]) => {
                if(!rowsUpdate){
                    return res.status(404).json({error: 'Product not Found'});
                }
                let response = {
                    id: result.id,
                    title: result.title,
                    price: `Rp ${result.price.toLocaleString('id-ID')}`,
                    stock: result.stock,
                    CategoryId: result.CategoryId,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                }
                res.status(201).json(response);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static PatchProductWithId(req, res) {
        try {
            const {CategoryId} = req.body;
        const id = req.params.id;
        Product.findOne({where: {id:CategoryId}})
        if(!CategoryId){
            return res.status(404).json({error: 'Category not Found'});
        }
        Product.update({
            CategoryId
        }, {
            where: {
                id
            },
            returning: true
        })
        .then(([rowsUpdate, [result]]) => {
            if(!rowsUpdate){
                return res.status(404).json({error: 'Product not Found'});
            }
            let response = {
                id: result.id,
                title: result.title,
                price: `Rp ${result.price.toLocaleString('id-ID')}`,
                stock: result.stock,
                CategoryId: result.CategoryId,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
            }
            res.status(201).json(response);
        })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static DeleteProductWithId(req, res) {
        try {
            const id = req.params.id;
            Product.destroy({where: {id}})
            .then((result) => {
                if(!result){
                    return res.status(404).json({error: 'Product not Found'});
                }
                res.status(200).json({message: 'Product has been succesfully deleted'});
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}
module.exports = ProductController;