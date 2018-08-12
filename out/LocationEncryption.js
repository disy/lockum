"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sender_1 = require("../src/Sender");
let locationButton = document.getElementById("button");
let encryptionButton = document.getElementById("encryptbutton");
let decryptionButton = document.getElementById("decryptbutton");
locationButton.onclick = (e) => {
    getCurentLocation();
};
encryptionButton.onclick = (e) => {
};
decryptionButton.onclick = (e) => {
    //   getCurentLocation(); 
};
function getCurentLocation() {
    let output = document.getElementById("out");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let SenderSide = new Sender_1.Sender(latitude, longitude);
        SenderSide.encryptTheMessage();
    }
    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };
}
