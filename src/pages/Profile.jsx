import React, { useContext } from 'react'
import { AuthContext } from '../App';
//بعتت البيانات من خلال ل كونتكست و عرضتها 
const Profile = () => {
  const { authuser } = useContext(AuthContext);


    if (!authuser) return <div>Loading...</div>;

    return (
      <div>
        <h1>{authuser.name}</h1>
        <p>Username: {authuser.username}</p>
        <p>Email: {authuser.email}</p>
        <p>Phone: {authuser.phone}</p>
        <p>Website: {authuser.website}</p>
        <h3>Company: {authuser.company?.name || "N/A"}</h3>
        <p>{authuser.company?.catchPhrase}</p>
      </div>
    )
}

export default Profile;
