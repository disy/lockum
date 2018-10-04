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
                    //saves key hash of the sender into browser to show on html
                    localStorage.setItem("keyhashReceiver", results[index][1])
                    //return plain text promise and key hash
                    return results[index]
                }
            }
        });
    }
}