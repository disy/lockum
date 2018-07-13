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
    /**
     * this function is a temporar test function for now, only to get decimal degrees data and convert it into a Degrees Decimal Minutes Form
     */
    Location.prototype.getCurrentLocation = function () {
        this.degreesDecimalMinutes = this.locationHelper.decimalDegreesToDMS(this.latitude, this.longitude);
        console.log(this.degreesDecimalMinutes);
        this.locationHelper.finalLocationOutput(this.degreesDecimalMinutes, 5);
        return this.latitude + " " + this.longitude;
    };
    return Location;
}());
exports.Location = Location;
