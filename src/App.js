import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login/login";
import User from "./pages/users/User";
import UserDitels from "./pages/users/UserDitels";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createContext, useState } from "react";
import NoMatch from "./pages/Login/NoMatch";
import Profile from "./pages/Profile";
export const AuthContext = createContext(false);
function App() {
    // useState  انشأت 
  //  لتخزين حالة المستخدم اذا هوا قام بتسجيل الدخول  او لا 
const [isAuthenticated, setIsAuthenticated] = useState(false);
//قمت بتخزين اوبجكت في localStorage ببيانات المستخدم الي قمت بالتسجيل بالايميل الخاص في 
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  // ما عملت كمبونت خاص ب context استخدمتو هان وغيرت قيمة الState حسب الحالة وين بدي يكون موجود وين لا 
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };
  const router = useRoutes([
    { index: true, element: <Navigate to="/login" /> },
    //  اسمح بالانتقال من تسجيل الدخول ل الصفحة الرئيسة اذا لا بيضل ب isAuthenticated   هان في شرط اذا كان المستخدم   
    {path: "/login",element: (<> {isAuthenticated ? (<Navigate to="/users" />) : (<Login setIsAuthenticated={setIsAuthenticated} />)}</>)},
    { path: "/users",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        { index: true, element: <User /> },
        { path: "/users:id", element: <UserDitels /> },
        { path: "/users/profile", element: <Profile /> },
      ],
    },
    { path: "*", element: <NoMatch /> },
  ]);
  return (
    
    <>
      <AuthContext.Provider
      // تمرير القيم لاستخدامهم في الكمبونت
        value={{ isAuthenticated, setIsAuthenticated, login, logout, authuser }}
      >
        {router}
      </AuthContext.Provider>
    </>
  );
}
export default App;