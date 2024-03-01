import React, { useState,useEffect } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link,useLocation } from 'react-router-dom';

const LoginForm = () => {

  const location = useLocation();
  const fromSignUp = location.state?.fromSignUp || false;
  const [showSuccessMessage, setShowSuccessMessage] = useState(fromSignUp);
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [userID,setUserID] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); 
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showSuccessMessage]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const user = {userName,userPwd,userID};
        setLoading(true);
        try{
          let usr = fetch(`http://localhost:8080/users/${user.userName}`,{
                  method:'GET',
              }).then( response => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  throw new Error('Invalid credentials, Try Again !');
                }
            }).then( data => {
                  if (data.userPwd !== user.userPwd) {
                    throw new Error('Invalid credentials, Try Again !');
                  }
                  localStorage.setItem('isLoggedIn', true);
                  localStorage.setItem('userName', data.userName);
                  localStorage.setItem('userEmail', user.userName);
                  localStorage.setItem('userID',data.userID);
                  localStorage.setItem(data.userID, JSON.stringify({ isLoggedIn: true }));
                  if(user.userName === "adminFood4All@yopmail.com"){
                    window.location.href = '/AdminHome';
                  } else{
                    window.history.replaceState(null, null, '/home');
                    window.location.href = '/home';
                  }      
                 
            })
            .catch(error => {
              console.log(error.stack);
              alert(error.message);
              setLoading(false);
            });
        } catch(error) {
          console.log(error.stack);
          alert('Failed to login');
          setLoading(false);
        }
      };
  
    const LoadingComponent = () => {
        return <p>Loading...</p>;
      }
      {loading && <LoadingComponent />}
  return (
    <div className='homePageBody'>
      <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='Enter your Email' required  value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Enter your Password' required value={userPwd} onChange={(e) => setUserPwd(e.target.value)}/>
          <FaLock className='icon' />
        </div>

        <button type="submit">Login</button>

        <div className='register-link'>
            <p>Don't have an account?  <Link to="/signup"> Register</Link> </p>
        </div>

        {showSuccessMessage && (
        <div className='success-message'>Signed Up Successfully !!</div>
      )}
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
