import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/Actions";
import { useNavigate } from "react-router-dom";

const logo = <FontAwesomeIcon icon={faUser} />;
function About() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch("/auth-api/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.status === "ok") {
        navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  const name = useSelector((state) => state.authReducer.Name);
  const email = useSelector((state) => state.authReducer.Email);
  const role = useSelector((state) => state.authReducer.Role);
  const org = useSelector((state) => state.authReducer.Organization);
  const supervisor = useSelector((state) => state.authReducer.Supervisor);
  return (
    <div className="About">
      <div className="details">
        <div className="Logo">{logo}</div>
        <div className="name">
          <h1>{name}</h1>
        </div>
        <div className="email">
          <h5>{email}</h5>
        </div>
        <div className="AdditionalDetails">
          <div className="Role">
            <div className="loginDetails">
              Role<div className="bold">{role}</div>{" "}
            </div>
          </div>
          <div className={role === "SuperAdmin" ? "Hide" : ""}>
            <div className="loginDetails">
              Organization<div className="bold">{org}</div>
            </div>
          </div>
          <div className={role === "SuperAdmin" ? "Hide" : ""}>
            <div className="loginDetails">
              Supervisor<div className="bold">{supervisor}</div>
            </div>
          </div>
        </div>
      </div>
      <button className="normalButton" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default About;
