const express  = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./config/db.config");
const session = require("./middleware/session");
const passport = require("passport");
const initializePassport = require("./config/passport.config");
const router = require("./routes/auth_route")(passport);
const cookieParser = require("cookie-parser");


initializePassport(passport);
app.use(express.json());
app.use(cookieParser("Secret1234"));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);



app.listen(PORT, () => {
    console.log(`Authentication server is running on port ${PORT}`);
})