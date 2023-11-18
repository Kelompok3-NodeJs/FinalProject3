'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.transactionhistory);
    }
  }
  User.init({
    // Model attributes are defined here

    // full_name definition
    full_name: {
      type: DataTypes.STRING,
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

    // balance definition
    balance: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};