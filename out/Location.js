"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationHelper_1 = require("./LocationHelper");
class Location {
    constructor(latitude, longitude) {
        this.degreesDecimalMinutes = [];
        this.LocationHelper = new LocationHelper_1.LocationHelper();
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
    /**
     * this function is a temporary test function for now, only to get decimal degrees data and convert it into a Degrees Decimal Minutes Form
     */
    getCurrentLocation(toleranceDistance) {
        this.degreesDecimalMinutes = this.LocationHelper.decimalDegreesToDMS(this.latitude, this.longitude);
        this.LocationHelper.finalLocationOutput(this.degreesDecimalMinutes, toleranceDistance);
    }
}
exports.Location = Location;
