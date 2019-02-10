module.exports = function(sequelize, DataTypes) {
  var Meetup = sequelize.define("Meetup", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    sport: DataTypes.STRING,
    starttime: DataTypes.DATE,
    latitude: DataTypes.DECIMAL(8, 6),
    longitude: DataTypes.DECIMAL(8, 6)
  });
  Meetup.associate = function(models) {
    Meetup.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Meetup.hasMany(models.Joinmeetup, {
      foreignKey: {
        allowNull: false
      }
    });
    Meetup.hasMany(models.Remark, {
      onDelete: "cascade"
    });
  };

  return Meetup;
};
//http://docs.sequelizejs.com/manual/tutorial/associations.html
