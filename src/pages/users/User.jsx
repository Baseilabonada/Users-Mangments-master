import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
const User = () => {
  const { authuser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
// قمنا بجلب البيانات من باستخدام اكسيوس وعرضها في صفحة اليوزرز 
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div>
      <h1>Welcome : {authuser.name} </h1>
      <h2>Users List </h2>
      <table border="1" style={{ width: "98%", borderCollapse: "collapse", marginLeft:10 , }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Company Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.company?.name || "No Company"}</td>
              <td>
                {/* قمت بارسال ال ID 
                لاني بدي استخدمو بوساطة useParams
                 في الانتقال ل تفاصيل كل مستخدم من المستخدمين  */}
                <Link
                  to={{
                    pathname: `${user.id}`,
                  }}
                >
                  {user.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}
export default User;