module.exports = function (sequelize, DataTypes) {
  const Document = sequelize.define('Documents', {
    docTitle: DataTypes.STRING,
    docInfo: DataTypes.BLOB,
    addInfo: DataTypes.STRING
  });
  Document.associate = function (models) {
    Document.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Document;
};
