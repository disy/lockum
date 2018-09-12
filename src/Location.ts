import { LocationHelper } from "./LocationHelper";

export class Location {
    private latitude: number;
    private longitude: number;

    constructor(latitude: number, longitude: number) {
       this.latitude = parseFloat(latitude.toFixed(7));
       this.longitude = parseFloat(longitude.toFixed(7));
    }
   
    public createLocationKeyMaterial(toleranceDistance: number) {     
      let locationKeyMaterial = LocationHelper.calculateLocationKeyMaterial(this.latitude,this.longitude, toleranceDistance);
      return locationKeyMaterial   
    }
}
