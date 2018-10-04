"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Sender = /** @class */ (function () {
    function Sender() {
    }
    Sender.prototype.encryptMessage = function (latitude, longitude, message, toleranceDistance) {
        //prepare salt,iv
        var ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        var salt = window.crypto.getRandomValues(new Uint8Array(32));
        //save salt,IV,tolerance Distance to browser so that receiver can use them
        var saltArray = Array.from(salt);
        var ivBytesArray = Array.from(ivBytes);
        var storedSalt = JSON.stringify(saltArray);
        var storedivBytesArray = JSON.stringify(ivBytesArray);
        localStorage.setItem("salt", storedSalt);
        localStorage.setItem("iv", storedivBytesArray);
        localStorage.setItem("toleranceDistance", JSON.stringify(toleranceDistance));
        //create keyderivation input with location
        var location = new Location_1.Location(latitude, longitude, toleranceDistance);
        var locationInput = location.prepareSenderLocationInput();
        //encrypt the message
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        var ciphertext = encryptionTool.encrypt(locationInput, message);
        ciphertext.then(function (ciphertextResult) {
            localStorage.setItem("keyhash", ciphertextResult[0]);
            console.log("keyhash:" + ciphertextResult[0]);
        });
        return ciphertext;
    };
    return Sender;
}());
exports.Sender = Sender;
