module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    googleID: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasMany(models.Meetup, {
      onDelete: "cascade"
    });
    User.hasMany(models.Joinmeetup, {
      foreignKey: {
        allowNull: false
      }
    });
    User.hasMany(models.Remark, {
      onDelete: "cascade"
    });
  };

  return User;
};
