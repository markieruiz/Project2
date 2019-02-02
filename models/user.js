module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  User.hasMany(models.Meetup, {
    onDelete: "cascade"
  });
  User.hasMany(models.Remark, {
    onDelete: "cascade",
    foreignKey: {
      name: "remarkId",
      allowNull: false
    }
  });
  User.hasMany(models.Users, {as: "Friend", through: "friends"})

  return User;
};
