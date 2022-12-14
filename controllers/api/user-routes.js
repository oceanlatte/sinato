const router = require("express").Router();
//const { contentDisposition } = require("express/lib/utils");
const { User } = require("../../models");

///GET /api/users
router.get("/", (req, res) => {
  //Access our User model and run .findAll() method
  //.then assigns the data we get from findAll() to dbUserData
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: "Lernantino", password: "password1234"}
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // save user data to session
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
      where: {
          username: req.body.username
      }
  }).then(dbUserData => {
      if (!dbUserData) {
          res.status(400).json({ message: "No user with that username!" });
          return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if(!validPassword) {
          res.status(400).json({ message: "That's the wrong password!"});
          return;
      }

      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({ user: dbUserData, message: 'You are now logged in!'});
      });
  })
});

// logout route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/users/1 to update
router.put("/:id", (req, res) => {
  //expects {username:"lernantino", email: "lernantino@gmail.com", password:"password1234"}

  //if req.body had exavt key/value pairs to match the model, you can just use the `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
