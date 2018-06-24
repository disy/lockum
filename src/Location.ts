export class Location{
       latitude;
       longitude;
       latitudeDMS: string[];
       longitudeDMS: string[];
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getCurrentLocation() : string {
      return Math.floor(this.latitude)+ " "+ Math.floor(this.longitude);
    }

    decimalDegreesToDMS(latitude: number , longitude: number) {
        let integerLatitude;
        let decimalLatitude;
        let integerLongitude;
        let decimalLongitude;
        if (latitude < 0 ) {
            
        }

    }

}
