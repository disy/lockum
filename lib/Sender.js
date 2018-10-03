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
        //get the raw location and include tolerance distance
        var rawLocation = new Location_1.Location(latitude, longitude);
        var locationKeyMaterial = rawLocation.createLocationKeyMaterial(toleranceDistance);
        //encrypt the message
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        //save salt,IV,tolerance Distance to browser so that receiver can use them
        var saltArray = Array.from(salt);
        var ivBytesArray = Array.from(ivBytes);
        var storedSalt = JSON.stringify(saltArray);
        var storedivBytesArray = JSON.stringify(ivBytesArray);
        localStorage.setItem("salt", storedSalt);
        localStorage.setItem("iv", storedivBytesArray);
        localStorage.setItem("toleranceDistance", JSON.stringify(toleranceDistance));
        var ciphertext = encryptionTool.encrypt(locationKeyMaterial, message);
        ciphertext.then(function (ahmet) {
            localStorage.setItem("keyhash", ahmet[0]);
        });
        return ciphertext;
    };
    return Sender;
}());
exports.Sender = Sender;
//# sourceMappingURL=Sender.js.map