import { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import '../Admin/AdminHomePage.css';

const AdminRemoveHotspot = () => {
    const [hotspots, setHotspots] = useState([]);
    const [hoveredHotspot, setHoveredHotspot] = useState();

    useEffect(() => {
      fetch('http://localhost:8080/hotspot/fetchAllHotspots')
        .then((response) => response.json())
        .then((data) => setHotspots(data));
    }, []);
  
    const handleDelete = (hotspotID) => {
        console.log(hotspotID);
      fetch(`http://localhost:8080/hotspot/${hotspotID}`, {
        method: 'DELETE',
      })
        .then(() => {
          setHotspots(hotspots.filter((hotspot) => hotspot.hotspotID !== hotspotID));
        });
    };

   
    return (
      <div className="hotspot-list">
        <AdminHeader/>
        {hotspots.map((hotspot) => (
          <div className="hotspot-card" key={hotspot.hotspotID} onMouseEnter={() => setHoveredHotspot(hotspot.hotspotID)} onMouseLeave={() => setHoveredHotspot(null)}>
            <div className={`hotspot-content ${hoveredHotspot === hotspot.hotspotID ? 'hovered' : ''}`}>
              <h2>{hotspot.hotspotName}</h2>
              <p>City: {hotspot.hotspotCity}</p>
              <p>Size: {hotspot.hotspotSize}</p>
              <p>Address: {hotspot.hotspotAddress}</p>
              <p>Lat: {hotspot.hotspotLat}, Lng: {hotspot.hotspotLng}</p>
              <p>hotspotID:{hotspot.hotspotID}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(hotspot.hotspotID)}>Delete</button>
          </div>
        ))}
      </div>
    );
  
  
}
 
export default AdminRemoveHotspot;