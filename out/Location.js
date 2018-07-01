"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
    Location.prototype.getCurrentLocation = function () {
        this.decimalDegreesToDMS(this.latitude, this.longitude);
        return this.latitude + " " + this.longitude;
    };
    //this function gets the current latitude and longitude values in the form of decimal degrees 
    //and returns them as degrees decimal minutes form
    Location.prototype.decimalDegreesToDMS = function (latitude, longitude) {
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        var degreesDecimalMinutes = [];
        var latitudeSign;
        var longitudeSign;
        var integerLatitude;
        var integerLongitude;
        var minutesLatitude;
        var minutesLongitude;
        var secondsLatitude;
        var secondsLongitude;
        var dmsLatitude;
        var dmsLongitude;
        if (latitude < 0) {
            latitudeSign = "S";
        }
        else {
            latitudeSign = "N";
        }
        if (longitude < 0) {
            longitudeSign = "W";
        }
        else {
            longitudeSign = "E";
        }
        integerLatitude = Math.floor(latitude);
        integerLongitude = Math.floor(longitude);
        minutesLatitude = Math.floor((latitude - integerLatitude) * 60);
        minutesLongitude = Math.floor((longitude - integerLongitude) * 60);
        secondsLatitude = (((latitude - integerLatitude) * 60 - minutesLatitude) * 60).toFixed(4);
        secondsLongitude = (((longitude - integerLongitude) * 60 - minutesLongitude) * 60).toFixed(4);
        //Dms stands for degrees minutes seconds 
        dmsLatitude = latitudeSign + "_" + integerLatitude + "_" + minutesLatitude + "_" + secondsLatitude;
        dmsLongitude = longitudeSign + "_" + integerLongitude + "_" + minutesLongitude + "_" + secondsLongitude;
        degreesDecimalMinutes = this.DmsToDegreesDecimalMinutes(dmsLatitude, dmsLongitude);
        return degreesDecimalMinutes;
    };
    //this function gets the latitude and longitude values in the form of degrees minutes and seconds
    //then returns them as degrees decimal minutes.
    Location.prototype.DmsToDegreesDecimalMinutes = function (latitude, longitude) {
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        var degreesDecimalMinutes = [];
        var dmsLatitude = latitude;
        var dmsLongitude = longitude;
        var dmsLatitudeElements = dmsLatitude.split("_", 4);
        var dmsLongitudeElements = dmsLongitude.split("_", 4);
        var dmsLatitudeSign = dmsLatitudeElements[0];
        var dmsLongitudeSign = dmsLongitudeElements[0];
        var dmsDegreesLatitude = dmsLatitudeElements[1];
        var dmsDegreesLongitude = dmsLongitudeElements[1];
        var dmsMinutesLatitude = dmsLatitudeElements[2];
        var dmsMinutesLongitude = dmsLongitudeElements[2];
        var dmsSecondsLatitude = (dmsLatitudeElements[3] / 60).toFixed(4);
        var dmsSecondsLongitude = (dmsLongitudeElements[3] / 60).toFixed(4);
        var dmsrestOfDegreesLatitude = +dmsMinutesLatitude * 1 + +dmsSecondsLatitude * 1;
        var dmsrestOfDegreesLongitude = +dmsMinutesLongitude * 1 + +dmsSecondsLongitude * 1;
        console.log(dmsrestOfDegreesLatitude);
        degreesDecimalMinutes.push(dmsLatitudeSign);
        degreesDecimalMinutes.push(dmsDegreesLatitude + dmsrestOfDegreesLatitude);
        degreesDecimalMinutes.push(dmsLongitudeSign);
        degreesDecimalMinutes.push(dmsDegreesLongitude + dmsrestOfDegreesLongitude);
        console.log(degreesDecimalMinutes);
        return degreesDecimalMinutes;
    };
    return Location;
}());
exports.Location = Location;
