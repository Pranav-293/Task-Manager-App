const redisStore = require("../config/redis.config");
const session = require("express-session");

// Session middleware configuration
module.exports = session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "Secret1234",
    name: "sessionId",
    cookie:{
        secure: false, // if true: only transmit cookies over https
        httpOnly: true, // it prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24, // one day
    }
});