"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHelper = /** @class */ (function () {
    function LocationHelper() {
    }
    //this is the main function which gets the current latitude and longitude values in the form of decimal degrees 
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
    /**
     * this function gets the location information and produces the binary representation of location datas
     * this binary representation will be used as an input for an expensive key derivation algorithm
     *
     * @param locationValues represents the array consisting of latitude and longitude information
     * @param toleranceDistance represents the desired encryption distance for the location information
     */
    LocationHelper.prototype.binaryLocationRepresentator = function (locationValues, toleranceDistance) {
        console.log(this.binaryLatitudeLongitudeSignCalculator(locationValues[0]) + this.toleraceDistanceCalculator(locationValues[0], true, 5) + locationValues[0]
            + this.toleraceDistanceCalculator(locationValues[0], false, 5) + this.binaryLatitudeLongitudeSignCalculator(locationValues[1]));
        return this.binaryLatitudeLongitudeSignCalculator(locationValues[0]) + this.toleraceDistanceCalculator(locationValues[0], true, 5)
            + this.binaryLatitudeLongitudeSignCalculator(locationValues[1] + this.toleraceDistanceCalculator(locationValues[1], false, 5));
    };
    /**
     * This method takes the location, multiplies it by 10.000 and then divides it by toleranceDistance*CorrespondingValue
     *
     * @param locationValue indicates the latitude or longitutde value to be calculated by desired tolerance distance
     * @param latitudeValue there are two different values when tolerance value is processed, therefore this variable
     *  is used to check if its latitude or longitude
     * @param toleranceDistance represents the desired encryption distance for the location information
     */
    LocationHelper.prototype.toleraceDistanceCalculator = function (locationValue, latitudeValue, toleranceDistance) {
        locationValue = locationValue.substring(1).slice(0, -1);
        var location = parseFloat(locationValue);
        location = location * 10000;
        if (latitudeValue)
            location = location / (toleranceDistance * 5.4);
        else
            location = location / (toleranceDistance * 6);
        location = Math.floor(location);
        return locationValue;
    };
    LocationHelper.prototype.binaryLatitudeLongitudeSignCalculator = function (locationValue) {
        if (locationValue.substring(0, 1) == "E") {
            return 0;
        }
        else if (locationValue.substring(0, 1) == "W") {
            return 1;
        }
        else if (locationValue.substring(0, 1) == "N") {
            return 0;
        }
        else if (locationValue.substring(0, 1) == "S") {
            return 1;
        }
    };
    return LocationHelper;
}());
exports.LocationHelper = LocationHelper;
