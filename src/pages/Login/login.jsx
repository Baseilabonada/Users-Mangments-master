import axios from "axios";
import React, {useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login} = useContext(AuthContext);
  // مكتبة لتحقق من الايميل وكلمة المرور 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(10, "Password must be at least 10 characters")
      .required("Password is required"),
  });
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // هان بطابق البيانات اذا تتطابف مع شروط المكتبة او لا 
    try {
      await validationSchema.validate(
        { username, password },
        // استمرار الكود بعد كشف ااول خطا 
        { abortEarly: false }
      );
      //  جلبت البيانات  وخزنتها في يوزر 
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data;
      // عملية بحث في الداتا على الايميل 
      const user = users.find((user) => user.email === username);
      // localStorage تحقق اذا الايميل موجود او لا وكلمة المرور فيك الهم كلهم خزنتها في  
      if (user && localStorage.getItem("passwordnew") === password) {
        localStorage.setItem('authUser', JSON.stringify(user))
// تغير قيمة الستيت هان بتصير TRUE 
        login()
        navigate('/dashpord') // انتقال 
        console.log("in the proteted login ",login()) 

        
        }else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Validation failed. Please check your inputs.");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="container_form"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          className="input_password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span></span>
        <span style={{ color: "red", fontSize: 10, fontFamily: "cursive" }}>
          <p>{error}</p>
        </span>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
