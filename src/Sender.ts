import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";


export class Sender {

    constructor (readonly latitude: number, readonly longitude: number, readonly message: string, readonly toleranceDistance: number) {
    }

    public encryptMessage() {
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(32));
        let rawLocation = new Location(this.latitude,this.longitude); 
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(this.toleranceDistance);
        let encryptionTool = new EncryptionHelper(salt,ivBytes);
        encryptionTool.encrypt(locationKeyMaterial,this.message);
        
        localStorage.setItem("salt",JSON.stringify(salt.toString()))
        localStorage.setItem("iv",JSON.stringify(ivBytes.toString()))
        console.log("uzunluk:"+JSON.stringify(ivBytes.length))
        console.log("values:"+ivBytes);
        localStorage.setItem("toleranceDistance",JSON.stringify(this.toleranceDistance))
        localStorage.setItem("readyLocation",JSON.stringify(locationKeyMaterial))
      //  localStorage.setItem("deneme",JSON.stringify(salt.toString()));
      //  let ahmetahmet = JSON.parse(localStorage.getItem("deneme"));
    }
}