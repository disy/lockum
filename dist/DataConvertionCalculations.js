"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_encoding_1 = require("text-encoding");
var DataConvertionCalculations = /** @class */ (function () {
    function DataConvertionCalculations() {
    }
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
            return new text_encoding_1.TextEncoder().encode(s);
        }
        // Otherwise, fall back to 7-bit ASCII only
        var result = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            result[i] = s.charCodeAt(i);
        }
        return result;
    };
    DataConvertionCalculations.convertToHex = function (buffer) {
        var hexCodes = [];
        var view = new DataView(buffer);
        for (var i = 0; i < view.byteLength; i += 4) {
            // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
            var value = view.getUint32(i);
            // toString(16) will give the hex representation of the number without padding
            var stringValue = value.toString(16);
            // We use concatenation and slice for padding
            var padding = '00000000';
            var paddedValue = (padding + stringValue).slice(-padding.length);
            hexCodes.push(paddedValue);
        }
        // Join all the hex strings into one
        return hexCodes.join("");
    };
    return DataConvertionCalculations;
}());
exports.DataConvertionCalculations = DataConvertionCalculations;
