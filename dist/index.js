"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sender_1 = require("./Sender");
var Receiver_1 = require("./Receiver");
var sender = new Sender_1.Sender();
var receiver = new Receiver_1.Receiver();
/**
* @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
* @param message refers to plain text that will be encrypted
* @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
*/
function encrypt(locationInfo, message) {
    return sender.encryptMessage(locationInfo, message);
}
exports.encrypt = encrypt;
/**
* @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
* @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
* @returns a promise with plain text and calculated keyhash
*/
function decrypt(locationInfo, decryptionElements) {
    return receiver.decryptMessage(locationInfo, decryptionElements);
}
exports.decrypt = decrypt;
