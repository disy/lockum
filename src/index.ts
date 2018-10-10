import { Sender } from "./Sender"
import { Receiver } from "./Receiver"

let sender = new Sender()
let receiver = new Receiver()

export function encrypt(latitude: number, longitude: number, message: string, toleranceDistance: number) {
  return sender.encryptMessage(latitude, longitude, message, toleranceDistance)
}

export function decrypt(latitude: number, longitude: number, ciphertext: string, saltBytes: Uint8Array,
  ivBytes: Uint8Array, toleranceDistance: number, originalHash: string ) {
  return receiver.decryptMessage(latitude, longitude, ciphertext,saltBytes,ivBytes,toleranceDistance,originalHash)
}









