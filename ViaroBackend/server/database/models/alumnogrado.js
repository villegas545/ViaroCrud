"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alumnogrado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alumnogrado.belongsTo(models.Grado);
      Alumnogrado.belongsTo(models.Alumno);
    }
  }
  Alumnogrado.init(
    {
      AlumnoId: DataTypes.INTEGER,
      GradoId: DataTypes.INTEGER,
      Seccion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Alumnogrado",
    }
  );
  return Alumnogrado;
};
