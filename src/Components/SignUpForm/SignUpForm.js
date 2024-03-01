import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';
const SignUpForm = () => {
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {userName, userEmail,userPwd, userCity, userPhone};
        
        fetch('http://localhost:8080/users/addUser',{
            method:'POST',
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(user)
        }).then( response => {
            if (response.status === 201) {
                navigate("/login", { state: { fromSignUp: true } });
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .catch(error => {
            alert(error.message);
        });
    }

    return ( 
  <div className='signUpPageBody'>
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <div className="input-box">
          <input 
          type="text" 
          placeholder='Enter your Name' 
          value={userName}
          onChange={ (e) => setUserName(e.target.value)}
          required />  
        </div>

        <div className="input-box">
          <input 
          type="text" 
          placeholder='Enter your email' 
          value={userEmail}
          onChange={ (e) => setUserEmail(e.target.value)}
          required />
          
        </div>
        <div className="input-box">
          <input 
          type="password" 
          placeholder='Password' 
          value={userPwd}
          onChange={ (e) => setUserPwd(e.target.value)}
          required />
          
        </div>
        
        <div className="input-box">
          <input 
          type="text" 
          placeholder='City' 
          value={userCity}
          onChange={ (e) => setUserCity(e.target.value)}
          required />
          
        </div>

        <div className="input-box">
          <input 
          type="text" 
          placeholder='Phone' 
          value={userPhone}
          onChange={ (e) => setUserPhone(e.target.value)}
          required />
        </div>
        <button type="submit">SignUp</button>  
      </form>
    </div>
  </div>
    );
}
 
export default SignUpForm;