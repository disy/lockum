"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationHelper_1 = require("./LocationHelper");
class Location {
    constructor(latitude, longitude) {
        this.degreesDecimalMinutes = [];
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
    /**
     * this function is a temporary test function for now, only to get decimal degrees data and convert it into a Degrees Decimal Minutes Form
     */
    getCurrentLocation(toleranceDistance) {
        this.degreesDecimalMinutes = LocationHelper_1.LocationHelper.decimalDegreesToDMS(this.latitude, this.longitude);
        LocationHelper_1.LocationHelper.finalLocationOutput(this.degreesDecimalMinutes, toleranceDistance);
        console.log("deneme322: " + LocationHelper_1.LocationHelper.finalLocationOutput(this.degreesDecimalMinutes, toleranceDistance));
    }
}
exports.Location = Location;
