"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profesor.hasMany(models.Grado, { onDelete: 'cascade' });
    }
  }
  Profesor.init(
    {
      Nombre: DataTypes.STRING,
      Apellidos: DataTypes.STRING,
      Genero: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profesor",
    }
  );
  return Profesor;
};
