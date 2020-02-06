'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    name: DataTypes.STRING,
    count: DataTypes.NUMBER,
    logo: DataTypes.STRING,
    desc: DataTypes.STRING,
    status: DataTypes.NUMBER
  }, {});
  groups.associate = function(models) {
    // associations can be defined here
  };
  return groups;
};