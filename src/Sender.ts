import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";
import { DataConvertionCalculations } from "./DataConvertionCalculations";
import { TextEncoder } from "text-encoding";


export class Sender {

    constructor() {
    }

    public encryptMessage(latitude: [string, number], longitude: [string, number], message: string, toleranceDistance: number) {

        //prepare salt,iv
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16))
        const salt = window.crypto.getRandomValues(new Uint8Array(32))
        //save salt,IV,tolerance Distance to browser so that receiver can use them
        const saltArray = Array.from(salt)
        const ivBytesArray = Array.from(ivBytes)
        const storedSalt = JSON.stringify(saltArray)
        const storedivBytesArray = JSON.stringify(ivBytesArray)
        localStorage.setItem("salt", storedSalt)
        localStorage.setItem("iv", storedivBytesArray)
        localStorage.setItem("toleranceDistance", JSON.stringify(toleranceDistance))

        //create keyderivation input with location
        let location = new Location(latitude, longitude, toleranceDistance)
        let locationInput = location.prepareSenderLocationInput()

        //encrypt the message
        let encryptionTool = new EncryptionHelper(salt, ivBytes)
        let ciphertext = encryptionTool.encrypt(locationInput, message)
        ciphertext.then(function (ciphertextResult) {
            localStorage.setItem("keyhash", ciphertextResult[0])
        })

        return ciphertext
    }
}