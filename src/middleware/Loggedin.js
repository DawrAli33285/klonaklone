import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Loggedin = () => {
  return localStorage.getItem('user') ? <Outlet></Outlet>: <Navigate to='/login' />;
};

export default Loggedin;