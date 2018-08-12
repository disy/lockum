import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";


export class Sender {

    private  locationOfTheSender;
    private  messageToEncrypt;
    private  toleranceDistance = 5;
    private  latitude;
    private longitude; 
 

    private  EncryptionTool;

    constructor (latitude: number, longitude: number) {
        this.latitude = latitude
        this.longitude = longitude
    }

    public encryptTheMessage() {
        this.locationOfTheSender = new Location(this.latitude,this.longitude).getCurrentLocation(this.toleranceDistance);
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(16)); 
        this.EncryptionTool = new EncryptionHelper(salt,ivBytes)
        this.EncryptionTool.encrypt();
    }
}