import AdminHeader from "../AdminHeader/AdminHeader";
import { useState, useEffect } from "react";

const AdminRemoveDonor = () => {
    const [users, setUsers] = useState([]);
    const [hoveredUsers, setHoveredUsers] = useState();

    useEffect(() => {
      fetch('http://localhost:8080/users')
        .then((response) => response.json())
        .then((data) => setUsers(data));
    }, []);
  
    const handleDelete = (userID) => {
        console.log(userID);
      fetch(`http://localhost:8080/users/${userID}`, {
        method: 'DELETE',
      }).then(() => {
          setUsers(users.filter((user) => user.userID !== userID));
        });
    };

   
    return (
      <div className="hotspot-list">
        <AdminHeader/>
        {users.map((user) => (
          <div className="hotspot-card" key={user.userID} onMouseEnter={() => setHoveredUsers(user.userID)} onMouseLeave={() => setHoveredUsers(null)}>
            <div className={`hotspot-content ${hoveredUsers === user.userID ? 'hovered' : ''}`}>
              <h2>{user.userName}</h2>
              <p>User Email: {user.userEmail}</p>
              <p>User Password: {user.userPwd}</p>
              <p>User City: {user.userCity}</p>
              <p>User Phone:{user.userPhone}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(user.userID)}>Delete</button>
          </div>
        ))}
      </div>
    );
  
}
 
export default AdminRemoveDonor;