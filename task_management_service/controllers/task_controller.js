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

function createTask(req, res) {
  try {
    if (!req.body || !req.body.name || !req.body.detail) {
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

async function getUsersUnderAdmin(req, res) {
  try {
    const adminId = req.session.passport.user;
    const users = await Users.find({ reporting: adminId }, { name: 1 }).catch(
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
  getUsersUnderAdmin,
  getAssignedTasksByUserId,
  getPersonalTasks,
};
