import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin } from "../redux/actions/Actions";
import AddAdmin from "./AddAdmin";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Admins() {
  useEffect(() => {
    console.log("Admin page rendered");
  }, []);
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const AllAdmins = useSelector((state) => state.authReducer.allAdmins);
  const AllOrgs = useSelector((state) => state.authReducer.allOrgs);
  const [searchText, setSearchText] = useState("");
  function getOrg(id) {
    const orgs = AllOrgs.filter((org) => org.id === id);
    if (orgs.length === 0) {
      return "";
    }
    const orgName = orgs[0].name;
    return orgName;
  }
  return (
    <div className="Organizations">
      <div className="Heading">
        <div className="leftHeading">
          Admins <div className="bracket"> ({AllAdmins.length})</div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText((e.target.value))}
          />
        </div>
      </div>
      <div className="scrollable">
        {
          (searchText==="") ? (AllAdmins.map((admin) => (
            <div key={admin.id} className="card">
              <div className="title">{admin.name}</div>
              <div className="text">{admin.email}</div>
              <div className="text">{getOrg(admin.orgId)}</div>
              <div className="delete">
                <button
                  onClick={() => dispatch(deleteAdmin(admin.id))}
                  className="deleteButton"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))) : (
            AllAdmins.filter(item => (item.name).toLowerCase().includes(searchText.trim().toLowerCase())).map((admin) => (
              <div key={admin.id} className="card">
                <div className="title">{admin.name}</div>
                <div className="text">{admin.email}</div>
                <div className="text">{getOrg(admin.orgId)}</div>
                <div className="delete">
                  <button
                    onClick={() => dispatch(deleteAdmin(admin.id))}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))
          )
        }
      </div>

      <AddAdmin
        visibility={visibility}
        setVisibility={setVisibility}
      ></AddAdmin>
      <button
        className="addOrgButton normalButton"
        onClick={() => setVisibility(!visibility)}
      >
        Add Admin
      </button>
    </div>
  );
}

export default Admins;
