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
