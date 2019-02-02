module.exports = function(sequelize, DataTypes) {
  var Meetup = sequelize.define("Meetup", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  Meetup.associate = function(models) {
    Meetup.belongsTo(models.User, {
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