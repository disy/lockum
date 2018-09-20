import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import { DataConvertionCalculations } from "./DataConvertionCalculations";
import { TextEncoder } from "text-encoding";


export class Sender {

    constructor (readonly latitude: number, readonly longitude: number, readonly message: string, readonly toleranceDistance: number) {
    }

    public encryptMessage() {
        //prepare salt,iv and location, then encrypt the message
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16))
        const salt = window.crypto.getRandomValues(new Uint8Array(32))
        let rawLocation = new Location(this.latitude,this.longitude)
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(this.toleranceDistance)
        let encryptionTool = new EncryptionHelper(salt,ivBytes)
        encryptionTool.encrypt(locationKeyMaterial,this.message)

        //save salt,IV,tolerance Distance, readyLocation to browser
        const saltArray = Array.from(salt)
        const ivBytesArray = Array.from(ivBytes)

        const storedSalt = JSON.stringify(saltArray)
        const storedivBytesArray = JSON.stringify(ivBytesArray)

        localStorage.setItem("salt",storedSalt)
        localStorage.setItem("iv",storedivBytesArray)
    
        localStorage.setItem("toleranceDistance",JSON.stringify(this.toleranceDistance))
        localStorage.setItem("readyLocation",JSON.stringify(locationKeyMaterial))
    }
}