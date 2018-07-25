import { Location } from "./Location";
import { LocationHelper } from "./LocationHelper";

export class Sender {

    private  locationOfTheSender;
    private  messageToEncrypt;
    private  toleranceDistance = 5;

    constructor (latitude: number, longitude: number) {
       this.locationOfTheSender = new Location(latitude,longitude).getCurrentLocation(this.toleranceDistance);
    }

    public getCurrentLocation() {
        return this.locationOfTheSender;
    }

}