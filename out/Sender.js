"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var Sender = /** @class */ (function () {
    function Sender(latitude, longitude) {
        this.toleranceDistance = 5;
        this.locationOfTheSender = new Location_1.Location(latitude, longitude).getCurrentLocation(this.toleranceDistance);
    }
    Sender.prototype.getCurrentLocation = function () {
        return this.locationOfTheSender;
    };
    return Sender;
}());
exports.Sender = Sender;
