const { query } = require('express')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {User} = require('../models');
const user = require('../models/user');

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
                    balance: `Rp ${result.balance.toLocaleString('id-ID')}`,
                    createdAt: result.createdAt,
                }
                res.status(201).json(response);
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static login (req, res) {
        try {
            const {email, password} = req.body;
            User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if (!user) {
                    throw {
                        name: 'user login error',
                        devMessage: 'user not found',
                    }
                }
                const isCorrect = comparePassword(password, user.password);
                if (!isCorrect) {
                    throw {
                        name: 'user login error',
                        devMessage: 'wrong password',
                    }
                }
                const payload = {
                    id: user.id,
                    email: user.email,
                }
                const token = generateToken(payload);
                res.status(200).json({token});
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;