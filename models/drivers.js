module.exports = function (sequelize, DataTypes) {
  const DriversLicense = sequelize.define('DriversLicense', {
    licenseFirstName: DataTypes.STRING,
    licenseLastName: DataTypes.STRING,
    licenseNumber: DataTypes.INTEGER,
    docPDF: DataTypes.BLOB,
    addInfo: DataTypes.STRING
  });
  DriversLicense.associate = function (models) {
    DriversLicense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return DriversLicense;
};
