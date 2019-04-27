'use strict';
module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('Income', {
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    label: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Income.associate = function(models) {
  	Income.belongsTo(model.User);
    // associations can be defined here
  };
  return Income;
};