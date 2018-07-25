"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sender_1 = require("../src/Sender");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var locationButton = document.getElementById("button");
var encryptionButton = document.getElementById("encryptbutton");
var decryptionButton = document.getElementById("decryptbutton");
var EncryptionHelping = new EncryptionHelper_1.EncryptionHelper();
locationButton.onclick = function (e) {
    getCurentLocation();
};
encryptionButton.onclick = function (e) {
    EncryptionHelping.encrypt();
};
decryptionButton.onclick = function (e) {
    //   getCurentLocation(); 
    EncryptionHelping.decrypt();
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
        var SenderSide = new Sender_1.Sender(latitude, longitude);
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
