"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sender_1 = require("./Sender");
var Receiver_1 = require("./Receiver");
var sender = new Sender_1.Sender();
var receiver = new Receiver_1.Receiver();
function encrypt(latitude, longitude, message, toleranceDistance) {
    return sender.encryptMessage(latitude, longitude, message, toleranceDistance);
}
exports.encrypt = encrypt;
function decrypt(latitude, longitude, ciphertext) {
    return receiver.decryptMessage(latitude, longitude, ciphertext);
}
exports.decrypt = decrypt;
