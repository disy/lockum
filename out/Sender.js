"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Sender = /** @class */ (function () {
    function Sender(latitude, longitude) {
        this.toleranceDistance = 5;
        this.salt = "allo";
        this.locationOfTheSender = new Location_1.Location(latitude, longitude).getCurrentLocation(this.toleranceDistance);
    }
    Sender.prototype.getCurrentLocation = function () {
        return this.locationOfTheSender;
    };
    Sender.prototype.encryptTheMessage = function () {
        this.ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        this.EncryptionTool = new EncryptionHelper_1.EncryptionHelper(this.salt, this.ivBytes);
        this.EncryptionTool.encrypt();
    };
    Sender.prototype.decryptMessage = function () {
    };
    return Sender;
}());
exports.Sender = Sender;
