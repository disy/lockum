import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import {DataConvertionCalculations} from "../src/DataConvertionCalculations";

export class Receiver {

    constructor(readonly latitude: number, readonly longitude: number){

    }

    public decryptMessage() {
         let salt = JSON.parse(localStorage.getItem("salt"));
         let iv: Uint8Array =  JSON.parse(localStorage.getItem("iv").toString());
         console.log(iv.toString().split(",")[2])
         let ivBytes: Uint8Array = new Uint8Array(16)
         for(let i = 0 ; i <=15 ;i++) {
              ivBytes[i] = parseInt(iv.toString().split(",")[i])
         }
         let locationMaterial = JSON.parse(localStorage.getItem("readyLocation"));
         let ciphertextField = <HTMLTextAreaElement>document.getElementById("ciphertextArea");
         let ciphertext = ciphertextField.value
        
         let encryptionTool = new EncryptionHelper(salt,ivBytes);
         encryptionTool.decrypt(ciphertext,locationMaterial);

    }

}