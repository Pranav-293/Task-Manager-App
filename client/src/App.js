import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

/**
 * Home Page
 */
 function App() {

  const navigate = useNavigate();

  // If the user is logged in redirect it to it's home page according to the role of the user
  // else redirect him to the login page
  useEffect(() => {
     fetch("/auth-api/isAuthenticated").then(res => {res.json().then(data => {
      if(data.status!=='ok'){
        navigate("/login");
      }else{
        if(data.user.level==="Super Admin"){
          navigate("/super-admin-dashboard/admins");
        }else if(data.user.level==="Admin"){
          navigate("/admin-dashboard/users");
        }else{
          navigate("/user-dashboard");
        }
      }
     })})
  })

    return (
      <>
        Welcome
        Please Wait...
      </>
    );
}

export default App;
