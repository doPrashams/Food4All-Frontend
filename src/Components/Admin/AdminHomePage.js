import {React, useEffect, useState} from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import './AdminHomePage.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {

  let userID = localStorage.getItem('userID');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (userID !== "65d2b3bd1385cf5498538d06") {
      alert('Oops, you are not Admin, Try again!');
      window.location.href = '/login';
    }
    setIsAuthenticated(true);
});
    return ( 
    <div className="adminHomePage">
         {isAuthenticated && 
          <div>
          <AdminHeader />
          <h2>Welcome to the Admin Page</h2>
           <SideNav 
           onSelect = { selected => {
            console.log(selected);
            navigate('/'+selected);
           }}
           className="sideNav"
           >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected = "home">
                    <NavItem eventKey="hotspots">
                        <NavText>Hotspots</NavText>
                        <NavItem eventKey="AdminAddHotspot">
                            <NavText>Add hotspot</NavText>
                        </NavItem>
                        <NavItem eventKey="AdminRemoveHotspot">
                            <NavText>Remove hotspot</NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="Donors">
                        <NavText>Donors</NavText>
                        <NavItem eventKey="AdminAddDonor">
                            <NavText>Add Donor</NavText>
                        </NavItem>
                        <NavItem eventKey="AdminRemoveDonor">
                            <NavText>Remove Donor</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>

                  
                
       </SideNav>
         </div>
        }
           
    </div> 
    );
}
 
export default AdminHomePage;