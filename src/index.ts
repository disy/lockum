import { Sender } from "./Sender"
import { Receiver } from "./Receiver"

let sender = new Sender()
let receiver = new Receiver()

/**
* @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
* @param message refers to plain text that will be encrypted
* @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
*/
export function encrypt(locationInfo: [number, number, number], message: string) {
  return sender.encryptMessage(locationInfo, message)
}

/**
* @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
* @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
* @returns a promise with plain text and calculated keyhash
*/
export function decrypt(locationInfo: [number, number, number], decryptionElements: [Uint8Array, Uint8Array, string, string]) {
  return receiver.decryptMessage(locationInfo, decryptionElements)
}









