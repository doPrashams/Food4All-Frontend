import React from "react";
import '../Admin/AdminHomePage.css'
import { Link } from "react-router-dom";

const AdminHeader = () => {
    const userName = localStorage.getItem('userName');

    const handleSignoutClick = () => {
      
        localStorage.clear();
        window.history.replaceState(null, null, '/login');
        window.location.href = '/login';
      };

    return ( 
        <header className="header">
                   <div className="logo">
                   <Link to="/AdminHome">
                       <img src={require('../../Assets/food4all.png')} alt="Food All" />
                   </Link>
                    </div>
                    <div>Welcome {userName}</div>
                    <div className="signout" onClick={handleSignoutClick}>Sign Out</div>
                </header>
     );
}
 
export default AdminHeader;