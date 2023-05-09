import {SET_ORGS_AND_ADMINS, SET_USER } from "../actions/ActionTypes";

const initialState = {
    userId:"",
    Name:"",
    Email:"",
    Role:"",
    Organization:"",
    Supervisor:"",
    allOrgs:[],
    allAdmins:[],
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          userId: action.payload.user.id,
          Name: action.payload.user.name,
          Email: action.payload.user.email,
          Role: action.payload.user.level,
          Organization: action.payload.user.organization,
          Supervisor: action.payload.user.supervisor,
        };

        case SET_ORGS_AND_ADMINS:
          return {
            ...state,
            allOrgs: action.payload.orgsData,
            allAdmins: action.payload.adminsData,
          }

        default:
          return state;
      }}

      export default authReducer;