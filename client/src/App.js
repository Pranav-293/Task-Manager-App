import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
 function App() {
  const navigate = useNavigate();
  useEffect(() => {
     fetch("/isAuthenticated").then(res => {res.json().then(data => {
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
