import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrganization } from "../redux/actions/Actions";

/**
 * Component to add a new organization
 * @param {boolean} visibility - The component will be visible if set to true, otherwise hidden
 * @param {function} setVisibility - The function to change the value of visibility boolean
 * @returns A component to add a new organization
 */
function AddOrganization({ visibility, setVisibility }) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  // Sets the error message to empty on change of name or details field
  useEffect(() => {
    setMessage("");
  },[name, details]);


  /**
   * Function to add a new organization
   */
  async function handleAdd() {
    if (name.trim() === "" || details.trim() === "") {
      setMessage("Please fill the inputs");
    } else {
      const data = await dispatch(addOrganization(name.trim(), details.trim()));
      if(data.status === "ok") {
        setName("");
      setDetails("");
      setVisibility(false);
      setMessage("");
      }else{
        setMessage(data.message)
      }
    }
  }

  if (visibility) {
    return (
      <div className="AddOrg">
        <div className="title">Add Organization</div>
        <div className="AddInput">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="message">{message}</div>
        <div className="formButtons">
          <button
            className="closeButton normalButton"
            onClick={() => {
              setVisibility(false);
              setMessage("");
            }}
          >
            close
          </button>
          <button className="addButton normalButton" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default AddOrganization;
