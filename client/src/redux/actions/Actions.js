import {
  SET_USER,
  SET_ORGS_AND_ADMINS,
  SET_TASKS_AND_USERS,
  SET_NODES_AND_LINKS,
} from "./ActionTypes";

/**
 * Action creator for setting user data in redux
 * @param {object} user 
 * @returns an action of type SET_USER
 */
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

/**
 * Set nodes and links in the redux store
 * @param {object} nodes
 * @param {object} links
 * @returns action creator of type SET_NODES_AND_LINKS
 */
export const setNodesAndLinks = (nodes, links) => {
  return {
    type: SET_NODES_AND_LINKS,
    payload: {
      nodes ,
      links
    }
  }
}

/**
 * Action creator for creating an action to set organizations and admins data in redux
 * @param {object} orgsData 
 * @param {object} adminsData 
 * @returns action of type SET_ORGS_AND_ADMINS
 */
export const setOrgsAndAdmins = (orgsData, adminsData) => {
  return {
    type: SET_ORGS_AND_ADMINS,
    payload: {
      orgsData,
      adminsData,
    },
  };
};

/**
 * Action creator for creating an action to set tasks and users data in redux
 * @param {object} tasks 
 * @param {object} users 
 * @returns - action of type SET_TASKS_AND_USERS
 */
export const setTasksAndUsers = (tasks, users) => {
  const nodes = users.map(user => {
    return {
        id: user.id,
        label: user.name,
        labelType:"string"
    }
});
const links = [];
    for(let i = 0; i < users.length; i++){
      for(let j = 0; j < users.length; j++){
        if(users[i].id===users[j].reporting){
          links.push({
            source: users[i].id,
            target : users[j].id,
          })
        }
      }
    }
  return {
    type: SET_TASKS_AND_USERS,
    payload: {
      tasks,
      users,
      nodes,
      links,
    },
  };
};

/**
 * Function to add a new organization in the database
 * @param {string} name
 * @param {string} details
 * @returns {object} response from the database
 */
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

/**
 * Function to add a new admin in the database
 * @param {string} name
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {string} orgId
 * @returns {object} response from the database
 */
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

/**
 * Function to add a new user in the database
 * @param {string} name 
 * @param {string} email 
 * @param {string} username 
 * @param {string} password 
 * @returns {object} response from the database
 */
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

/**
 * Function to delete an organization
 * @param {string} id - id of the organization
 */
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

/**
 * Function to delete a task
 * @param {string} id - id of the task
 * @returns {object} response
 */
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

/**
 * Deletes a user and all its tasks
 * @param {string} id - id of the user which needs to be deleted
 * @returns status
 */
export const deleteUser = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/auth-api/user/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "error") {
      console.error(data.message);
    } else {
      const taskRes = await fetch(`/task-api/all-tasks/${id}`, {
        method: "DELETE",
      });
      const taskData = await taskRes.json();
      if(taskData.status === "error") {
        console.error(data.message);
      }
      else  dispatch(getTasksAndUsers());
    }
  };
};

/**
 * Function to set user details in redux store
 */
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


/**
 * Function to fetch organizations and admins data and set that in redux store
 */
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

/**
 * Function to fetch tasks and users data and set that in redux store
 */
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

/**
 * Function to assign a new task
 * @param {string} name name of the task
 * @param {string} details details of the task
 * @param {string} userId - id of the user to which task is assigned
 * @returns {object} response
 */
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

/**
 * Function to get organization of the current user
 * @returns {string} name of the organization
 */
async function getOrganization() {
  try {
    const res = await fetch("/auth-api/organization");
    const data = await res.json();
    return data.orgName;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * Function to get the name of the current supervisor
 * @returns supervisor
 */
async function getSupervisor() {
  try {
    const res = await fetch("/auth-api/supervisor");
    const data = await res.json();
    return data.supervisor;
  } catch (e) {
    console.log(e.message);
  }
}

/**
 * Function to mark a task inProgress
 * @param {string} id - id of the task
 * @returns {object} response
 */
export const markInProgress = (id) => {
  return async function(){
    try {
      const res = await fetch(`/task-api/mark-inProgress/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 * Function to mark a task complete
 * @param {string} id - id of the task
 * @returns {object} response
 */
export const completeTask = (id) => {
  return async function() {
    try {
      const res = await fetch(`/task-api/mark-complete/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  
};

/**
 * Function to update the details of a task
 * @param {string} id - id of the task
 * @returns {object} response
 */
export const updateTask = (id, detail) => {
  return async function() {
    try {
      const res = await fetch(`/task-api/update-task/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          data : detail
        })  ,
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
