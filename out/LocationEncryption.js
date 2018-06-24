"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("../src/Location");
var locationButton = document.getElementById("button");
locationButton.onclick = function (e) {
    getCurentLocation();
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
