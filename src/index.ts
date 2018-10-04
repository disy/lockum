import { Sender } from "./Sender"
import { Receiver } from "./Receiver"

let sender = new Sender()
let receiver = new Receiver()

export function encrypt(latitude: [string, number], longitude: [string, number], message, toleranceDistance: number) {
  return sender.encryptMessage(latitude, longitude, message, toleranceDistance)
}

export function decrypt(latitude: [string, number], longitude: [string, number], ciphertext) {
  return receiver.decryptMessage(latitude, longitude, ciphertext)
}









