"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alumno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alumno.hasMany(models.Alumnogrado);
      // define association here
    }
  }
  Alumno.init(
    {
      Nombre: DataTypes.STRING,
      Apellidos: DataTypes.STRING,
      Genero: DataTypes.STRING,
      FechaNacimiento: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Alumno",
    }
  );
  return Alumno;
};
