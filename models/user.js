module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    googleID: {
      type: DataTypes.STRING,
      notEmpty: true
    }
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
