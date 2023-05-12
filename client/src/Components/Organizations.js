import { useDispatch, useSelector } from "react-redux";
import { deleteOrganization, getOrgsAndAdmins } from "../redux/actions/Actions";
import AddOrganization from "./AddOrganization";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Organizations() {
  useEffect(() => {
    console.log("Organizations page rendered");
  },[])
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");
  const AllOrgs = useSelector((state) => state.authReducer.allOrgs);
  return (
    <div className="Organizations">
      <div className="Heading">
        <div className="leftHeading">
          Organizations <div className="bracket"> ({AllOrgs.length})</div>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="scrollable">
        {searchText !== ""
          ? AllOrgs.filter((item) =>
              item.name.toLowerCase().includes(searchText.trim().toLowerCase())
            ).map((org) => (
              <div key={org.id} className="card">
                <div className="title">{org.name}</div>
                <div className="text">{org.details}</div>
                <div className="delete">
                  <button
                    onClick={() => dispatch(deleteOrganization(org.id))}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))
          : AllOrgs.map((org) => (
              <div key={org.id} className="card">
                <div className="title">{org.name}</div>
                <div className="text">{org.details}</div>
                <div className="delete">
                  <button
                    onClick={() => dispatch(deleteOrganization(org.id))}
                    className="deleteButton"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      <AddOrganization
        visibility={visibility}
        setVisibility={setVisibility}
      ></AddOrganization>
      <button
        className="addOrgButton normalButton"
        onClick={() => setVisibility(!visibility)}
      >
        Add Organization
      </button>
    </div>
  );
}

export default Organizations;
