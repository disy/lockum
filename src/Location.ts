import { LocationHelper } from "./LocationHelper";

export class Location{
    private latitude;
    private longitude;
    private degreesDecimalMinutes: Array<string> = [];

    constructor(latitude: number, longitude: number) {
       this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
   
    /**
     * this function is a temporary test function for now, only to get decimal degrees data and convert it into a Degrees Decimal Minutes Form
     */
    public getCurrentLocation(toleranceDistance: number) {
      
      this.degreesDecimalMinutes = LocationHelper.decimalDegreesToDMS(this.latitude,this.longitude);
      LocationHelper.finalLocationOutput(this.degreesDecimalMinutes,toleranceDistance);    
      console.log("deneme322: "+ LocationHelper.finalLocationOutput(this.degreesDecimalMinutes,toleranceDistance));    
    }
}
