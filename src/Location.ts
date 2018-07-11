import { LocationHelper } from "./LocationHelper";

export class Location{
    private latitude;
    private longitude;
    private toleranceDistance;
    private degreesDecimalMinutes: Array<string> = [];
    private locationHelper = new LocationHelper();

    constructor(latitude: number, longitude: number) {
       this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
   
    getCurrentLocation() : string {
      
      this.degreesDecimalMinutes = this.locationHelper.decimalDegreesToDMS(this.latitude,this.longitude);
      console.log(this.degreesDecimalMinutes);
      this.locationHelper.binaryLocationRepresentator(this.degreesDecimalMinutes,5);
      return this.latitude+ " "+ this.longitude;
    }
    
}
