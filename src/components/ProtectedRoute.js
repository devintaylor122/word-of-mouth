// import { useEffect } from "react";
// import { Navigate, useLocation, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const ProtectedRoute = (props) => {
//   const { anyUser } = useAuth();
//   const location = useLocation();
//   const ownersList = props.ownersList;
//   const customersList = props.customersList;
//   const allowedRole = props.allowedRole;
//   console.log(ownersList);

//   let user = "";
//   if (allowedRole === "owner") {
//     user = ownersList.find((owner) => owner.uid === anyUser.uid);
//   } else if (allowedRole === "customer") {
//     user = customersList.find((customer) => customer.uid === anyUser.uid);
//   }

//   // if (!user) {
//   //   console.log("USER: ", user);
//   //   console.log("CHILDREN", children);
//   //   console.log("In protected Route. User not logged in. going to home page");
//   //   return <Navigate to="/" />;
//   // }
//   console.log("In protected Route. User logged in: ", anyUser);
//   // console.log("current user role", anyUser.role);

//   return /*anyUser?.role?.find((role) => allowedRoles?.includes(role))*/ user.role ===
//     allowedRole ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" state={{ from: location }} replace />
//   );
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    console.log("USER: ", user);
    console.log("CHILDREN", children);
    console.log("In protected Route. User not logged in. going to home page");
    return <Navigate to="/" />;
  }
  console.log("In protected Route. User logged in: ", user);
  return children;
};

export default ProtectedRoute;
