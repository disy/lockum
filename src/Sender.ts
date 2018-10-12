import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";

export class Sender {

    constructor() {
    }

    /**
     * @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
     * @param message refers to plain text that will be encrypted
     * @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
     */
    public encryptMessage(locationInfo: [number, number, number], message: string) {

        let latitude = locationInfo[0]
        let longitude = locationInfo[1]
        let toleranceDistance = locationInfo[2]

        //prepare salt,iv
        const ivBytes = crypto.getRandomValues(new Uint8Array(16))
        const salt = crypto.getRandomValues(new Uint8Array(32))
        //save salt,IV,tolerance Distance to browser so that receiver can use them

        //create keyderivation input with location
        let location = new Location(latitude, longitude, toleranceDistance)

        //prepare the key derivation function's input
        let keyDerivationInput = location.getTransformedLocation()

        //encrypt the message
        let encryptionTool = new EncryptionHelper(salt, ivBytes)
        let ciphertext = encryptionTool.encrypt(keyDerivationInput, message, toleranceDistance)

        return ciphertext
    }
}