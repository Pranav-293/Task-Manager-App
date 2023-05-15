const db = require("../config/db.config");
const Tasks = require("../models/task");
const uniqid = require("uniqid");
const Users = require("../models/user");
const Org = require("../models/organization");

async function getUserDetail(req, res) {
  try {
    const user = await Users.findOne({ id: req.session.passport.user }).catch(
      (e) => {
        throw e;
      }
    );
    const supervisor = await Users.findOne({ id: user.reporting }).catch(
      (e) => {
        throw e;
      }
    );
    const org = await Org.findOne({ id: user.orgId }).catch((e) => {
      throw e;
    });
    const result = {
      name: user.name,
      email: user.email,
      username: user.username,
      level: user.level,
      supervisor: supervisor.name,
      orgName: org.name,
      orgDetail: org.details,
    };
    res.send({
      status: "ok",
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/***
 * Creates a new task
 * @param {object} req - req.body should contain name, details of the task
 * @param {object} res - the response object
 */
function createTask(req, res) {
  try {
    if (!req.body || !req.body.name || !req.body.detail) {
      throw new Error("Please pass required arguments in request body");
    }
    if (req.session.level === "Super Admin") {
      throw new Error("Only Admins and Users can create a task");
    }
    const taskId = uniqid();
    const taskName = (req.body.name).trim();
    const taskDetail = (req.body.detail).trim();
    if(taskName.length===0 || taskDetail.length===0) {
      throw new Error("Please fill all the fields");
    }
    const taskCreatedBy = req.session.passport.user;
    const taskUpdatedBy = req.session.passport.user;
    const taskStatus = "todo";
    const taskUserId = (req.session.level==="User")?req.session.passport.user : req.body.userId;
    const newTask = new Tasks({
      id: taskId,
      name: taskName,
      detail: taskDetail,
      status: taskStatus,
      createdBy: taskCreatedBy,
      updatedBy: taskUpdatedBy,
      userId: taskUserId,
    });
    newTask
      .save()
      .then(res.send({ status: "ok", message: "Task created successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Get all the tasks from the database
 */
async function getTasks(req, res) {
  try {
    if (req.session.level === "Super Admin") {
      throw new Error("You are a Super Admin");
    }
      const tasks = await Tasks.find().catch((e) => {
        throw e;
      });
      res.send({
        status: "ok",
        data: tasks,
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Delete a task
 * @param {object} req - req.params should contain id of the task
 * @param {object} res
 */
function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    Tasks.deleteOne({ id: taskId })
      .then(res.send({ status: "ok", message: "task deleted successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}


/**
 * Function to update the task
 * @param {object} req - res.body.data should contain details of the task
 * @param {object} res
 */
function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    if(!req.body || !req.body.data || req.body.data==="" || req.body.data.trim().length===0) throw new Error("Cannot leave details empty");
    Tasks.findOneAndUpdate({id:taskId}, {detail: req.body.data})
      .then(res.send({ status: "ok", message: "task updated successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to change the status of the task to inProgress
 * @param {object} req - res.params should contain id of the task
 * @param {object} res
 */
function markInProgress(req, res) {
  try {
    const taskId = req.params.id;
    Tasks.updateOne({ id: taskId }, { status: "in-progress" })
      .then(res.send({ status: "ok", message: "task updated successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to change the status of the task to complete
 * @param {object} req - res.params should contain id of the task
 * @param {object} res
 */
function markComplete(req, res) {
  try {
    const taskId = req.params.id;
    Tasks.updateOne({ id: taskId }, { status: "completed" })
      .then(res.send({ status: "ok", message: "task updated successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to get all the users from the database
 * @param {object} req 
 * @param {object} res
 */
async function getAllUsers(req, res) {
  try {
    const users = await Users.find({level: "User"}).catch(
      (e) => {
        throw e;
      }
    );
    res.send({
      status: "ok",
      data: users,
    });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to delete all the tasks of a user
 * @param {object} req - res.params should contain id of the user
 * @param {object} res
 */
async function deleteAllTasksOfAUser(req, res) {
  try {
    const id = req.params.id;
    Tasks.deleteMany({ userId: id })
      .then(res.send({ status: "ok", message: "All tasks of user deleted successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to get all the tasks assigned to a specific user
 * @param {object} req - res.params should contain id of the user
 * @param {object} res
 */
async function getAssignedTasksByUserId(req, res) {
  try {
    const adminId = req.session.passport.user;
    const userId = req.params.id;
    const tasks = await Tasks.find({
      createdBy: adminId,
      userId: userId,
    }).catch((e) => {
      throw e;
    });
    res.send({ status: "ok", data: tasks });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

/**
 * Function to get all the personal tasks
 * @param {object} req
 * @param {object} res
 */
async function getPersonalTasks(req, res) {
  try {
    if(req.session.level!=="User") throw new Error("Only users can fetch their personal tasks");
    const userId = req.session.passport.user;
    const tasks = await Tasks.find({createdBy:userId}).catch(e => {throw e});
    res.send({"status":"ok" , "data": tasks});
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

module.exports = {
  getUserDetail,
  createTask,
  getTasks,
  deleteTask,
  markInProgress,
  markComplete,
  getAllUsers,
  updateTask,
  deleteAllTasksOfAUser,
  getAssignedTasksByUserId,
  getPersonalTasks,
};
