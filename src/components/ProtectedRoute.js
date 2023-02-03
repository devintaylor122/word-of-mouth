import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    console.log("In protected Route. User not logged in. going to home page");
    return <Navigate to="/" />;
  }
  console.log("In protected Route. User logged in, going to: ", children);
  return children;
};

export default ProtectedRoute;
