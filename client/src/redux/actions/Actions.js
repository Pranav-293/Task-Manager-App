import {
  SET_USER,
  SET_ORGS_AND_ADMINS,
  SET_TASKS_AND_USERS,
  SET_ALL_TASKS,
} from "./ActionTypes";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

export const setOrgsAndAdmins = (orgsData, adminsData) => {
  return {
    type: SET_ORGS_AND_ADMINS,
    payload: {
      orgsData,
      adminsData,
    },
  };
};

export const setTasksAndUsers = (tasks, users) => {
  return {
    type: SET_TASKS_AND_USERS,
    payload: {
      tasks,
      users,
    },
  };
};

export const addOrganization = (name, details) => {
  return async function (dispatch) {
    const res = await fetch("/auth-api/organization", {
      method: "POST",
      body: JSON.stringify({ name: name, details: details }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "ok") dispatch(getOrgsAndAdmins());
    return data;
  };
};

export const addAdmin = (name, email, username, password, orgId) => {
  return async function () {
    const res = await fetch("/auth-api/admin", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
        orgId: orgId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  };
};

export const addUser = (name, email, username, password) => {
  return async function () {
    const res = await fetch("/auth-api/user", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  };
};

export const deleteOrganization = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/auth-api/organization/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "error") {
      console.error(data.message);
    } else {
      dispatch(getOrgsAndAdmins());
    }
  };
};

export const deleteTask = (id) => {
  return async function(){
    const res = await fetch(`/task-api/task/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  }
 
};

export const deleteAdmin = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/auth-api/user/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "error") {
      console.error(data.message);
    } else {
      dispatch(getOrgsAndAdmins());
    }
  };
};

export const deleteUser = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/auth-api/user/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "error") {
      console.error(data.message);
    } else {
      dispatch(getTasksAndUsers());
    }
  };
};

export const getUser = () => {
  return async function (dispatch) {
    try {
      const res = await fetch("/auth-api/isAuthenticated");
      const data = await res.json();
      if (data.status === "ok") {
        data.user.supervisor = await getSupervisor();
        data.user.organization = await getOrganization();
        dispatch(setUser(data.user));
      }
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const setAllTasks = (tasks) => {
  return {
    type: SET_ALL_TASKS,
    payload: tasks,
  };
};

export const getOrgsAndAdmins = () => {
  return async function (dispatch) {
    try {
      const orgRes = await fetch("/auth-api/all-organizations");
      const orgData = await orgRes.json();
      if (orgData.status === "error") {
        throw new Error(orgData.message);
      }
      const adminRes = await fetch("/auth-api/all-admins");
      const adminData = await adminRes.json();
      if (adminData.status === "error") {
        throw new Error(adminData.message);
      }
      dispatch(setOrgsAndAdmins(orgData.data, adminData.admins));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const getTasksAndUsers = () => {
  return async function (dispatch) {
    try {
      const tasksRes = await fetch("/task-api/all-tasks");
      const tasksData = await tasksRes.json();
      if (tasksData.status === "error") {
        throw new Error(tasksData.message);
      }
      const userRes = await fetch("/task-api/all-users");
      const userData = await userRes.json();
      if (userData.status === "error") {
        throw new Error(userData.message);
      }
      dispatch(setTasksAndUsers(tasksData.data, userData.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const getAllTasks = () => {
  return async function (dispatch) {
    try {
      const tasksRes = await fetch("/task-api/all-tasks");
      const tasksData = await tasksRes.json();
      if (tasksData.status === "error") {
        throw new Error(tasksData.message);
      }
      dispatch(setAllTasks(tasksData.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const assignTask = (name, details, userId = "") => {
  return async function (dispatch) {
    const res = await fetch("/task-api/task", {
      method: "POST",
      body: JSON.stringify({ name: name, detail: details, userId: userId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  };
};

async function getOrganization() {
  try {
    const res = await fetch("/auth-api/organization");
    const data = await res.json();
    return data.orgName;
  } catch (e) {
    console.log(e.message);
  }
}

async function getSupervisor() {
  try {
    const res = await fetch("/auth-api/supervisor");
    const data = await res.json();
    return data.supervisor;
  } catch (e) {
    console.log(e.message);
  }
}

export const markInProgress = (id) => {
  return async function(){
    try {
      const res = await fetch(`task-api/mark-inProgress/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
};

export const completeTask = (id) => {
  return async function() {
    try {
      const res = await fetch(`task-api/mark-complete/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  
};
