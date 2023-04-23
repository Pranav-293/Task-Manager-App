const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.get("/temp",(req,res)=>{
    res.send(`${JSON.stringify(req.session)}`);
});


router.use(authenticate);

router.get("/", (req,res)=>{
    res.send("Hello World");
});

module.exports = router;