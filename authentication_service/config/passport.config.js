const User = require("../models/user");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport){
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
             async (email, password, done) => {
                try{
                    const user = await User.findOne({email: email.toLowerCase()});
                        if(!user) return done(null,false,{message: "User with this email does not exist"});
                        crypto.pbkdf2(password, user.salt, 1000, 32, 'sha256', (err, hashedPassword) => {
                            if(err) throw err;
                            if(user.password===hashedPassword.toString("hex")){
                                done(null, user);
                            }else{
                                done(null, false, {message: "Incorrect Password"});
                            }
                        });
                }
                catch(e){
                    done(e);
                }
            },
        ),
    );
    passport.serializeUser((user,cb) => {
        cb(null,user.id);
    });
    passport.deserializeUser((id,cb) => {
        User.findOne({id:id}).then(user => cb(null,user)).catch(e => cb(e,null));
    });
};