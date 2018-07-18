"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("../src/Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var locationButton = document.getElementById("button");
var encryptionButton = document.getElementById("encryptbutton");
var decryptionButton = document.getElementById("decryptbutton");
locationButton.onclick = function (e) {
    //getCurentLocation(); 
    EncryptionHelper_1.EncryptionHelper.deriveKey();
};
encryptionButton.onclick = function (e) {
    EncryptionHelper_1.EncryptionHelper.encrypt();
};
decryptionButton.onclick = function (e) {
    //   getCurentLocation(); 
    EncryptionHelper_1.EncryptionHelper.decrypt();
};
function getCurentLocation() {
    var output = document.getElementById("out");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var userLocation = new Location_1.Location(latitude, longitude);
        console.log(userLocation.getCurrentLocation());
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
