import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";
import { DataConvertionCalculations } from "../src/DataConvertionCalculations";

export class Receiver {

    constructor() {

    }

    public decryptMessage(latitude:number, longitude: number , ciphertext: string) {
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

        //get original keyHash
        let originalHash = localStorage.getItem("keyhash")
        console.log("keyhash comes true:"+originalHash)

        //create location inputs(locations with adjacent quadrants)
        let rawLocation = new Location(latitude, longitude)
        let locationKeyMaterials = rawLocation.createLocationKeyMaterials(toleranceDistance)

        //decrypt the message
        let encryptionTool = new EncryptionHelper(saltBytes, ivBytes)
        console.log("ciperhext comes true:",ciphertext)
        return encryptionTool.decrypt("201335851134234394", ciphertext,originalHash)
    }
}