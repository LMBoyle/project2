module.exports = function (sequelize, DataTypes) {
  const Documents = sequelize.define('Documents', {
    docType: { type: DataTypes.STRING, allowNull: false },
    docCreated: { type: DataTypes.BOOLEAN },
    docFirstName: { type: DataTypes.STRING, allowNull: false },
    docLastName: { type: DataTypes.STRING, allowNull: false },
    docIdNumber: { type: DataTypes.TEXT, allowNull: true },
    docExpiration: { type: DataTypes.TEXT, allowNull: true },
    docPDF: { type: DataTypes.TEXT, allowNull: true },
    docFileName: { type: DataTypes.TEXT, allowNull: true },
    addInfo: { type: DataTypes.TEXT, allowNull: true }
  });
  Documents.associate = function (models) {
    Documents.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Documents;
};
