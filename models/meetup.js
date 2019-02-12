module.exports = function(sequelize, DataTypes) {
  var Meetup = sequelize.define("Meetup", {
    title: {
      type: DataTypes.STRING,
      notEmpty: true
    },  
    description: DataTypes.TEXT,
    sport: {
      type: DataTypes.STRING,
      isIn: [["baseball", "basketball", "soccer"]],
      notEmpty: true
    },
    starttime: {
      type: DataTypes.DATE,
      isDate: true,
      isAfter: "2019-01-01"
    },
    latitude: {
      type: DataTypes.DECIMAL(8, 6),
      validate: {
        max: 85,
        min:  -85.05115,
        isDecimal: true
      }
    },
    longitude: {
      type: DataTypes.DECIMAL(8, 6),
      validate: {
        max: 180,
        min:  -180,
        isDecimal: true
      }
    },
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
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Meetup;
};
