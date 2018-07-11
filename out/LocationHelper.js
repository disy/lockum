"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHelper = /** @class */ (function () {
    function LocationHelper() {
    }
    //this function gets the current latitude and longitude values in the form of decimal degrees 
    //and returns them as degrees decimal minutes form
    LocationHelper.prototype.decimalDegreesToDMS = function (latitude, longitude) {
        var degreesDecimalMinutes = [];
        var dmsLatitude;
        var dmsLongitude;
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        //Dms stands for degrees minutes seconds 
        dmsLatitude = this.decimalDegreesToDMSCalculator(latitude, true);
        dmsLongitude = this.decimalDegreesToDMSCalculator(longitude, false);
        degreesDecimalMinutes = this.dmsToDegreesDecimalMinutes(dmsLatitude, dmsLongitude);
        console.log(degreesDecimalMinutes);
        return degreesDecimalMinutes;
    };
    //this function gets the latitude and longitude values in the form of degrees minutes and seconds
    //then returns them as degrees decimal minutes.
    LocationHelper.prototype.dmsToDegreesDecimalMinutes = function (latitude, longitude) {
        var degreesDecimalMinutes = [];
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        degreesDecimalMinutes[0] = (this.dmsToDegreesDecimalMinutesCalculator(latitude));
        degreesDecimalMinutes[1] = (this.dmsToDegreesDecimalMinutesCalculator(longitude));
        return degreesDecimalMinutes;
    };
    LocationHelper.prototype.decimalDegreesToDMSCalculator = function (locationvalue, isLatitude) {
        var dmsInformation = [];
        var integer;
        var minutes;
        var seconds;
        var locationSign;
        var latitudeInformation = isLatitude;
        if (latitudeInformation && locationvalue < 0) {
            locationSign = "S";
        }
        else if (latitudeInformation && locationvalue > 0) {
            locationSign = "N";
        }
        else if (latitudeInformation == false && locationvalue < 0) {
            locationSign = "W";
        }
        else if (latitudeInformation == false && locationvalue > 0) {
            locationSign = "E";
        }
        integer = Math.floor(locationvalue);
        minutes = Math.floor((locationvalue - integer) * 60);
        seconds = (((locationvalue - integer) * 60 - minutes) * 60).toFixed(4);
        dmsInformation[0] = locationSign;
        dmsInformation[1] = integer;
        dmsInformation[2] = minutes;
        dmsInformation[3] = seconds;
        return dmsInformation;
    };
    LocationHelper.prototype.dmsToDegreesDecimalMinutesCalculator = function (locationInfo) {
        var locationSign = locationInfo[0];
        var degrees = locationInfo[1];
        var decimalMinutes = +locationInfo[2] + +(+locationInfo[3] / 60).toFixed(4);
        var degreesDecimalMinutes = locationSign + degrees + decimalMinutes;
        return degreesDecimalMinutes;
    };
    return LocationHelper;
}());
exports.LocationHelper = LocationHelper;
