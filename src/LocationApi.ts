import {Sender} from "../src/Sender";
import {EncryptionHelper} from "../src/EncryptionHelper";
import { Receiver } from "./Receiver";


  let locationButton = <HTMLButtonElement>document.getElementById("encryptButton"); 
  let decryptionButton = <HTMLButtonElement>document.getElementById("decryptButton");
  let plainTextField =  <HTMLTextAreaElement>document.getElementById("messageToEncrypt");
  let toleranceDistanceField =  <HTMLTextAreaElement>document.getElementById("toleranceDistanceField");
  
  locationButton.onclick = (e: Event) => {     
    submitLocationInput(); 
  };


  decryptionButton.onclick = (e: Event) => { 
        decryptMessage();   
  };


  function submitLocationInput(){
      let output = document.getElementById("out");
      console.log("see:"+output.id)

      
  
      if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      navigator.geolocation.getCurrentPosition(success, error);
    
      function success(position) {
        let latitude: number  = position.coords.latitude;
        let longitude: number = position.coords.longitude; 
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString())
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

  function decryptMessage(){

    let output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
      
      let receiver = new Receiver(10,20)
      receiver.decryptMessage()
      
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

  
  

  


