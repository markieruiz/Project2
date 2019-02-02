module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Friend;
};
