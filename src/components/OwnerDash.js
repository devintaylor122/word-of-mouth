import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import EditOwner from "./EditOwner";

function OwnerDash() {
  const navigate = useNavigate();

  return (
    <div>
      <div>("HI")</div>
      <div>
        <button
          onClick={() => {
            navigate("/owner/edit");
          }}
        >
          {" "}
          Edit info
        </button>
      </div>
    </div>
  );
}

export default OwnerDash;
