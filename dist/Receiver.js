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
        var promises = [];
        for (var i = 0; i <= locationInputs.length - 1; i++) {
            promises.push(Promise.resolve(encryptionTool.decrypt(locationInputs[i], ciphertext, originalHash))
                .catch(function (error) { return null; }));
        }
        return Promise.all(promises).then(function (results) {
            for (var index = 0; index <= results.length - 1; index++) {
                if (results[index] != undefined) {
                    console.log("found:" + results[index]);
                    return results[index];
                }
            }
        });
        /*

        let possibleLocation1 = encryptionTool.decrypt(locationInputs[0],ciphertext,originalHash)
        let possibleLocation2 = encryptionTool.decrypt(locationInputs[1],ciphertext,originalHash)
        let possibleLocation3 = encryptionTool.decrypt(locationInputs[2],ciphertext,originalHash)
        let possibleLocation4 = encryptionTool.decrypt(locationInputs[3],ciphertext,originalHash)
        let possibleLocation5 = encryptionTool.decrypt(locationInputs[4],ciphertext,originalHash)
        let possibleLocation6 = encryptionTool.decrypt(locationInputs[5],ciphertext,originalHash)
        let possibleLocation7 = encryptionTool.decrypt(locationInputs[6],ciphertext,originalHash)
        let possibleLocation8 = encryptionTool.decrypt(locationInputs[7],ciphertext,originalHash)
        let possibleLocation9 = encryptionTool.decrypt(locationInputs[8],ciphertext,originalHash)

        return Promise.all([possibleLocation1,possibleLocation2,possibleLocation3,possibleLocation4,possibleLocation5,possibleLocation6
            ,possibleLocation7,possibleLocation8,possibleLocation9]) */
    };
    return Receiver;
}());
exports.Receiver = Receiver;
