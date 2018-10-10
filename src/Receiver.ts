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
    public decryptMessage(locationInfo: [number, number, number], decryptionElements: [Uint8Array, Uint8Array, string, string]) {

        let latitude =  locationInfo[0]
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

        let promises = []
        for (let i = 0; i <= keyderivationInputs.length - 1; i++) {

            promises.push(Promise.resolve(encryptionTool.decrypt(keyderivationInputs[i], ciphertext, originalHash))
                .catch((error) => null));
        }

        return Promise.all(promises).then((results) => {
            for (let index = 0; index <= results.length - 1; index++) {
                if (results[index] != undefined) {
                    //return plain text promise and key hash
                    return results[index]
                }
            }
        });
    }
}

