"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.decryptMessage = function (latitude, longitude, ciphertext) {
        //get salt 
        var salt = localStorage.getItem("salt");
        var retrievedSaltArray = JSON.parse(salt);
        var saltBytes = new Uint8Array(retrievedSaltArray);
        //get iv
        var iv = localStorage.getItem("iv");
        var retrievedIvArray = JSON.parse(iv);
        var ivBytes = new Uint8Array(retrievedIvArray);
        //get tolerance distance
        var toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance")));
        //get original keyHash
        var originalHash = localStorage.getItem("keyhash");
        //create location inputs(locations with adjacent quadrants)
        var rawLocation = new Location_1.Location(latitude, longitude);
        var locationKeyMaterials = rawLocation.createLocationKeyMaterials(toleranceDistance);
        //decrypt the message
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(saltBytes, ivBytes);
        return encryptionTool.decrypt("202204507134369453", ciphertext, originalHash);
    };
    return Receiver;
}());
exports.Receiver = Receiver;