const express = require("express");
const authenticate = require("../middleware/authenticate");
const taskController = require("../controllers/task_controller");
const router = express.Router();


router.use(authenticate);

router.get("/user-detail", taskController.getUserDetail);

router.get("/tasks", taskController.getTasks);

router.post("/task", taskController.createTask);

router.delete("/task/:id", taskController.deleteTask);

router.put("/mark-inProgress/:id",taskController.markInProgress);

router.put("/mark-complete/:id",taskController.markComplete);

router.get("/users-under-admin", taskController.getUsersUnderAdmin);

router.get("/assigned-tasks/:id", taskController.getAssignedTasksByUserId);

router.get("/personal-tasks",taskController.getPersonalTasks);

router.use("*", (req,res) =>{
    res.send("The page you are looking for does not exist");
})

module.exports = router;