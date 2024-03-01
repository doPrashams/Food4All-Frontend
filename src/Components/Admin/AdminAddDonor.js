import { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import '../Admin/AdminHomePage.css'

const AdminAddDonor = () => {
    

     const [formData, setFormData] = useState({
          userName:'',
          userEmail:'',
          userPwd:'',
          userCity:'',
          userPhone:''
        });
       
      
        const handleInputChange = (event) => {
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
        };
      
        const handleSubmit = (event) => {
          event.preventDefault();
          

          fetch('http://localhost:8080/users/addUser',{
            method:'POST',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(formData)
        }).then( response => {
            if (response.status === 201) {
                alert("Donor added succesfully!");
                window.location.reload();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .catch(error => {
            alert(error.message);
        });


          
        };
      
        return (
        <div className="addAdminForm">  
          <AdminHeader />
          <form onSubmit={handleSubmit}>
            <h1>Add Donor</h1>
            <label>
              User Name:
              <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} required/>
            </label>
            <label>
              User Email:
              <input type="text" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required/>
            </label>
            <label>
              User Password:
              <input type="text" name="userPwd" value={formData.userPwd} onChange={handleInputChange} required/>
            </label>
            <label>
              User City:
              <input type="text" name="userCity" value={formData.userCity} onChange={handleInputChange} required/>
            </label>
            <label>
              User Phone:
              <input type="text" name="userPhone" value={formData.userPhone} onChange={handleInputChange} required/>
            </label>
           
            
           
            <button type="submit">Submit</button>
          </form>
          </div>  
        );
      
      
}
 
export default AdminAddDonor;