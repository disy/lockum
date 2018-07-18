import {DataConvertionCalculations} from "../src/DataConvertionCalculations";

export class EncryptionHelper {
    


    public EncryptionHelper () {

    }

    public static deriveKey () {
        window.crypto.subtle.generateKey (
            {name: "AES-CBC", length: 256},
            true,
            ["encrypt","decrypt"]
        ).then (function (key) {
            return window.crypto.subtle.exportKey (
                "raw",
                key
            );
        }). then (function (buf) {
            let byteArray = new Uint8Array(buf);
            let keyField = <HTMLTextAreaElement>document.getElementById("keyinputarea");
            keyField.value = DataConvertionCalculations.byteArrayToHexString(byteArray);
        })
    }

    public static encrypt() {
        let keyField =  <HTMLTextAreaElement>document.getElementById("keyinputarea");
        let hexString = keyField.value;
        console.log("valuemiz: " + hexString);
        let keyBytes = DataConvertionCalculations.hexStringToByteArray(hexString);
        let plainTextField =  <HTMLTextAreaElement>document.getElementById("messageToEncrypt");
        let plainText = plainTextField.value;
        let plainTextBytes = DataConvertionCalculations.stringToByteArray(plainText);
        
        window.crypto.subtle.importKey(
            "raw", keyBytes, {name: "AES-CBC", hash: "SHA-1", length: 256 }, true, ["encrypt"]
        ).then (function (key){
            let iv = window.crypto.getRandomValues(new Uint8Array(16));
            let ivField =  <HTMLTextAreaElement>document.getElementById("iterationField");
            let ivHexString = DataConvertionCalculations.byteArrayToHexString(iv);
            ivField.value = ivHexString;

            //we use cryptokey to encrypt the plaintext

            return window.crypto.subtle.encrypt(
                {name: "AES-CBC", iv: iv},
                key,
                plainTextBytes
            );
        }).then(function(ciphertextBuf){

            let ciphertextBytes = new Uint8Array(ciphertextBuf);
            let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
            let ciphertextField =  <HTMLTextAreaElement>document.getElementById("ciphertextArea");
            ciphertextField.value = base64Ciphertext;
        })
    }

    public static decrypt() {
        //we start by getting the key,ıv and cipher text into byte arrays

        let keyField =  <HTMLTextAreaElement>document.getElementById("keyinputarea");
        let keyHexString = keyField.value;
        let keyBytes = DataConvertionCalculations.hexStringToByteArray(keyHexString);
        let ivField =  <HTMLTextAreaElement>document.getElementById("iterationField");
        let ivHexString = ivField.value;
        let ivBytes = DataConvertionCalculations.hexStringToByteArray(ivHexString);

        var ciphertextField =  <HTMLTextAreaElement>document.getElementById("ciphertextArea");
        let ciphertextBase64String = ciphertextField.value;
        let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(ciphertextBase64String);

          // Make a CryptoKey from the Key string
    window.crypto.subtle.importKey(
        "raw",
        keyBytes,
        {name: "AES-CBC", hash: "SHA-1", length: 256},
        false,
        ["decrypt"]
    ).then(function(key){
        // Use the CryptoKey and IV to decrypt the plaintext
        return window.crypto.subtle.decrypt(
            {name: "AES-CBC", iv: ivBytes},
            key,
            ciphertextBytes
        );
    }).then(function(plaintextBuf){
        let plainTextBytes = new Uint8Array(plaintextBuf);
        let plaintextString = DataConvertionCalculations.byteArrayToString(plainTextBytes);
        let keyField =  <HTMLTextAreaElement>document.getElementById("keyinputarea");
        keyField.value = plaintextString;
    }) }
}
