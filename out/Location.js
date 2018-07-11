"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHelper_1 = require("./LocationHelper");
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.degreesDecimalMinutes = [];
        this.locationHelper = new LocationHelper_1.LocationHelper();
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
    Location.prototype.getCurrentLocation = function () {
        this.degreesDecimalMinutes = this.locationHelper.decimalDegreesToDMS(this.latitude, this.longitude);
        console.log(this.degreesDecimalMinutes);
        this.locationHelper.binaryLocationRepresentator(this.degreesDecimalMinutes, 5);
        return this.latitude + " " + this.longitude;
    };
    return Location;
}());
exports.Location = Location;
