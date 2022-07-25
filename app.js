const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/database");
const homePageRoutes = require("./routes/homepage");
const errorController = require("./controllers/error");
const Patient = require("./models/patient");
const User = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use(homePageRoutes);
app.use(errorController.getErrorPage);

const server = http.createServer(app);

Patient.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Patient);
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Mohan", email: "mohan@gmail.com" });
    }
    return user;
  })
  .then(() => {
    server.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
