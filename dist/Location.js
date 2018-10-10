"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latitudeCoefficient = 5.4;
var longitudeCoefficent = 6;
var Location = /** @class */ (function () {
    function Location(latitude, longitude, toleranceDistance) {
        this.toleranceDistance = toleranceDistance;
        this.latitude = ["", 0];
        this.longitude = ["", 0];
        this.latitude = this.convertToDegreesDecimalMinutes(latitude, true);
        this.longitude = this.convertToDegreesDecimalMinutes(longitude, false);
    }
    Location.prototype.prepareSenderLocationInput = function () {
        var latitudePart = this.calculateIntegralPart(this.latitude[0], this.latitude[1]);
        var longitudePart = this.calculateIntegralPart(this.longitude[0], this.longitude[1]);
        latitudePart = this.includeLocationSign(this.latitude[0], latitudePart);
        longitudePart = this.includeLocationSign(this.longitude[0], longitudePart);
        var input = new Int32Array([latitudePart, longitudePart]);
        return input;
    };
    Location.prototype.prepareReceiverLocationInputs = function () {
        var latitudePart = this.calculateIntegralPart(this.latitude[0], this.latitude[1]);
        var longitudePart = this.calculateIntegralPart(this.longitude[0], this.longitude[1]);
        latitudePart = this.includeLocationSign(this.latitude[0], latitudePart);
        longitudePart = this.includeLocationSign(this.longitude[0], longitudePart);
        var inputsArray = this.createAdjacentLocations(latitudePart, longitudePart);
        return inputsArray;
    };
    Location.prototype.calculateIntegralPart = function (hemisphere, locationValue) {
        locationValue = locationValue * 10000;
        if (hemisphere == "N" || hemisphere == "S") {
            return locationValue / (this.toleranceDistance * latitudeCoefficient);
        }
        else {
            return locationValue / (this.toleranceDistance * longitudeCoefficent);
        }
    };
    Location.prototype.includeLocationSign = function (hemisphere, locationValue) {
        if (hemisphere == "N" || hemisphere == "W") {
            return locationValue;
        }
        else {
            return locationValue * -1;
        }
    };
    Location.prototype.createAdjacentLocations = function (latitude, longitude) {
        var adjacentLocations = Array();
        adjacentLocations[0] = new Int32Array([latitude - 1, longitude - 1]);
        adjacentLocations[1] = new Int32Array([latitude - 1, longitude]);
        adjacentLocations[2] = new Int32Array([latitude - 1, longitude + 1]);
        adjacentLocations[3] = new Int32Array([latitude, longitude - 1]);
        adjacentLocations[4] = new Int32Array([latitude, longitude]);
        adjacentLocations[5] = new Int32Array([latitude, longitude + 1]);
        adjacentLocations[6] = new Int32Array([latitude + 1, longitude - 1]);
        adjacentLocations[7] = new Int32Array([latitude + 1, longitude]);
        adjacentLocations[8] = new Int32Array([latitude + 1, longitude + 1]);
        return adjacentLocations;
    };
    Location.prototype.convertToDegreesDecimalMinutes = function (locationValue, isLatitude) {
        var locationSign = "";
        if (locationValue < 0 && isLatitude) {
            locationSign = "S";
            locationValue = locationValue * -1;
        }
        else if (locationValue < 0 && !isLatitude) {
            locationSign = "W";
            locationValue = locationValue * -1;
        }
        else if (locationValue > 0 && isLatitude) {
            locationSign = "N";
        }
        else if (locationValue > 0 && !isLatitude) {
            locationSign = "E";
        }
        var degreesPart = Math.floor(locationValue);
        var floatingMinutes = +((locationValue % 1) * 60).toFixed(4);
        var minutesIntegralPart = Math.floor(floatingMinutes);
        var minutesIntegralDigitNumber = Math.floor(Math.log10(minutesIntegralPart)) + 1;
        var degreesDecimalMinutes = (degreesPart * (Math.pow(10, minutesIntegralDigitNumber))) + floatingMinutes;
        var location = [locationSign, degreesDecimalMinutes];
        return location;
    };
    return Location;
}());
exports.Location = Location;
