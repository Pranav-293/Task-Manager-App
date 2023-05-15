/**
  * Function to check if the user is logged in or not
  * @param {object} req
  * @param {object} res
  * @param {function} next - the callback function which will be called if the user is logged in
  */
function authenticate(req, res, next) {
    try {
      const session = req.session;
      if (!session || !session.passport || !session.passport.user) {
        res.status(401).send({"status":"error", "message":"You are not logged in"});
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      res.send({"status":"error", "message":e.message});
    }
  }
  module.exports = authenticate;