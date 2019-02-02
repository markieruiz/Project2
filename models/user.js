module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasMany(models.Meetup, {
      onDelete: "cascade"
    });
    User.hasMany(models.Remark, {
      onDelete: "cascade"
    });
    //User.hasMany(models.Users, { as: "Friend", through: "friends" });
  };

  return User;
};
