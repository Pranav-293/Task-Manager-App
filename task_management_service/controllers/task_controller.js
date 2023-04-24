const db = require("../config/db.config");
const Tasks = require("../models/task");
const uniqid = require("uniqid");
const Users = require("../models/user");

async function getUser(req, res) {
  try {
    const user = await Users.findOne({ id: req.session.passport.user }).catch(
      (e) => {
        throw e;
      }
    );
    res.send({
      status: "ok",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

function createTask(req, res) {
  try {
    if (!req.body || !req.body.name || !req.body.detail || !req.body.userId) {
      throw new Error("Please pass required arguments in request body");
    }
    if (req.session.level === "Super Admin") {
      throw new Error("Only Admins and Users can create a task");
    }
    const taskId = uniqid();
    const taskName = req.body.name;
    const taskDetail = req.body.detail;
    const taskCreatedBy = req.session.passport.user;
    const taskUpdatedBy = req.session.passport.user;
    const taskStatus = "todo";
    const taskUserId = req.body.userId;
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

async function getTasks(req, res) {
  try {
    if (req.session.level === "Super Admin") {
      throw new Error("You are a Super Admin");
    }
    const userId = req.session.passport.user;
    const user = await Users.findOne({ id: userId }).catch((e) => {
      throw e;
    });
    if (req.session.level === "Admin") {
      const tasks = await Tasks.find({ createdBy: user.id }).catch((e) => {
        throw e;
      });
      res.send({
        status: "ok",
        data: tasks,
      });
    } else {
      const tasks = await Tasks.find({ userId: user.id }).catch((e) => {
        throw e;
      });
      res.send({
        status: "ok",
        data: tasks,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

function deleteTask(req, res) {
  try {
    if (!req.body || !req.body.id) {
      throw new Error("Please pass the id of the task");
    }
    const taskId = req.body.id;
    Tasks.deleteOne({id:taskId}).then(res.send({"status":"ok","message":"task deleted successfully"})).catch(e => {throw e});
  } catch (e) {
    console.log(e);
    res.send({ status: "error", message: e.message });
  }
}

module.exports = {
  getUser,
  createTask,
  getTasks,
  deleteTask,
};
