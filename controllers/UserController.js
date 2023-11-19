const { query } = require('express')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {User} = require('../models')

class UserController {
    static register(req, res) {
        try {
            const { full_name, password, gender, email } = req.body;
            User.create({
                full_name,
                password,
                gender,
                email,
            })
            .then((result) => {
                let response = {
                    id: result.id,
                    full_name: result.full_name,
                    email: result.email,
                    gender: result.gender,
                    balance: `Rp ${result.balance}`,
                    createdAt: result.createdAt,
                }
                res.status(201).json(response);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;