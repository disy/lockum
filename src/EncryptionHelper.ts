import {DataConvertionCalculations} from "../src/DataConvertionCalculations";
import {saltCreator} from "random-token"
import { AsyncFunc } from "mocha";


export class EncryptionHelper {

    salt: string;
    ivBytes: Uint8Array = new Uint8Array(16);
    
    constructor (salt: string,iv: Uint8Array) {
        this.salt = salt;
        this.ivBytes = new Uint8Array(iv);
    }
    
 

    public deriveKey (locationInfo: number) {
        let numbefOfIterations = 1000000;
        let saltBytes = DataConvertionCalculations.stringToByteArray(this.salt);
        let locationInfoBytes = DataConvertionCalculations.stringToByteArray(locationInfo);

        return window.crypto.subtle.importKey(
            "raw",
            locationInfoBytes,
            {name:"PBKDF2",  hash: "SHA-1", length: 256},
            false,
            ["deriveKey"]
        ).then(function(baseKey){
            return window.crypto.subtle.deriveKey(
                {name:"PBKDF2",salt: saltBytes,iterations:numbefOfIterations,hash: "SHA-1"},
                baseKey,
                {name:"AES-CBC",length:256},
                false,
                ["encrypt","decrypt"]
            );
        })
    }

    public encrypt() {          
        let locationField =  <HTMLTextAreaElement>document.getElementById("locationField");
        let locationText = parseInt(locationField.value);
        var context = this;

        this.deriveKey(locationText
        ).then(function(aesKey){
            let plainTextField =  <HTMLTextAreaElement>document.getElementById("messageToEncrypt");
            let plainText = plainTextField.value;
            let plainTextBytes = DataConvertionCalculations.stringToByteArray(plainText);
            
            window.crypto.subtle.encrypt(
                {name: "AES-CBC", iv: context.ivBytes},
                aesKey,
                plainTextBytes,               
            ).then(function(cipherTextBuffer){
                let ciphertextBytes = new Uint8Array(cipherTextBuffer);
                let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                let ciphertextField =  <HTMLTextAreaElement>document.getElementById("ciphertextArea");
                ciphertextField.value = base64Ciphertext;
            })

        }) 
        
        
    }

    public decrypt() {
        let locationField =  <HTMLTextAreaElement>document.getElementById("locationField");
        let locationText = parseInt(locationField.value);
        var context = this;
        
        this.deriveKey(locationText
        ).then(function(aesKey){
            let ciphertextField =  <HTMLTextAreaElement>document.getElementById("ciphertextArea");
            let ciphertextBase64String = ciphertextField.value;
            let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(ciphertextBase64String);
            window.crypto.subtle.decrypt(
                {name:"AES-CBC",iv: context.ivBytes},
                aesKey,
                ciphertextBytes
            ).then(function(plainTextBuffer){
                let plainTextBytes = new Uint8Array(plainTextBuffer);
                let plaintextString = DataConvertionCalculations.byteArrayToString(plainTextBytes);
                let keyField =  <HTMLTextAreaElement>document.getElementById("keyinputarea");
                keyField.value = plaintextString;
                console.log("sonuc" + plaintextString);
            })
        })
    }
}
