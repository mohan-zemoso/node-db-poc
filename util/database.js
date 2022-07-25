const Sequelize = require("sequelize");

const sequelize = new Sequelize("patient-db", "node", "Node@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;