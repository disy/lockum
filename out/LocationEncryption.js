"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sender_1 = require("../src/Sender");
const Receiver_1 = require("./Receiver");
let locationButton = document.getElementById("button");
let encryptionButton = document.getElementById("encryptbutton");
let decryptionButton = document.getElementById("decryptbutton");
let plainTextField = document.getElementById("messageToEncrypt");
locationButton.onclick = (e) => {
    getCurentLocation();
};
encryptionButton.onclick = (e) => {
};
decryptionButton.onclick = (e) => {
    getCurentLocation2();
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
        console.log("Latitude:" + latitude);
        console.log("Longitude:" + longitude);
        let SenderSide = new Sender_1.Sender(latitude, longitude, plainTextField.value);
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
function getCurentLocation2() {
    let output = document.getElementById("out");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let receiverSide = new Receiver_1.Receiver(latitude, longitude, plainTextField.value);
        receiverSide.decrypt();
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
