const express = require("express");
const authenticate = require("../middleware/authenticate");
const taskController = require("../controllers/task_controller");
const router = express.Router();


router.use(authenticate);


router.get("/user-detail", taskController.getUserDetail);

// Get all tasks
router.get("/all-tasks", taskController.getTasks);

// Creates a new Task
router.post("/task", taskController.createTask);

// Deletes a task
router.delete("/task/:id", taskController.deleteTask);

// Changes the status of the task to in Progress
router.put("/mark-inProgress/:id",taskController.markInProgress);

// Change the status of the task to completed
router.put("/mark-complete/:id",taskController.markComplete);

// Get all users
router.get("/all-users", taskController.getAllUsers);

//Update the task
router.put("/update-task/:id",taskController.updateTask);

//Delete all tasks of an user
router.delete("/all-tasks/:id",taskController.deleteAllTasksOfAUser);

router.get("/assigned-tasks/:id", taskController.getAssignedTasksByUserId);

router.get("/personal-tasks",taskController.getPersonalTasks);

//For any unwanted request
router.use("*", (req,res) =>{
    res.send("The page you are looking for does not exist");
})

module.exports = router;