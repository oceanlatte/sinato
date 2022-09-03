const session = require("express-session");
const express = require("express");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
    secret: "Secrets",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(require("./controllers"));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
