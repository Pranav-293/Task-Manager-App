import { SET_USER, SET_ORGS_AND_ADMINS } from "./ActionTypes";

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

export const addOrganization = (name, details) => {
  return async function (dispatch) {
    const res = await fetch("/organization", {
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
  return async function (dispatch) {
    const res = await fetch("/admin", {
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

export const deleteOrganization = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/organization/${id}`, {
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

export const deleteAdmin = (id) => {
  return async function (dispatch) {
    const res = await fetch(`/admin/${id}`, {
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

export const getUser = () => {
  return async function (dispatch) {
    try {
      const res = await fetch("/isAuthenticated");
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

export const getOrgsAndAdmins = () => {
  return async function (dispatch) {
    try {
      const orgRes = await fetch("/all-organizations");
      const orgData = await orgRes.json();
      if (orgData.status === "error") {
        throw new Error(orgData.message);
      }
      const adminRes = await fetch("/all-admins");
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
async function getOrganization() {
  try {
    const res = await fetch("/organization");
    const data = await res.json();
    return data.orgName;
  } catch (e) {
    console.log(e.message);
  }
}

async function getSupervisor() {
  try {
    const res = await fetch("/supervisor");
    const data = await res.json();
    return data.supervisor;
  } catch (e) {
    console.log(e.message);
  }
}
