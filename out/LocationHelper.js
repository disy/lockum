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
            latitude = this.includeLocationSignBits(latitude, true);
            console.log("latitude part:" + latitude);
        }
        else if (isNorth == false) {
            latitude = Math.floor(latitude / (toleranceDistance * 5.4));
            latitude = this.includeLocationSignBits(latitude, false);
        }
        if (isWest) {
            longitude = Math.floor(longitude / (toleranceDistance * 6));
            longitude = this.includeLocationSignBits(longitude, true);
        }
        else if (isWest == false) {
            longitude = Math.floor(longitude / (toleranceDistance * 6));
            longitude = this.includeLocationSignBits(longitude, false);
            console.log("longitude part:" + longitude);
        }
        return latitude.toString() + longitude.toString();
    }
    static convertToDegreesDecimalMinutes(locationValue) {
        let locationValueDegrees = Math.floor(locationValue);
        let locationValueDecimal = parseFloat(((locationValue % 1) * 60).toFixed(5).substring(0, 7));
        let result = parseFloat(locationValueDegrees.toString() + locationValueDecimal.toString());
        return result;
    }
    static includeLocationSignBits(locationValue, isNorthOrWest) {
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
