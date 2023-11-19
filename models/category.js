'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    // Model attributes are defined here

    // type definition and validation
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Type cannot be empty'
        }
      },
      unique: {
        args: true,
        msg: 'Type already in use!'
      }
    },

    // sold_product_amount definition and validation
    sold_product_amount:{ 
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Sold product amount cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Sold product amount must be a number'
        }
      }
    }
  }, { 
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeCreate: (category, options) => {
        category.sold_product_amount = 0;
      }
    }
  });
  return Category;
};