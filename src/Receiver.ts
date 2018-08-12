import { Location } from "./Location";
import {EncryptionHelper} from "../src/EncryptionHelper";
import {DataConvertionCalculations} from "../src/DataConvertionCalculations";



export class Receiver {

    private  locationOfTheSender;
    private  toleranceDistance = 5;
    private salt = localStorage.getItem('salt');

  //  EncryptionTool = new EncryptionHelper(this.salt,DataConvertionCalculations.stringToByteArray(localStorage.getItem('iv')));

    constructor (latitude: number, longitude: number) {
       this.locationOfTheSender = new Location(latitude,longitude).getCurrentLocation(this.toleranceDistance);
    }

    private getCurrentLocation() {
        return this.locationOfTheSender;
    }

    public decryptMessage() {
        

    //   this.EncryptionTool.decrypt();   

    }

}