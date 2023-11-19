const {Category,Product} = require('../models')

class CategoryController {
    static PostCategory(req, res, next) {
        try {
            const {type} = req.body;
            Category.create({
                type
            })
            .then((result) => {
                let response = {
                    id: result.id,
                    type: result.type,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    sold_product_amount: result.sold_product_amount,
                }
                res.status(201).json(response);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static GetCategory(req,res) {
        try {
            Category.findAll({
                include: [{model: Product}]
            })
            .then((result) => {
                let response = result.map((category) => {
                    return {
                        id: category.id,
                        type: category.type,
                        sold_product_amount: category.sold_product_amount,
                        createdAt: category.createdAt,
                        updatedAt: category.updatedAt,
                        Products: [
                            {
                                id: category.Products.id,
                                title: category.Products.title,
                                price: category.Products.price,
                                stock: category.Products.stock,
                                CategoryId: category.Products.CategoryId,
                                createdAt: category.Products.createdAt,
                                updatedAt: category.Products.updatedAt,
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


}

module.exports = CategoryController