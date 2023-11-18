'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'CategoryId', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addConstraint('Products', {
      fields: ['CategoryId'],
      type: 'foreign key',
      name: 'category_id_fk',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Products', 'category_id_fk');
    await queryInterface.removeColumn('Products', 'CategoryId');
  }
};
