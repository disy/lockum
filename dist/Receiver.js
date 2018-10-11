"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var EncryptionHelper_1 = require("../src/EncryptionHelper");
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    /**
     * @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
     * @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
     * @returns a promise that returns plain text and calculated keyhash
     */
    Receiver.prototype.decryptMessage = function (locationInfo, decryptionElements) {
        var latitude = locationInfo[0];
        var longitude = locationInfo[1];
        var toleranceDistance = locationInfo[2];
        var saltBytes = decryptionElements[0];
        var ivBytes = decryptionElements[1];
        var ciphertext = decryptionElements[2];
        var originalHash = decryptionElements[3];
        //create location inputs(locations with adjacent quadrants)
        var location = new Location_1.Location(latitude, longitude, toleranceDistance);
        var keyderivationInputs = location.getAdjacentQuadrants();
        var encryptionTool = new EncryptionHelper_1.EncryptionHelper(saltBytes, ivBytes);
        var promises = [];
        for (var i = 0; i <= keyderivationInputs.length - 1; i++) {
            promises.push(Promise.resolve(encryptionTool.decrypt(keyderivationInputs[i], ciphertext, originalHash))
                .catch(function (error) { return null; }));
        }
        return Promise.all(promises).then(function (results) {
            for (var index = 0; index <= results.length - 1; index++) {
                if (results[index] != undefined) {
                    //return plain text promise and key hash
                    return results[index];
                }
            }
        });
    };
    return Receiver;
}());
exports.Receiver = Receiver;
