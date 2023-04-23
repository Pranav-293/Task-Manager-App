const express = require("express");
const authenticate = require("../middleware/authentication");
const authController = require("../controller/auth_controller");

module.exports = function (passport) {
  const router = express.Router();

  router.post("/login", authController.login(passport));

  // All the routes that come after this middleware are protected,
  // and can only be accessed if the user is logged in.
  router.use(authenticate);

  router.post("/admin", authController.createAdmin);

  router.post("/organization", authController.createOrg);

  router.get("/all-organizations", authController.getAllOrganizations);

  router.post("/user", authController.createUser);

  router.post("/logout", authController.logOut);

  router.use("*", (req, res) => {
    res.status(404).send("Sorry, can't find that");
  });

  return router;
};
