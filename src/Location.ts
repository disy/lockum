import { LocationHelper } from "./LocationHelper";

export class Location{
       private latitude;
       private longitude;
       private latitudeDMS: string[];
       private longitudeDMS: string[];
       private locationHelper = new LocationHelper();
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }

    

    getCurrentLocation() : string {
      this.locationHelper.decimalDegreesToDMS(this.latitude,this.longitude);
      return this.latitude+ " "+ this.longitude;
    } 
  
}
