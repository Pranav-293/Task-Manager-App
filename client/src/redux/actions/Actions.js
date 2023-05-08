import { SET_USER } from "./ActionTypes";

export const setUser = (user) => {
    return {
      type: SET_USER,
      payload: {
        user,
      },
    };
  };

  export const getUser= () => {
    return async function (dispatch) {
        try{
            const res = await fetch("/isAuthenticated");
            const data  = await res.json();
            if(data.status==='ok'){
                data.user.supervisor = await getSupervisor();
                data.user.organization = await getOrganization();
                dispatch(setUser(data.user));
            }
        }
        catch (e) {
            console.error(e.message);
        }
    }
  }

  async function getOrganization(){
    try{
        const res = await fetch("/organization");
                const data = await res.json();
                return data.orgName;
    }catch (e) {
        console.log(e.message);
    }
  }

  async function getSupervisor(){
    try{
        const res = await fetch("/supervisor");
                const data = await res.json();
                return data.supervisor;
    }catch (e) {
        console.log(e.message);
    }
  }