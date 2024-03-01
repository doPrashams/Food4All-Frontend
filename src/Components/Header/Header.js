import React from "react";
import '../HomePage/HomePage.css'
import { Link } from "react-router-dom";

const Header = () => {
    const userName = localStorage.getItem('userName');

    const handleSignoutClick = () => {
      
        localStorage.clear();
        window.history.replaceState(null, null, '/login');
        window.location.href = '/login';
      };

    return ( 
        <header className="header">
                   <div className="logo">
                   <Link to="/home">
                       <img src={require('../../Assets/food4all.png')} alt="Food All" />
                   </Link>
                    </div>
                    <div>Welcome {userName}</div>
                    <div className="signout" onClick={handleSignoutClick}>Sign Out</div>
                </header>
     );
}
 
export default Header;