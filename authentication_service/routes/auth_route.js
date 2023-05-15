const express = require("express");
const authenticate = require("../middleware/authentication");
const authController = require("../controller/auth_controller");

module.exports = function (passport) {
  const router = express.Router();

  // Check if the user is authenticated or not
  router.get("/isAuthenticated", authController.isAuthenticated);

  // Login the user
  router.post("/login", authController.login(passport));

  // All the routes that come after this middleware are protected,
  // and can only be accessed if the user is logged in.
  router.use(authenticate);

  // Get the name the organization of the current user
  router.get("/organization", authController.getOrg);

  //Get the name of the supervisor of current user
  router.get("/supervisor", authController.getSupervisor);

  // Create a new Admin
  router.post("/admin", authController.createAdmin);

  // Create a new Organization
  router.post("/organization", authController.createOrg);

  //Get All Organizations
  router.get("/all-organizations", authController.getAllOrganizations);

  //Get All Admins
  router.get("/all-admins", authController.getAllAdmins);

  // Create a new user
  router.post("/user", authController.createUser);

  //Delete an organization
  router.delete("/organization/:id", authController.deleteOrg);

  //Delete any user
  router.delete("/user/:id", authController.deleteUser);

  // Logout user
  router.post("/logout", authController.logOut);

  // For handling any unwanted requests
  router.use("*", (req, res) => {
    res.status(404).send(`Sorry, can't find ${req.baseUrl}`);
  });

  return router;
};
