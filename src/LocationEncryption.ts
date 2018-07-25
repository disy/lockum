import {Sender} from "../src/Sender";
import {EncryptionHelper} from "../src/EncryptionHelper";


  let locationButton = <HTMLButtonElement>document.getElementById("button"); 
  let encryptionButton = <HTMLButtonElement>document.getElementById("encryptbutton"); 
  let decryptionButton = <HTMLButtonElement>document.getElementById("decryptbutton"); 
  let EncryptionHelping = new EncryptionHelper();

  locationButton.onclick = (e: Event) => { 
    
    getCurentLocation(); 
  };


  encryptionButton.onclick = (e: Event) => { 
    EncryptionHelping.encrypt();
    
  };


  decryptionButton.onclick = (e: Event) => { 
 //   getCurentLocation(); 
    EncryptionHelping.decrypt();  
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
        let SenderSide = new Sender(latitude,longitude);
        
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

  
  

  


