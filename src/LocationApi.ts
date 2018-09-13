import {Sender} from "../src/Sender";
import {EncryptionHelper} from "../src/EncryptionHelper";
import { Receiver } from "./Receiver";


  let locationButton = <HTMLButtonElement>document.getElementById("button"); 
  let encryptionButton = <HTMLButtonElement>document.getElementById("encryptbutton"); 
  let decryptionButton = <HTMLButtonElement>document.getElementById("decryptbutton");
  let plainTextField =  <HTMLTextAreaElement>document.getElementById("messageToEncrypt");
  let toleranceDistanceField =  <HTMLTextAreaElement>document.getElementById("toleranceDistanceField");
  
  locationButton.onclick = (e: Event) => {     
    submitLocationInput(); 
  };


  encryptionButton.onclick = (e: Event) => { 
    
      
  };


  decryptionButton.onclick = (e: Event) => { 
        getCurentLocation2();   
  };


  function submitLocationInput(){

      let output = document.getElementById("out");
  
      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      navigator.geolocation.getCurrentPosition(success, error);
    
      function success(position) {
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude; 
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())
        console.log("Latitude:" + latitude);
        console.log("Longitude:" + longitude);
        let sender = new Sender(latitude,longitude,plainTextField.value,toleranceDistance);
        sender.encryptMessage();
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

  function getCurentLocation2(){

    let output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude; 
      let receiverSide = new Receiver(latitude,longitude,plainTextField.value);
      receiverSide.decrypt();
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

  
  

  


