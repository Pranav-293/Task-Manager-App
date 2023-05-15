const User = require("../models/user");
const uniqid = require("uniqid");
const crypto = require("crypto");
const Org = require("../models/organization");

/**
 * Function to check if the user is logged in or not.
 * @returns - user object
 */
function isAuthenticated(req, res) {
  try {
    if (req.isAuthenticated()) {
      res.send({ status: "ok", user: req.user });
    } else {
      res.send({ status: "error", message: "Not Authenticated" });
    }
  } catch (e) {
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to log in the user
 * @param {object} passport - The passport object which has been initialized
 */
function login(passport) {
  return function handleLogin(req, res, next) {
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send(info.message);
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            req.session.level = user.level;
            res.send({
              status: "ok",
              message: "Authentication Successful",
              user: user.id,
              session: JSON.parse(JSON.stringify(req.session)),
              sessionId: JSON.stringify(req.session.id),
            });
            //console.log(req.user);
          });
        }
      })(req, res, next);
    } catch (e) {
      console.log(e);
      res.send({
        status: "error",
        message: e.message,
      });
    }
  };
}

/**
 * Function to get the name of the organization of the current user
 * @param {object} req
 * @param {object} res
 */
async function getOrg(req, res) {
  try {
    const orgId = req.user.orgId;
    const organization = await Org.findOne({ id: orgId }).catch((e) => {
      throw e;
    });
    if(organization===null) res.send({"status":"ok", "orgName": "none"})
    else res.send({"status":"ok", "orgName": organization.name});
  } catch (e) {
    res.send({ "status": "error", "message": e.message });
  }
}

/**
 * Function to get the name of the supervisor of the current user
 * @param {object} req
 * @param {object} res
 */
async function getSupervisor(req, res) {
  try{
    const reportingId = req.user.reporting;
    const supervisor = await User.findOne({id:reportingId}).catch((e) => {throw e});
    if(supervisor===null) res.send({"status":"ok","supervisor":"none"});
    else res.send({"status":"ok", "supervisor":supervisor.name})
  }
  catch (e) {
    res.send({ "status": "error", "message": e.message });
  }
}

/**
 * Function to create a new Admin
 * @param {object} req - req body should contain name, email, username and password of the object
 * @param {object} res 
 */
async function createAdmin(req, res) {
  if (!req.session.level || req.session.level !== "Super Admin")
    res.send({
      status: "error",
      message:
        "Unauthorized Access, only Super Admin can perform this operation",
    });
  else {
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (user) {
        res.send({
          status: "error",
          message: "An admin with this email id already exists",
        });
      } else {
        const salt = await crypto.randomBytes(16).toString("hex");
        crypto.pbkdf2(
          req.body.password,
          salt,
          1000,
          32,
          "sha256",
          async (err, hashedPassword) => {
            if (err) throw err;
            const superAdmin = await User.findOne({ level: "Super Admin" });
            const newUser = new User({
              id: uniqid(),
              name: req.body.name,
              email: req.body.email.toLowerCase(),
              username: req.body.username,
              password: hashedPassword.toString("hex"),
              salt: salt,
              level: "Admin",
              orgId: req.body.orgId,
              reporting: superAdmin.id,
              createdBy: superAdmin.id,
              updatedBy: superAdmin.id,
            });
            newUser
              .save()
              .then(res.send({ status: "ok", message: "Admin Registered" }))
              .catch((e) => console.log(e.message));
          }
        );
      }
    } catch (e) {
      console.log(e);
      res.send({
        status: "error",
        message: e.message,
      });
    }
  }
}

/**
 * Function to create a new organization
 * @param {object} req - req body should contains name and details of the organization
 * @param {object} res
 */
async function createOrg(req, res) {
  try {
    if (!req.session.level || req.session.level !== "Super Admin")
      res.send({
        status: "error",
        message:
          "Unauthorized Access, only Super Admin can perform this operation",
      });
    else {
      const org = await Org.findOne({ name: req.body.name });
      if (org) {
        res.send({
          status: "error",
          message: "Organization with this name already exists",
        });
        return;
      }
      const id = uniqid();
      const name = req.body.name;
      const details = req.body.details;
      const newOrg = new Org({
        id: id,
        name: name,
        details: details,
      });
      await newOrg
        .save()
        .then(res.send({ status: "ok", message: "Organization created" }))
        .catch((e) =>
          console.log({
            status: "error",
            message: e.message,
          })
        );
    }
  } catch (e) {
    console.log(e);
    res.send({
      status: "error",
      message: e.message,
    });
  }
}

/**
 * Function to get details of all organizations
 * @param {object} req
 * @param {object} res
 */
function getAllOrganizations(req, res) {
  Org.find()
    .then((orgs) => res.send({ status: "ok", data: orgs }))
    .catch((e) =>
      res.send({
        status: "error",
        message: e.message,
      })
    );
}


/**
 * Function to get details of all admins
 * @param {object} req
 * @param {object} res
 */
function getAllAdmins(req,res){
  User.find({level: "Admin"})
  .then((admins) => res.send({ status: "ok", admins: admins }))
  .catch((e) =>
    res.send({
      status: "error",
      message: e.message,
    })
  );
}

/**
 * Function to create a new user
 * @param {object} req - req body should contains name, email, username and password of the user
 * @param {*} res
 */
async function createUser(req, res) {
  try {
    if (!req.session.level || req.session.level !== "Admin")
      res.send({
        status: "error",
        message: "Unauthorized Access, only Admin can perform this operation",
      });
    else {
      const user = await User.findOne({
        email: req.body.email.toLowerCase(),
      }).catch((e) => {
        res.send({ status: "error", message: e.message });
      });
      if (user) {
        res.send({
          status: "error",
          message: "User with this email id already exists",
        });
        return;
      }
      const admin = await User.findOne({ id: req.session.passport.user });
      const salt = await crypto.randomBytes(16).toString("hex");
      crypto.pbkdf2(
        req.body.password,
        salt,
        1000,
        32,
        "sha256",
        async (err, hashedPassword) => {
          if (err) throw err;
          const newUser = new User({
            id: uniqid(),
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            username: req.body.username,
            password: hashedPassword.toString("hex"),
            salt: salt,
            level: "User",
            orgId: admin.orgId,
            reporting: admin.id,
            createdBy: admin.id,
            updatedBy: admin.id,
          });
          newUser
            .save()
            .then(res.send({ status: "ok", message: "User Registered" }))
            .catch((e) => res.send({ status: "error", message: e.message }));
        }
      );
    }
  } catch (e) {
    console.log(e);
    res.send({
      status: "error",
      message: e.message,
    });
  }
}

/**
 * Function to delete an organization
 * @param {object} req - req.params should contain id of the organization to be deleted
 * @param {object} res
 */
async function deleteOrg(req, res){
  try {
    if(!req.params && !req.params.id) {
      throw new Error("Please pass the parameters");
    }
    const orgId = req.params.id;
    Org.findOneAndDelete({id: orgId}).then(res.send({"status":"ok", "message":"deleted succesfully"})).catch(e => {throw e});
  }
  catch (e) {
    res.send({"status":"error", "message":e.message});
  }
}

/**
 * Function to delete a user
 * @param {object} req - req.params should contain id of the user to be deleted
 * @param {object} res
 */
async function deleteUser(req, res){
  try {
    if(!req.params && !req.params.id) {
      throw new Error("Please pass the parameters");
    }
    const adminId = req.params.id;
    User.findOneAndDelete({id: adminId}).then(res.send({"status":"ok", "message":"deleted succesfully"})).catch(e => {throw e});
  }
  catch (e) {
    res.send({"status":"error", "message":e.message});
  }
}

/**
 * Function to log out the user and destroy it's session
 * @param {object} req 
 * @param {object} res 
 */
function logOut(req, res) {
  try {
    // req.logout(function (err) {
    //   if (err) throw err;
    // });
    req.session.destroy(function (err) {
      if (err) throw err;
      res.send({ status: "ok", message: "Successfully logged out" });
    });
  } catch (e) {
    console.log(e);
    res.send({
      status: "error",
      message: e.message,
    });
  }
}

module.exports = {
  isAuthenticated,
  login,
  getOrg,
  getSupervisor,
  createAdmin,
  createOrg,
  getAllOrganizations,
  getAllAdmins,
  createUser,
  deleteOrg,
  deleteUser,
  logOut,
};
