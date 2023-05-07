import { useNavigate, Routes, Route } from "react-router-dom";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { useEffect } from "react";
 function App() {
  const navigate = useNavigate();
  useEffect(() => {
     fetch("/isAuthenticated").then(res => {res.json().then(data => {
      console.log(data);
      if(data.status!=='ok'){
        navigate("/login"); 
      }
     })})
  })
    return (
      <>
        Welcome
        <Routes>
          <Route
            path="/super-admin-dashboard"
            element={<SuperAdminDashboard />}
          ></Route>
        </Routes>
      </>
    );
}

export default App;
