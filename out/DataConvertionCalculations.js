"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_encoding_1 = require("text-encoding");
class DataConvertionCalculations {
    static hexStringToByteArray(hexString) {
        if (hexString.length % 2 !== 0) {
            throw "Must have an even number of hex digits to convert to bytes";
        }
        let numBytes = hexString.length / 2;
        let byteArray = new Uint8Array(numBytes);
        for (let i = 0; i < numBytes; i++) {
            byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
        }
        return byteArray;
    }
    static byteArrayToBase64(byteArray) {
        let binaryString = "";
        for (let i = 0; i < byteArray.byteLength; i++) {
            binaryString += String.fromCharCode(byteArray[i]);
        }
        let base64String = window.btoa(binaryString);
        return base64String;
    }
    static base64ToByteArray(base64String) {
        let binaryString = window.atob(base64String);
        let byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] += binaryString.charCodeAt(i);
        }
        return byteArray;
    }
    static byteArrayToString(byteArray) {
        if ("TextDecoder" in window) {
            return new text_encoding_1.TextDecoder().decode(byteArray);
        }
        // Otherwise, fall back to 7-bit ASCII only
        let result = "";
        for (let i = 0; i < byteArray.byteLength; i++) {
            result += String.fromCharCode(byteArray[i]);
        }
        return result;
    }
    static stringToByteArray(s) {
        if ("TextEncoder" in window) {
            return new text_encoding_1.TextEncoder().encode(s);
        }
        // Otherwise, fall back to 7-bit ASCII only
        let result = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) {
            result[i] = s.charCodeAt(i);
        }
        return result;
    }
    static convertToHex(buffer) {
        let hexCodes = [];
        let view = new DataView(buffer);
        for (let i = 0; i < view.byteLength; i += 4) {
            // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
            let value = view.getUint32(i);
            // toString(16) will give the hex representation of the number without padding
            let stringValue = value.toString(16);
            // We use concatenation and slice for padding
            let padding = '00000000';
            let paddedValue = (padding + stringValue).slice(-padding.length);
            hexCodes.push(paddedValue);
        }
        // Join all the hex strings into one
        return hexCodes.join("");
    }
}
exports.DataConvertionCalculations = DataConvertionCalculations;
