const {Category} = require('../models')

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
        }
    }
}

module.exports = CategoryController