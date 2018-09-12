import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";


export class Sender {

    private locationOfTheSender;
    private toleranceDistance = 5;
    private latitude;
    private longitude; 
    private message;
    private  EncryptionTool;

    constructor (latitude: number, longitude: number,message: string) {
        this.latitude = latitude
        this.longitude = longitude
        this.message = message;
    }

    public encryptTheMessage() {
        this.locationOfTheSender = new Location(this.latitude,this.longitude).getCurrentLocation(this.toleranceDistance);
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        this.EncryptionTool = new EncryptionHelper(salt,ivBytes)
        this.EncryptionTool.encrypt(this.message);
    }
}