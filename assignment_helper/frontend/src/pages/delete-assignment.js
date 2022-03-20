import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const AssignmentDelete = () => {
    const { user, deleteAssignment } = useGlobalContext();
    return (
        <div>
            <h1>Delete Assignment</h1>
            <p>Are you sure you want to delete this assignment?</p>
            <button onClick={deleteAssignment}>Delete</button>
            <Link to="/assignment">
            <button>Cancel</button>
            </Link>
        </div>
    )
}
export default AssignmentDelete;