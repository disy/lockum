import {Location} from "../src/Location";

  let locationButton = <HTMLButtonElement>document.getElementById("button"); 
  locationButton.onclick = (e: Event) => { 
    getCurentLocation(); 
  };

  function getCurentLocation(){

      let output = document.getElementById("out");
  
      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      navigator.geolocation.getCurrentPosition(success, error);
    
      function success(position) {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude; 
        let userLocation = new Location(latitude,longitude);
        console.log(userLocation.getCurrentLocation());
      }
    
      function error() {
        output.innerHTML = "Unable to retrieve your location";
      }
  
      var geo_options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
      };
  }

  
  

  


