import AdminHeader from "../AdminHeader/AdminHeader";
import {useState, useEffect} from "react";
import '../Admin/AdminHomePage.css'

const AdminAddHotspot = () => {

     let hotspotName = 'Hotspot';
     const [hotspotCount,setHotspotCount] = useState(0);

     const [formData, setFormData] = useState({
          hotspotCity: '',
          hotspotSize: 0,
          hotspotType: '',
          hotspotLat: '',
          hotspotLng: '',
          hotspotName: '',
          hotspotAddress: '',
        });
        const handleAddressClick = () => {
              window.open('https://www.gps-coordinates.net/', '_blank');
            };
      
        const handleInputChange = (event) => {
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
        };
      
        const handleSubmit = (event) => {
          event.preventDefault();
          formData.hotspotName = hotspotName+hotspotCount;

          fetch('http://localhost:8080/hotspot/addHotspot',{
            method:'POST',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(formData)
        }).then( response => {
            if (response.status === 201) {
                alert("Hotspot added succesfully!");
                window.location.reload();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .catch(error => {
            alert(error.message);
        });


          
        };
      
        useEffect(() => {
          try{
               fetch(`http://localhost:8080/hotspot/count`,{
                       method:'GET',
                   }).then( response => {
                     if (response.status === 200) {
                       return response.json();
                     } else {
                       throw new Error('Error fetching the details, Try again!');
                     }
                 }).then( data => {
                    setHotspotCount(data+1);
                 })
                 .catch(error => {
                   console.log(error.stack);
                   alert(error.message);
                  
                 });
             } catch(error) {
               console.log(error.stack);
               alert('Internal issue, please try again later !');
             }

        })



        return (
        <div className="addAdminForm">  
          <AdminHeader />
          <form onSubmit={handleSubmit} >
            <h1>Add Hotspot</h1>
            <label className="formLabel">
              Hotspot Name:
              <input className="adminInput" type="text" name="hotspotName" value={hotspotName+hotspotCount} onChange={handleInputChange} required/>
            </label>
            <label>
              Hotspot Size:
              <input className="adminInput" type="number" name="hotspotSize" value={formData.hotspotSize} onChange={handleInputChange} required/>
            </label>
            <label>
              Hotspot City:
              <input className="adminInput" type="text" name="hotspotCity" value={formData.hotspotCity} onChange={handleInputChange} required />
            </label>
            <label>
              Hotspot Address:
              <input className="adminInput" type="text" name="hotspotAddress" value={formData.hotspotAddress} onChange={handleInputChange} required/>
            </label>
            <p>
               <a href="#" onClick={handleAddressClick}>
                    Click here to fetch coordinates from address
               </a>
            </p>
            <br/>
            <label>
              Hotspot Lat:
              <input className="adminInput" type="text" name="hotspotLat" value={formData.hotspotLat} onChange={handleInputChange} required/>
            </label>
            <label>
              Hotspot Lng:
              <input className="adminInput" type="text" name="hotspotLng" value={formData.hotspotLng} onChange={handleInputChange} required/>
            </label>
            
           
            <button className="adminSubmit" type="submit">Submit</button>
          </form>
          </div>  
        );
      
      
      
}
 
export default AdminAddHotspot;