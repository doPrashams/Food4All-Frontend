import React, { useEffect, useState,useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css'
import Header from '../Header/Header';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [amountOfFood,setAmountOfFood] = useState(0);
  const [noOfPersons,setNoOfPersons] = useState(0);
  const [timesDonated,setTimesDonated] = useState(0);
  const [loading, setLoading] = useState(false);
  let userName = localStorage.getItem('userName');
  let userID = localStorage.getItem('userID');
  

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem(userID));
    const isLoggedIn = userData && userData.isLoggedIn;

    if (!isLoggedIn) {
      alert('Authentication failed, Try Logging In !');
      window.location.href = '/login';
    }

    setIsAuthenticated(isLoggedIn);
  }, []);
   
  useEffect(() => {
    handleSubmit();
}, []); 

const handleSubmit = async (event) => {
  const user = {userID,userName,amountOfFood,timesDonated};
    setLoading(true);
    try{
      let usr = fetch(`http://localhost:8080/donors/${user.userID}`,{
              method:'GET',
          }).then( response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Invalid credentials, Try Again !');
            }
        }).then(data => {
              setAmountOfFood(data.amountOfFood);
              setTimesDonated(data.timesDonated);
              setNoOfPersons(data.amountOfFood * 2);
              
        }).catch(error => {
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
        <div className='homePage'>
            
          {isAuthenticated && 
              <div>
                {/* <header className="header">
                    <div className="logo">LOGO</div>
                    <div>Welcome {userName}</div>
                    <div className="signout" onClick={handleSignoutClick}>Sign Out</div>
                </header> */}
                < Header/>
                <main className="content">
                    <div className="box box-1">Amount of Food <strong>YOU</strong> saved<br/><span className="saved-number">{amountOfFood} lb</span></div>
                    <div className="box box-2">Number of Persons Fed<br/><span className="saved-number">{noOfPersons} </span></div>
                    <div className="box box-3">Number of times Donated<br/><span className="saved-number">{timesDonated} </span></div>
                </main>
                <button className="donate-button"><Link to="/donate"> Donate</Link></button>
               
              </div>
          }
        </div>
    );
  
  
};

export default HomePage;