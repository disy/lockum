"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    Location.prototype.getCurrentLocation = function () {
        return Math.floor(this.latitude) + " " + Math.floor(this.longitude);
    };
    Location.prototype.decimalDegreesToDMS = function (latitude, longitude) {
        var integerLatitude;
        var decimalLatitude;
        var integerLongitude;
        var decimalLongitude;
        if (latitude < 0) {
        }
    };
    return Location;
}());
exports.Location = Location;
