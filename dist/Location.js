"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationHelper_1 = require("./LocationHelper");
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this.latitude = parseFloat(latitude.toFixed(6));
        this.longitude = parseFloat(longitude.toFixed(6));
    }
    //creates an input for key derivation function of the sender
    Location.prototype.createLocationKeyMaterial = function (toleranceDistance) {
        var locationKeyMaterial = LocationHelper_1.LocationHelper.calculateLocationKeyMaterial(this.latitude, this.longitude, toleranceDistance);
        return locationKeyMaterial;
    };
    //creates an array of inputs with neighbour quadrants of the receiver
    Location.prototype.createLocationKeyMaterials = function (toleranceDistance) {
        var locationKeyMaterials = LocationHelper_1.LocationHelper.createLocationMaterials(this.latitude, this.longitude, toleranceDistance);
        return locationKeyMaterials;
    };
    return Location;
}());
exports.Location = Location;
