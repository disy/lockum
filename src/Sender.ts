import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";


export class Sender {

    private  locationOfTheSender;
    private  messageToEncrypt;
    private  toleranceDistance = 5;
    private  salt:string = "allo";
    private  ivBytes;  
 

    private  EncryptionTool;

    constructor (latitude: number, longitude: number) {
       this.locationOfTheSender = new Location(latitude,longitude).getCurrentLocation(this.toleranceDistance);
    }

    private getCurrentLocation() {
        return this.locationOfTheSender;
    }

    public encryptTheMessage() {

        this.ivBytes = window.crypto.getRandomValues(new Uint8Array(16)); 
        this.EncryptionTool = new EncryptionHelper(this.salt,this.ivBytes);
        this.EncryptionTool.encrypt();
       
    }

    public decryptMessage() {
        
    }
}