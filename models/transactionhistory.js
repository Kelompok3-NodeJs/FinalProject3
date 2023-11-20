'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'UserId'})
      this.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  }
  TransactionHistory.init({
    // Model attributes are defined here

    // quantity definition and validation
    quantity: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Quantity must be a number'
        }
      }
    },

    // total_price definition and validation
    total_price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Total price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Total price must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};