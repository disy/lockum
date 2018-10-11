import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";

export class Receiver {

    constructor() {

    }

    /**
     * @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
     * @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
     * @returns a promise that returns plain text and calculated keyhash
     */
    public async decryptMessage(locationInfo: [number, number, number], decryptionElements: [Uint8Array, Uint8Array, string, string]) {

        let latitude = locationInfo[0]
        let longitude = locationInfo[1]
        let toleranceDistance = locationInfo[2]

        let saltBytes = decryptionElements[0]
        let ivBytes = decryptionElements[1]
        let ciphertext = decryptionElements[2]
        let originalHash = decryptionElements[3]

        //create location inputs(locations with adjacent quadrants)
        let location = new Location(latitude, longitude, toleranceDistance)
        let keyderivationInputs = location.getAdjacentQuadrants()

        let encryptionTool = new EncryptionHelper(saltBytes, ivBytes)

        for (let i = 0; i <= keyderivationInputs.length - 1; i++) {
            let result = await Promise.resolve(encryptionTool.decrypt(keyderivationInputs[i], ciphertext, originalHash))

            if (result != undefined) {
                return result
            } else if (i == keyderivationInputs.length - 1 && result == undefined) {
                return Promise.reject("you are not in the correct location")
            }
        }
    }
}

