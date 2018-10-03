"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sender_1 = require("../src/Sender");
var Receiver_1 = require("./Receiver");
var encryptButton = document.getElementById("encryptButton");
var decryptButton = document.getElementById("decryptButton");
encryptButton.onclick = function (e) {
    encrypt();
};
decryptButton.onclick = function (e) {
    decrypt();
};
function encrypt() {
    var latitude = 5;
    var longitude = 10;
    var message = "foo";
    var toleranceDistance = 10;
    var sender = new Sender_1.Sender();
    return sender.encryptMessage(latitude, longitude, message, toleranceDistance);
}
exports.encrypt = encrypt;
function decrypt() {
    var latitude = 5;
    var longitude = 10;
    var message = "foo";
    var element = document.getElementById("messageToDecrypt");
    var ciphertext = element.value;
    var receiver = new Receiver_1.Receiver();
    return receiver.decryptMessage(latitude, longitude, ciphertext);
}
exports.decrypt = decrypt;
//# sourceMappingURL=LocationApi.js.map