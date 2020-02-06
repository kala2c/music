'use strict';
module.exports = (sequelize, DataTypes) => {
  const music = sequelize.define('music', {
    name: DataTypes.STRING,
    singer: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.INTEGER,
    groups_id: DataTypes.INTEGER
  }, {});
  music.associate = function(models) {
    // associations can be defined here
  };
  return music;
};