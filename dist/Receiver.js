"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.decryptMessage = function (latitude, longitude, ciphertext, saltBytes, ivBytes, toleranceDistance, originalHash) {
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
                    //saves key hash of the sender into browser to show on html
                    localStorage.setItem("keyhashReceiver", results[index][1]);
                    //return plain text promise and key hash
                    return results[index];
                }
            }
        });
    };
    return Receiver;
}());
exports.Receiver = Receiver;
