'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    // Model attributes are defined here

    // full_name definition and validation
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Full name cannot be empty'
        }
      }
    },

    // email definition and validation
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },

    // password definition and validation
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 10],
          msg: 'Password must be at least 6 characters'
        }
      }
    },

    // gender definition and validation
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Gender cannot be empty'
        },
        isIn: {
          args: [['male', 'female']],
          msg: 'Gender must be either "male" or "female"'
        }
      }
    },

    // role definition and validation
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role cannot be empty'
        },
        isIn: {
          args: [['admin', 'customer']],
          msg: 'Role must be either "admin" or "customer"'
        }
      }
    },

    // balance definition and validation
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Balance cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Balance must be a number'
        },
        min: {
          args: [0],
          msg: 'Balance cannot be less than 0'
        },
        max: {
          args: [100000000],
          msg: 'Balance cannot be more than 100000000'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user, options) => {
       try {
        const hashedPassword = await hashPassword(user.password);
         user.password = hashedPassword;
         user.role = 'customer';
         user.balance = 0;
         return user;
       } catch (error) {
          console.log(error);
       }
      }
    }
  });
  return User;
};