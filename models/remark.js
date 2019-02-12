module.exports = function(sequelize, DataTypes) {
  var Remark = sequelize.define("Remark", {
    text: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });
  Remark.associate = function(models) {
    Remark.belongsTo(models.Meetup, {
      foreignKey: {
        allowNull: false
      }
    });
    Remark.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Remark;
};
