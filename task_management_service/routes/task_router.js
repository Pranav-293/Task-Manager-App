const express = require("express");
const authenticate = require("../middleware/authenticate");
const taskController = require("../controllers/task_controller");
const router = express.Router();


router.use(authenticate);

router.get("/user", taskController.getUser);

router.get("/tasks", taskController.getTasks);

router.post("/task", taskController.createTask);

router.delete("/task", taskController.deleteTask);

router.use("*", (req,res) =>{
    res.send("The page you are looking for does not exist");
})

module.exports = router;