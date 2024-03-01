import React, { useState, useEffect } from "react";
import "./Donate.css";
import { Link } from 'react-router-dom';
import Header from ".././Header/Header";

const Donate = () => {
  const [foodType, setFoodType] = useState(null);
  const [containsAllergens, setContainsAllergens] = useState(false);
  const [weight, setWeight] = useState(0);
  const [expiry, setExpiry] = useState(0);
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [selectedMeatOption, setSelectedMeatOption] = useState(null);
  const storedValue = localStorage.getItem('location');
  let lat = '';
  let lng = '';
  const API_KEY = "AIzaSyBcU8lhCbSQFvWxvO7A5VChLQRhAaBnNQw";
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let userID = localStorage.getItem('userID');

  const handleAllergensChange = (value) => {
    setContainsAllergens(value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleFoodTypeClick = (type) => {
    if (type === 'meat') {
      setSelectedMeatOption(null);
    }
    setSelectedFoodType(type);
  };
  
  const handleMeatClick = () => {
    if (selectedFoodType !== 'meat') {
      setSelectedFoodType('meat');
    }
  };

  const handleMeatOptionClick = (option) => {
    setSelectedMeatOption(option);
  };

  const handleNextClick = () => {
    // handle next button click
  };
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(userID));
    const isLoggedIn = userData && userData.isLoggedIn;

    if (!isLoggedIn) {
      alert('Authentication failed, Try Logging In !');
      window.location.href = '/login';
    }
    setIsAuthenticated(isLoggedIn);
    setTimeout( ()=>{
        setIsLoading(false);
    },1000 )
  
    if (storedValue === null || storedValue === " ") {
        if ("geolocation" in navigator) {
  
            navigator.geolocation.getCurrentPosition(
              
              (position) => {
                
                 lat = position.coords.latitude;
                 lng = position.coords.longitude;
                localStorage.setItem("location", JSON.stringify({ coords: {lat,lng}}));
                
                console.log(`Latitude: ${lat}, longitude: ${lng}`);
              },
              
              (error) => {
                console.error("Error getting user location:", error);
              }
            );
            getCityFromCoords();
          } else {
            
            console.error("Geolocation is not supported by this browser.");
          }
    } else {
      getCityFromCoords();
    }
    
  }, [storedValue]);
    
function getCityFromCoords(){

    // to find the city using the coordinates
    if(storedValue){   
      //navigator.geolocation.getCurrentPosition(showCity);
 
          let latFromLocal = JSON.parse(localStorage.getItem('location')).coords.lat;
          let lngFromLocal = JSON.parse(localStorage.getItem('location')).coords.lng;
          //console.log(latFromLocal);
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latFromLocal},${lngFromLocal}&key=${API_KEY}`;
          setIsLoading(true);
          fetch(url,{
            method:'GET',
        })
        .then( response => {
          if (response.status === 200) {
            return response.json();
            
          } else {
            throw new Error('Error in fetching the GOOGLE maps api !');
          }
      })
          .then((data) => {
            //console.log(city);
               let city = data.results[0].address_components.find((component) => (
                  component.types.includes("locality")
                ))?.long_name;
                localStorage.setItem('donorCity',city);
              //console.log(`Your city is ${donorCity}.`);
          })

          .catch( (error) => {console.log(error); alert(error.message); setIsLoading(false);}
          );
    }
}

  return (
    <div className="donatePage">
      {isAuthenticated && 
            <div className="donatePageContent">
            <Header/>
        <div className="food-selection-container">
          <div className="left-column">
            <div className="food-type-container">
              <div className="food-type-header">Type of food</div>
              <div className="food-type-options">
                <div
                  className={`food-type-option ${
                    foodType === "veg" ? "selected" : ""
                  }`}
                  onClick={() => handleFoodTypeClick("veg")}
                >
                  Veg
                </div>
                <div
                  className={`food-type-option ${
                    foodType === "vegan" ? "selected" : ""
                  }`}
                  onClick={() => handleFoodTypeClick("vegan")}
                >
                  Vegan
                </div>
                <div
                  className={`food-type-option ${
                    foodType === "meat" ? "selected" : ""
                  }`}
                  onClick={() => handleFoodTypeClick("meat")}
                >
                  Meat
                </div>
                {selectedFoodType === 'meat' && (
        <div className="meat-suboptions">
          <div
            className={`meat-suboption ${selectedMeatOption === 'fish' ? 'selected' : ''}`}
            onClick={() => setSelectedMeatOption('fish')}
          >
            Fish
          </div>
          <div
            className={`meat-suboption ${selectedMeatOption === 'chicken' ? 'selected' : ''}`}
            onClick={() => setSelectedMeatOption('chicken')}
          >
            Chicken
          </div>
          <div
            className={`meat-suboption ${selectedMeatOption === 'beef' ? 'selected' : ''}`}
            onClick={() => setSelectedMeatOption('beef')}
          >
            Beef
          </div>
          <div
            className={`meat-suboption ${selectedMeatOption === 'pork' ? 'selected' : ''}`}
            onClick={() => setSelectedMeatOption('pork')}
          >
            Pork
          </div>
        </div>
      )}
    
    
              </div>
              <div className="allergens-container">
                <div className="allergens-text">Contains allergens?</div>
                <div className="allergens-options">
                  <div
                    className={`allergens-option ${
                      containsAllergens ? "selected" : ""
                    }`}
                    onClick={() => handleAllergensChange(true)}
                  >
                    Yes
                  </div>
                  <div
                    className={`allergens-option ${
                      !containsAllergens ? "selected" : ""
                    }`}
                    onClick={() => handleAllergensChange(false)}
                  >
                    No
                  </div>
                </div>
              </div>
              <div className="weight-container">
                <div className="weight-text">Approx weight</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={handleWeightChange}
                />
                <div className="weight-value">{weight} lb</div>
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="expiry-container">
              <div className="expiry-text">Expiry in weeks</div>
              <input
                type="range"
                min="0"
                max="4" 
                value={expiry}
                onChange={handleExpiryChange}
              />
              <div className="expiry-value">{expiry}</div>
            </div>
            <button className="next-button" onClick={handleNextClick}>
            <Link to="/location"> Proceed</Link>
            </button>
          </div>
        </div>
        </div>
      }
    </div> 
  );
};

export default Donate;