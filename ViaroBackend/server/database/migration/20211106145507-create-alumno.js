"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Alumnos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Nombre: {
        type: Sequelize.STRING,
      },
      Apellidos: {
        type: Sequelize.STRING,
      },
      Genero: {
        type: Sequelize.STRING,
      },
      FechaNacimiento: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Alumnos");
  },
};
