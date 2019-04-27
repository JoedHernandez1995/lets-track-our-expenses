'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    label: DataTypes.STRING
  }, {});
  Income.associate = function(models) {
    // associations can be defined here
  };
  return Income;
};