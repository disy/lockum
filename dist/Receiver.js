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
        var location = new Location_1.Location(latitude, longitude, toleranceDistance);
        var locationInputs = location.prepareReceiverLocationInputs();
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(saltBytes, ivBytes);
        var possibleLocation1 = encryptionTool.decrypt(locationInputs[0], ciphertext, originalHash);
        var possibleLocation2 = encryptionTool.decrypt(locationInputs[1], ciphertext, originalHash);
        var possibleLocation3 = encryptionTool.decrypt(locationInputs[2], ciphertext, originalHash);
        var possibleLocation4 = encryptionTool.decrypt(locationInputs[3], ciphertext, originalHash);
        var possibleLocation5 = encryptionTool.decrypt(locationInputs[4], ciphertext, originalHash);
        var possibleLocation6 = encryptionTool.decrypt(locationInputs[5], ciphertext, originalHash);
        var possibleLocation7 = encryptionTool.decrypt(locationInputs[6], ciphertext, originalHash);
        var possibleLocation8 = encryptionTool.decrypt(locationInputs[7], ciphertext, originalHash);
        var possibleLocation9 = encryptionTool.decrypt(locationInputs[8], ciphertext, originalHash);
        return Promise.all([possibleLocation1, possibleLocation2, possibleLocation3, possibleLocation4, possibleLocation5, possibleLocation6,
            possibleLocation7, possibleLocation8, possibleLocation9]);
    };
    return Receiver;
}());
exports.Receiver = Receiver;
