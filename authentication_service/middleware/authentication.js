 /**
  * Function to check if the user is logged in or not
  * @param {*} req 
  * @param {*} res 
  * @param {function} next - the callback function which will be called if the user is logged in
  */
 function authenticate(req, res, next) {
  try {
    if(!req.isAuthenticated()){
      res.status(401).send({
            "status":"error",
            "message":"You are not logged in"
          });
    } else {
      next();
    }
  }
   catch (e) {
    console.log(e);
    res.send({
      "status":"error",
      "message":e.message
    });
  }
}

module.exports = authenticate;
