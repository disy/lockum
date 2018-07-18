"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_encoding_1 = require("text-encoding");
var DataConvertionCalculations = /** @class */ (function () {
    function DataConvertionCalculations() {
    }
    DataConvertionCalculations.byteArrayToHexString = function (byteArray) {
        var hexString = '';
        var nextHexByte;
        for (var i = 0; i < byteArray.byteLength; i++) {
            nextHexByte = byteArray[i].toString(16); // Integer to base 16
            if (nextHexByte.length < 2) {
                nextHexByte = "0" + nextHexByte; // Otherwise 10 becomes just a instead of 0a
            }
            hexString += nextHexByte;
        }
        return hexString;
    };
    DataConvertionCalculations.hexStringToByteArray = function (hexString) {
        if (hexString.length % 2 !== 0) {
            throw "Must have an even number of hex digits to convert to bytes";
        }
        var numBytes = hexString.length / 2;
        var byteArray = new Uint8Array(numBytes);
        for (var i = 0; i < numBytes; i++) {
            byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
        }
        return byteArray;
    };
    DataConvertionCalculations.byteArrayToBase64 = function (byteArray) {
        var binaryString = "";
        for (var i = 0; i < byteArray.byteLength; i++) {
            binaryString += String.fromCharCode(byteArray[i]);
        }
        var base64String = window.btoa(binaryString);
        return base64String;
    };
    DataConvertionCalculations.base64ToByteArray = function (base64String) {
        var binaryString = window.atob(base64String);
        var byteArray = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            byteArray[i] += binaryString.charCodeAt(i);
        }
        return byteArray;
    };
    DataConvertionCalculations.byteArrayToString = function (byteArray) {
        if ("TextDecoder" in window) {
            // let decoder = new TextEncoding.TextDecoder();
            // return decoder.decode(byteArray);
            return new text_encoding_1.TextDecoder().decode(byteArray);
        }
        // Otherwise, fall back to 7-bit ASCII only
        var result = "";
        for (var i = 0; i < byteArray.byteLength; i++) {
            result += String.fromCharCode(byteArray[i]);
        }
        return result;
    };
    DataConvertionCalculations.stringToByteArray = function (s) {
        if ("TextEncoder" in window) {
            //  let encoder = new TextEncoder;
            //  return encoder.encode(s);
            return new text_encoding_1.TextEncoder().encode(s);
        }
        // Otherwise, fall back to 7-bit ASCII only
        var result = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            result[i] = s.charCodeAt(i);
        }
        return result;
    };
    return DataConvertionCalculations;
}());
exports.DataConvertionCalculations = DataConvertionCalculations;
