import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";

export class Receiver {

    constructor() {

    }

    public decryptMessage(latitude: [string, number], longitude: [string, number], ciphertext: string) {
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

        //create location inputs(locations with adjacent quadrants)
        let location = new Location(latitude, longitude,toleranceDistance)
        let locationInputs = location.prepareReceiverLocationInputs()

        let encryptionTool = new EncryptionHelper(saltBytes, ivBytes)

        let possibleLocation1 = encryptionTool.decrypt(locationInputs[0],ciphertext,originalHash)
        let possibleLocation2 = encryptionTool.decrypt(locationInputs[1],ciphertext,originalHash)
        let possibleLocation3 = encryptionTool.decrypt(locationInputs[2],ciphertext,originalHash)
        let possibleLocation4 = encryptionTool.decrypt(locationInputs[3],ciphertext,originalHash)
        let possibleLocation5 = encryptionTool.decrypt(locationInputs[4],ciphertext,originalHash)
        let possibleLocation6 = encryptionTool.decrypt(locationInputs[5],ciphertext,originalHash)
        let possibleLocation7 = encryptionTool.decrypt(locationInputs[6],ciphertext,originalHash)
        let possibleLocation8 = encryptionTool.decrypt(locationInputs[7],ciphertext,originalHash)
        let possibleLocation9 = encryptionTool.decrypt(locationInputs[8],ciphertext,originalHash)

        return Promise.all([possibleLocation1,possibleLocation2,possibleLocation3,possibleLocation4,possibleLocation5,possibleLocation6
            ,possibleLocation7,possibleLocation8,possibleLocation9])
    }
}