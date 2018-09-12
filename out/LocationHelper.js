"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocationHelper {
    static calculateLocationKeyMaterial(latitude, longitude, toleranceDistance) {
        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.');
        }
        let keypartLatitude = this.includeToleranceDistance(latitude, "latitude", toleranceDistance);
        let keypartLongitude = this.includeToleranceDistance(longitude, "longitude", toleranceDistance);
        console.log("Degerler:" + parseInt(keypartLatitude.toString() + keypartLongitude.toString()));
        return parseInt(keypartLatitude.toString() + keypartLongitude.toString());
    }
    static includeToleranceDistance(locationValue, locationType, toleranceDistance) {
        let shouldSetBit = false;
        if (locationValue < 0) {
            shouldSetBit = true;
            locationValue *= -1;
        }
        locationValue = this.convertToDegreesDecimalMinutes(locationValue);
        if (locationType == "latitude") {
            if (shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 5.4));
                locationValue = this.setBit(locationValue) + locationValue;
            }
            else if (!shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 5.4));
            }
        }
        else if (locationType == "longitude") {
            if (shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 6));
                locationValue = this.setBit(locationValue) + locationValue;
            }
            else if (!shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 6));
            }
        }
        return locationValue;
    }
    static convertToDegreesDecimalMinutes(locationValue) {
        let locationValueDegrees = Math.floor(locationValue);
        let locationValueDecimal = parseFloat(((locationValue % 1) * 60).toFixed(4));
        let result = parseFloat(locationValueDegrees.toString() + locationValueDecimal.toString());
        return result;
    }
    static setBit(locationValue) {
        let bitPosition = Math.floor(Math.log2(locationValue)) + 1;
        let numberToAdd = Math.pow(2, bitPosition);
        return numberToAdd;
    }
}
exports.LocationHelper = LocationHelper;
