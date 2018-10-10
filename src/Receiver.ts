import { Location } from "./Location";
import { EncryptionHelper } from "../src/EncryptionHelper";

export class Receiver {

    constructor() {

    }

    public decryptMessage(latitude: number, longitude: number, ciphertext: string, saltBytes: Uint8Array,
         ivBytes: Uint8Array, toleranceDistance: number, originalHash: string ) {
            
        //create location inputs(locations with adjacent quadrants)
        let location = new Location(latitude, longitude, toleranceDistance)
        let locationInputs = location.prepareReceiverLocationInputs()

        let encryptionTool = new EncryptionHelper(saltBytes, ivBytes)

        let promises = []
        for (let i = 0; i <= locationInputs.length - 1; i++) {

            promises.push(Promise.resolve(encryptionTool.decrypt(locationInputs[i], ciphertext, originalHash))
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