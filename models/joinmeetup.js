module.exports = function(sequelize, DataTypes) {
  var Joinmeetup = sequelize.define("Joinmeetup", {});

  Joinmeetup.associate = function(models) {
    Joinmeetup.belongsTo(models.Meetup, {
      onDelete: "cascade"
    });
    Joinmeetup.belongsTo(models.User, {
      onDelete: "cascade"
    });
    //User.hasMany(models.Users, { as: "Friend", through: "friends" });
  };

  return Joinmeetup;
};
