module.exports = function(sequelize, DataTypes) {
  var Friend = sequelize.define("Friend", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Friend.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Friend.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Friend;
};
