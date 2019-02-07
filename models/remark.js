module.exports = function(sequelize, DataTypes) {
  var Remark = sequelize.define("Remark", {
    text: DataTypes.STRING
  });
  Remark.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
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
