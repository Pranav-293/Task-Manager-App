const session = require("express-session");

module.exports = session({
    resave: false,
    saveUninitialized: false,
    secret: "Secret1234",
    name: "sessionId",
});