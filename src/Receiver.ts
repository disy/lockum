import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import {DataConvertionCalculations} from "../src/DataConvertionCalculations";

export class Receiver {

    constructor(readonly latitude: number, readonly longitude: number){

    }

    public decryptMessage() {
         let salt = JSON.parse(localStorage.getItem("salt"));

         const str = localStorage.getItem("alal")
         const retrievedArr = str && JSON.parse(str)
         const retrievedTypedArray = new Uint8Array(retrievedArr)

         const str2 = localStorage.getItem("saltal")
         const retrievedArr2 = str && JSON.parse(str2)
         const retrievedTypedArray2 = new Uint8Array(retrievedArr2)
         
       

         let locationMaterial = JSON.parse(localStorage.getItem("readyLocation"));
         let ciphertextField = <HTMLTextAreaElement>document.getElementById("ciphertextArea");
         let ciphertext = ciphertextField.value
        
         let encryptionTool = new EncryptionHelper(retrievedTypedArray2,retrievedTypedArray);
         encryptionTool.decrypt(ciphertext,locationMaterial);

    }

}