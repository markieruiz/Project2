module.exports = function(sequelize, DataTypes) {
  var Meetup = sequelize.define("Meetup", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  Meetup.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
  Meetup.hasMany(models.Remark, {
    onDelete: "cascade",
    foreignKey: {
      name: "remarkId",
      allowNull: false
    }
  });

  return Meetup;
};

//http://docs.sequelizejs.com/manual/tutorial/associations.html