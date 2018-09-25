import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import {DataConvertionCalculations} from "../src/DataConvertionCalculations";

export class Receiver {

    constructor(readonly latitude: number, readonly longitude: number){

    }

    public decryptMessage() {
        //get salt 
        const salt = localStorage.getItem("salt")
        const retrievedSaltArray = JSON.parse(salt)
        const saltBytes = new Uint8Array(retrievedSaltArray)

        //get iv
        const iv = localStorage.getItem("iv")
        const retrievedIvArray = JSON.parse(iv)
        const ivBytes = new Uint8Array(retrievedIvArray)

        //get tolerance distance
        let toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance"))) 
        
        //create location inputs(locations with adjacent quadrants)
        let rawLocation = new Location(this.latitude,this.longitude)
        let locationKeyMaterials = rawLocation.createLocationKeyMaterials(toleranceDistance)

        //get ciphertext
        let ciphertextField = <HTMLTextAreaElement>document.getElementById("messageToDecrypt")
        let ciphertext = ciphertextField.value
        
        //decrypt the message
        let encryptionTool = new EncryptionHelper(saltBytes,ivBytes)
        encryptionTool.decrypt(locationKeyMaterials,ciphertext)
    }
}