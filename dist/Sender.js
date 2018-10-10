"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Sender = /** @class */ (function () {
    function Sender() {
    }
    /**
     * @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
     * @param message refers to plain text that will be encrypted
     * @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
     */
    Sender.prototype.encryptMessage = function (locationInfo, message) {
        var latitude = locationInfo[0];
        var longitude = locationInfo[1];
        var toleranceDistance = locationInfo[2];
        //prepare salt,iv
        var ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        var salt = window.crypto.getRandomValues(new Uint8Array(32));
        //save salt,IV,tolerance Distance to browser so that receiver can use them
        //create keyderivation input with location
        var location = new Location_1.Location(latitude, longitude, toleranceDistance);
        var keyDerivationInput = location.getTransformedLocation();
        //encrypt the message
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        var ciphertext = encryptionTool.encrypt(keyDerivationInput, message, toleranceDistance);
        return ciphertext;
    };
    return Sender;
}());
exports.Sender = Sender;
