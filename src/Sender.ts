import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";
import { DataConvertionCalculations } from "./DataConvertionCalculations";
import { TextEncoder } from "text-encoding";


export class Sender {

    constructor() {
    }

    public encryptMessage(latitude: number, longitude: number, message: string, toleranceDistance: number) {
        //prepare salt,iv
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16))
        const salt = window.crypto.getRandomValues(new Uint8Array(32))

        //get the raw location and include tolerance distance
        let rawLocation = new Location(latitude, longitude)
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(toleranceDistance)

        //encrypt the message
        let encryptionTool = new EncryptionHelper(salt, ivBytes)

        //save salt,IV,tolerance Distance to browser so that receiver can use them
        const saltArray = Array.from(salt)
        const ivBytesArray = Array.from(ivBytes)
        const storedSalt = JSON.stringify(saltArray)
        const storedivBytesArray = JSON.stringify(ivBytesArray)
        localStorage.setItem("salt", storedSalt)
        localStorage.setItem("iv", storedivBytesArray)
        localStorage.setItem("toleranceDistance", JSON.stringify(toleranceDistance))


        let ciphertext = encryptionTool.encrypt(locationKeyMaterial, message)
        ciphertext.then(function (ahmet) {
            localStorage.setItem("keyhash", ahmet[0])
        })

        return ciphertext

    }
}