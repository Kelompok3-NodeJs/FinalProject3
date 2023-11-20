'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {foreignKey: 'CategoryId'})
    }
  }
  Product.init({
    // Model attributes are defined here

    // title definition and validation
    title: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },

    // price definition and validation
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        min: {
          args: [0],
          msg: 'Price cannot be less than 0'
        },
        max: {
          args: [50000000],
          msg: 'Price cannot be more than 50000000'
        }
      },
    },

    // stock definition and validation
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number'
        },
        min: {
          args: [5],
          msg: 'Stock cannot be less than 5'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};