import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";

export class Sender {

    constructor() {
    }

    public encryptMessage(latitude: [string, number], longitude: [string, number], message: string, toleranceDistance: number) {

        //prepare salt,iv
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16))
        const salt = window.crypto.getRandomValues(new Uint8Array(32))
        console.log("salt sender:"+salt)
        console.log("ivBytes sender:" + ivBytes)
        //save salt,IV,tolerance Distance to browser so that receiver can use them
      
        //create keyderivation input with location
        let location = new Location(latitude, longitude, toleranceDistance)
        let locationInput = location.prepareSenderLocationInput()

        //encrypt the message
        let encryptionTool = new EncryptionHelper(salt, ivBytes)
        let ciphertext = encryptionTool.encrypt(locationInput, message)

        return ciphertext
    }
}