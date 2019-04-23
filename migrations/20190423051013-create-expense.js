'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expenseType: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      subcategory: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      cost: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Expenses');
  }
};