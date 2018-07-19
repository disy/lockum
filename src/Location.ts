import { LocationHelper } from "./LocationHelper";

export class Location{
    private latitude;
    private longitude;
    private toleranceDistance;
    private degreesDecimalMinutes: Array<string> = [];
    private LocationHelper = new LocationHelper();

    constructor(latitude: number, longitude: number) {
       this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }
   
    /**
     * this function is a temporary test function for now, only to get decimal degrees data and convert it into a Degrees Decimal Minutes Form
     */
    public getCurrentLocation() : string {
      
      this.degreesDecimalMinutes = this.LocationHelper.decimalDegreesToDMS(this.latitude,this.longitude);
      console.log(this.degreesDecimalMinutes);
      this.LocationHelper.finalLocationOutput(this.degreesDecimalMinutes,5);
      return this.latitude+ " "+ this.longitude;
    }
    
}
