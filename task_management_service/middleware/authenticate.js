function authenticate(req, res, next) {
    try {
      const session = req.session;
      if (!session) {
        // const err = new Error("You are not authorized to access this route");
        // err.statusCode = 401;
        // next(err);
        res.status(401).send("Unauthorized Access");
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  }
  module.exports = authenticate;