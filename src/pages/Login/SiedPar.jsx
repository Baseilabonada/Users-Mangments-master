import { NavLink, useNavigate } from "react-router-dom";
import './style.css'
import { useContext } from "react";
import { AuthContext } from "../../App";

const SiedPar = () => {
  const {logout} = useContext(AuthContext);
  const navgiet = useNavigate()

  return (
    <nav>
          <NavLink style={{}}  to="/users">User List</NavLink>
          <NavLink  to="/users/profile" >profile</NavLink>
          <button
          onClick={() => {
            logout();// من CONTEXT لتغير قيمة الحالة اذا TRUE او FALSE 
            navgiet("/login");//انتقال 
          }}
        >
          logout
        </button>
    </nav>
  );
};

export default SiedPar;