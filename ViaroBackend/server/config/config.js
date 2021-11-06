import Sequelize from "sequelize";

export default new Sequelize("viaro", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
