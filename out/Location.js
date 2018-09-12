"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationHelper_1 = require("./LocationHelper");
class Location {
    constructor(latitude, longitude) {
        this.latitude = parseFloat(latitude.toFixed(7));
        this.longitude = parseFloat(longitude.toFixed(7));
    }
    createLocationKeyMaterial(toleranceDistance) {
        let locationKeyMaterial = LocationHelper_1.LocationHelper.calculateLocationKeyMaterial(this.latitude, this.longitude, toleranceDistance);
        return locationKeyMaterial;
    }
}
exports.Location = Location;
