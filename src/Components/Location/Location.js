import React, { useEffect,useState, useRef } from "react";
import Header from ".././Header/Header.js";
import "./Location.css";
import emailjs from '@emailjs/browser';

const Location = () => {
  const form = useRef();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let lat = '';
  let lng = '';
  const[hotspotLat,setHotspotLat] = useState();
  const [hotspotLng,setHotspotLng] = useState();

  const API_KEY = "AIzaSyBcU8lhCbSQFvWxvO7A5VChLQRhAaBnNQw";
  const donorCity = localStorage.getItem('donorCity');;
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(null);
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const [timesDonated,setTimesDonated] = useState();
  const [amountOfFood,setAmountOfFood] = useState();
  const [mapDetails,setMapDetails] = useState(false);
  const [isLoadingEmail,setIsLoadingEmail] = useState(false);
  let userID = localStorage.getItem('userID');
  const[hotspotAddress,setHotspotAddress] = useState();
  



  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(userID));
    const isLoggedIn = userData && userData.isLoggedIn;

    if (!isLoggedIn) {
      alert('Authentication failed, Try Logging In !');
      window.location.href = '/login';
    }
    setIsAuthenticated(isLoggedIn);
         //get nearest hotspot
      if (donorCity !== null && donorCity.trim() !== ' ') {
        const queryParams = new URLSearchParams({
          lat: JSON.parse(localStorage.getItem('location')).coords.lat,
          lng: JSON.parse(localStorage.getItem('location')).coords.lng,
          city:  donorCity,
        });
        setIsLoading(true);
      fetch(`http://localhost:8080/donors/getHotspotLocation?${queryParams}`,{
                method:'GET',
            })
      .then( response => {
        if (response.status === 200) {
          setIsLoading(false);
          return response.json();
        } else {
          throw new Error('Invalid credentials, Try Again !');
        }})
        .then(data => {
          fetchMap(data);
            })
          .catch(error => {
            alert(error.message);
            setIsLoading(false);
          });  
        }
  },[])


function fetchMap(data){
  setHotspotLat(data.hotspotLat);
  setHotspotLng(data.hotspotLng);
  setHotspotAddress(data.hotspotAddress);

  //generate the map
  if (hotspotLat !== null &&  hotspotLng !== null ) { 

    //generate the google map here with donor coords and hotspots coords
    lat = JSON.parse(localStorage.getItem('location')).coords.lat;
    lng = JSON.parse(localStorage.getItem('location')).coords.lng;
    //console.log("Donor: "+ lat + " " + lng);
    //console.log("Hotspot: "+ hotspotLat + " " + hotspotLng);
    
    const origin = JSON.parse(localStorage.getItem('location')).coords.lat+','+JSON.parse(localStorage.getItem('location')).coords.lng;
  const destination = hotspotLat+','+hotspotLng;
  const avoid = "tolls|highways";
  const zoom = 16;
  const mapsUrl = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin}&destination=${destination}&avoid=${avoid}&zoom=${zoom}`;
  setShowMap(  <div className="iFrameHolder"> 
          <iframe className="iFrameMap"
        frameborder="0"
        style={{ border: "0"}}
        referrerpolicy="no-referrer-when-downgrade"
        src={mapsUrl}
        allowFullScreen
        >
        </iframe>

        </div> 
)
  
    

    }
}


const sendEmail = (e) => {
  e.preventDefault();
 
 
  try{
    fetch(`http://localhost:8080/donors/${localStorage.getItem('userID')}`,{
            method:'GET',
        }).then( response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Error fetching the details, Try again!');
          }
      }).then( data => {
            setTimesDonated(data.timesDonated);
            setAmountOfFood(data.amountOfFood);
      })
      .catch(error => {
        console.log(error.stack);
        alert(error.message);
       
      });
  } catch(error) {
    console.log(error.stack);
    alert('Internal issue, please try again later !');
  }
  if (timesDonated === undefined) {
    setIsLoadingEmail(true);
    setTimeout(() => {
      setIsLoadingEmail(false);
      emailjs.sendForm('service_hbtxp6n', 'template_wqp40hr', form.current, '1T1fVOelovIng-bBh');
      alert("Email sent");
    }, 3000);
  }
}

  return (
    <div className="location-page">
      {isAuthenticated &&
      <div className="locationPageContent">
          <Header />
          {isLoading && <p>Maps loading..</p>}
          {showMap}
          <form className="formSubmit" ref={form} onSubmit={sendEmail}>
            <input type="text" className="hideThese" name="userName" value={userName}></input>
            <input type="text" className="hideThese" name="userEmail" value={userEmail}></input>
            <input type="text" className="hideThese" name="timesDonated" value={timesDonated}></input>
            <input type="text" className="hideThese" name="amountOfFood" value={amountOfFood}></input>
            <div>We won't spam you, click if you want to get an email confirmation of the donation !</div>
            <button type="submit" className="submitButton"> SEND </button> <br/>
            {isLoadingEmail && <p>Sending Email, Please hold on....</p>}
            <br/>
          </form>
          <p className="pTag">Busy and want someone to deliver the food ? We got you covered</p>
          <p>Copy the below address of the hotspot at the Drop off location in the Uber application</p>
          <input type="text" className="hotspotAddress" value={hotspotAddress}></input> <br/>
          <button className="uberButton" onClick={() => {
              const url = 'https://m.uber.com/go/connect/pickup';
              window.open(url, '_blank');
            }}>
              Open Uber Connect
            </button>
    </div>
          }

        </div>
    )
};

export default Location;