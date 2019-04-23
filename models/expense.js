'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    expenseType: DataTypes.STRING,
    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    location: DataTypes.STRING,
    note: DataTypes.TEXT,
    date: DataTypes.DATE,
    cost: DataTypes.FLOAT
  }, {});
  Expense.associate = function(models) {
    Expense.belongsTo(models.User);
  };
  return Expense;
};