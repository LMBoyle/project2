module.exports = function (sequelize, DataTypes) {
  const Documents = sequelize.define('Documents', {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Documents;
};
