"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocationHelper {
    static calculateLocationKeyMaterial(latitude, longitude, toleranceDistance) {
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        let locationKeyMaterial = this.includeToleranceDistance(latitude, longitude, toleranceDistance);
        console.log("key derivation function input should be: " + locationKeyMaterial);
        return locationKeyMaterial;
    }
    static includeToleranceDistance(latitude, longitude, toleranceDistance) {
        let isNorth = false;
        let isWest = false;
        if (latitude < 0) {
            latitude = latitude * -1;
        }
        else if (latitude > 0) {
            isNorth = true;
        }
        if (longitude < 0) {
            longitude = longitude * -1;
            isWest = true;
        }
        latitude = this.convertToDegreesDecimalMinutes(latitude);
        longitude = this.convertToDegreesDecimalMinutes(longitude);
        latitude = latitude * 10000;
        longitude = longitude * 10000;
        if (isNorth) {
            latitude = Math.floor(latitude / (toleranceDistance * 5.4));
            console.log("bolmeden sonra:" + latitude);
            latitude = this.includeLocationSignBit(latitude, true);
            console.log("son hali:" + latitude);
        }
        else if (isNorth == false) {
            latitude = Math.floor(latitude / (toleranceDistance * 5.4));
            latitude = this.includeLocationSignBit(latitude, false);
        }
        if (isWest) {
            longitude = Math.floor(longitude / (toleranceDistance * 6));
            longitude = this.includeLocationSignBit(longitude, true);
        }
        else if (isWest == false) {
            longitude = Math.floor(longitude / (toleranceDistance * 6));
            console.log("bolmeden sonra:" + longitude);
            longitude = this.includeLocationSignBit(longitude, false);
            console.log("son hali:" + longitude);
        }
        return latitude.toString() + longitude.toString();
    }
    static convertToDegreesDecimalMinutes(locationValue) {
        let locationValueDegrees = Math.floor(locationValue);
        let locationValueDecimal = parseFloat(((locationValue % 1) * 60).toFixed(5).substring(0, 7));
        let result = parseFloat(locationValueDegrees.toString() + locationValueDecimal.toString());
        console.log("degrees decimal minutes result for each value:" + result);
        return result;
    }
    static includeLocationSignBit(locationValue, isNorthOrWest) {
        let firstBit = 1 << 27;
        let secondBit = 1 << 26;
        if (isNorthOrWest) {
            return firstBit + secondBit + locationValue;
        }
        else if (isNorthOrWest == false) {
            return firstBit + locationValue;
        }
    }
}
exports.LocationHelper = LocationHelper;
