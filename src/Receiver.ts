import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import {DataConvertionCalculations} from "../src/DataConvertionCalculations";



export class Receiver {

    private locationOfTheSender;
    private toleranceDistance = 5;
    private latitude;
    private longitude; 
    private cipherText;

    private  EncryptionTool;



    constructor (latitude: number, longitude: number,cipherText: string) {
        this.latitude = latitude
        this.longitude = longitude
        this.cipherText = cipherText;
    }

    public decrypt() {
        let ciphertextField =  <HTMLTextAreaElement>document.getElementById("ciphertextArea");
        this.cipherText = ciphertextField.value
        this.locationOfTheSender = new Location(this.latitude,this.longitude).getCurrentLocation(this.toleranceDistance);
        var sharedPreferences = JSON.parse(localStorage.getItem('package')) 
        console.log("ikinci taraf: "+sharedPreferences);
        this.EncryptionTool = new EncryptionHelper(sharedPreferences[0],sharedPreferences[1])
        this.EncryptionTool.decrypt(this.cipherText)    
    }n
}