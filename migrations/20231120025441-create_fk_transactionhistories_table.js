'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('TransactionHistories', 'ProductId', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn('TransactionHistories', 'UserId', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'product_id_fk',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'user_id_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('TransactionHistories', 'product_id_fk');
    await queryInterface.removeConstraint('TransactionHistories', 'user_id_fk');
    await queryInterface.removeColumn('TransactionHistories', 'ProductId');
    await queryInterface.removeColumn('TransactionHistories', 'UserId');
  }
};
