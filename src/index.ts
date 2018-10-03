import { Sender } from "./Sender"
import { Receiver } from "./Receiver"

let sender = new Sender() 
let receiver = new Receiver()

export function encrypt(latitude,longitude,message,toleranceDistance) {
  return sender.encryptMessage(latitude, longitude, message, toleranceDistance)
}

export function decrypt(latitude,longitude,ciphertext) {
  return receiver.decryptMessage(latitude,longitude,ciphertext)
}








