import { Sequelize } from "sequelize";

const sequelize = new Sequelize("users", "root", "1400", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;