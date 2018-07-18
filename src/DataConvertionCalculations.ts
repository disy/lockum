import {TextEncoder,TextDecoder} from 'text-encoding'
export class DataConvertionCalculations {

    public static  byteArrayToHexString (byteArray) {
        let hexString = '';
        let nextHexByte;
        for (let i=0; i<byteArray.byteLength; i++) {
            nextHexByte = byteArray[i].toString(16);    // Integer to base 16
            if (nextHexByte.length < 2) {
                nextHexByte = "0" + nextHexByte;        // Otherwise 10 becomes just a instead of 0a
            }
            hexString += nextHexByte;
        }
        return hexString;
    }
    
    public static hexStringToByteArray (hexString) {
        if (hexString.length % 2 !== 0) {
            throw "Must have an even number of hex digits to convert to bytes";
        }
        let numBytes = hexString.length / 2;
        let byteArray = new Uint8Array(numBytes);
        for (let i=0; i<numBytes; i++) {
            byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
        }
        return byteArray;
    }
    
    public static byteArrayToBase64 (byteArray) {
        let binaryString = "";
        for (let i=0; i<byteArray.byteLength; i++){
            binaryString += String.fromCharCode(byteArray[i]);
        }
        let base64String = window.btoa(binaryString);
        return base64String;
    }
    
    public static base64ToByteArray (base64String) {
        let binaryString = window.atob(base64String);
        let byteArray = new Uint8Array(binaryString.length);
        for (let i=0; i<binaryString.length; i++){
            byteArray[i] += binaryString.charCodeAt(i);
        }
        return byteArray;
    }
    
    public static byteArrayToString (byteArray) {
        if ("TextDecoder" in window) {
           // let decoder = new TextEncoding.TextDecoder();
           // return decoder.decode(byteArray);
            return new TextDecoder().decode(byteArray);
        }
    
        // Otherwise, fall back to 7-bit ASCII only
        let result = "";
        for (let i=0; i<byteArray.byteLength; i++){
            result += String.fromCharCode(byteArray[i])
        }
        return result;
    }
    
    public static stringToByteArray (s) {
        if ("TextEncoder" in window) {
        
         //  let encoder = new TextEncoder;
         //  return encoder.encode(s);
           return new TextEncoder().encode(s);
        }
    
        // Otherwise, fall back to 7-bit ASCII only
        let result = new Uint8Array(s.length);
        for (let i=0; i<s.length; i++){
            result[i] = s.charCodeAt(i);
        }
        return result;
    }

    

}