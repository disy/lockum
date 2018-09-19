"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sender_1 = require("../src/Sender");
const Receiver_1 = require("./Receiver");
let locationButton = document.getElementById("button");
let decryptionButton = document.getElementById("decryptbutton");
let plainTextField = document.getElementById("messageToEncrypt");
let toleranceDistanceField = document.getElementById("toleranceDistanceField");
locationButton.onclick = (e) => {
    submitLocationInput();
};
decryptionButton.onclick = (e) => {
    decryptMessage();
};
function submitLocationInput() {
    let output = document.getElementById("out");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let toleranceDistance = parseInt(toleranceDistanceField.value.toString());
        let sender = new Sender_1.Sender(latitude, longitude, plainTextField.value, toleranceDistance);
        sender.encryptMessage();
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
function decryptMessage() {
    let output = document.getElementById("out");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let receiver = new Receiver_1.Receiver(10, 20);
        receiver.decryptMessage();
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
