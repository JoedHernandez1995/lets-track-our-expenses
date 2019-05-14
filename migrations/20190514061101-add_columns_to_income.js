'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Incomes',
        'incomeType',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Incomes',
        'incomeTypeCategory',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
       queryInterface.removeColumn('Incomes', 'incomeType'),
        queryInterface.removeColumn('Incomes', 'incomeTypeCategory')
    ]);
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
