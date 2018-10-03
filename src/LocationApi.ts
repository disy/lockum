import { Sender } from "../src/Sender"
import { EncryptionHelper } from "../src/EncryptionHelper"
import { Receiver } from "./Receiver"

let encryptButton = <HTMLButtonElement>document.getElementById("encryptButton")
let decryptButton = <HTMLButtonElement>document.getElementById("decryptButton")


encryptButton.onclick = (e: Event) => {
   encrypt()
};

decryptButton.onclick = (e: Event) => {
  decrypt()
};

export function encrypt() {
  let latitude = 5
  let longitude = 10
  let message = "foo"
  let toleranceDistance = 10

  let sender = new Sender() 
  return sender.encryptMessage(latitude, longitude, message, toleranceDistance)
}

export function decrypt() {
  let latitude = 5
  let longitude = 10
  let message = "foo"
  let toleranceDistance = 10
  let element = <HTMLTextAreaElement>document.getElementById("messageToDecrypt")
  let ciphertext = element.value

  console.log("ciperhtext is:"+ ciphertext)

  let receiver = new Receiver()
  return receiver.decryptMessage(latitude,longitude,ciphertext)
}








