export class Location{
       latitude;
       longitude;
       latitudeDMS: string[];
       longitudeDMS: string[];
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude.toFixed(7);
        this.longitude = longitude.toFixed(7);
    }

    getCurrentLocation() : string {
      this.decimalDegreesToDMS(this.latitude,this.longitude);
      return this.latitude+ " "+ this.longitude;
    }

    //this function gets the current latitude and longitude values in the form of decimal degrees 
    //and returns them as degrees decimal minutes form
    decimalDegreesToDMS(latitude: number , longitude: number) {
        if( latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }
        let degreesDecimalMinutes: Array<string> = [];
        let latitudeSign;
        let longitudeSign;
        let integerLatitude;
        let integerLongitude;
        let minutesLatitude;
        let minutesLongitude;
        let secondsLatitude;
        let secondsLongitude;
        let dmsLatitude;
        let dmsLongitude;
        
        if (latitude < 0 ) {
            latitudeSign = "S";
        } else {
            latitudeSign = "N";
        }

        if ( longitude < 0) {
            longitudeSign = "W";
        } else {
            longitudeSign = "E"
        }

        integerLatitude = Math.floor(latitude);
        integerLongitude = Math.floor(longitude);

        minutesLatitude = Math.floor((latitude-integerLatitude)*60);
        minutesLongitude = Math.floor((longitude-integerLongitude)*60);

        secondsLatitude = (((latitude-integerLatitude)*60-minutesLatitude)*60).toFixed(4);
        secondsLongitude = (((longitude-integerLongitude)*60-minutesLongitude)*60).toFixed(4);

        //Dms stands for degrees minutes seconds 
        dmsLatitude=latitudeSign+"_"+integerLatitude+"_"+minutesLatitude+"_"+secondsLatitude;
        dmsLongitude=longitudeSign+"_"+integerLongitude+"_"+minutesLongitude+"_"+secondsLongitude;
       
        degreesDecimalMinutes= this.DmsToDegreesDecimalMinutes(dmsLatitude,dmsLongitude);
        return degreesDecimalMinutes;

    }
    
    //this function gets the latitude and longitude values in the form of degrees minutes and seconds
    //then returns them as degrees decimal minutes.
    DmsToDegreesDecimalMinutes (latitude: string, longitude: string) {
        if( latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }
        let degreesDecimalMinutes: Array<string> = [];
        let dmsLatitude  = latitude;
        let dmsLongitude = longitude;
        let dmsLatitudeElements: any = dmsLatitude.split("_",4);
        let dmsLongitudeElements: any = dmsLongitude.split("_",4);
        let dmsLatitudeSign = dmsLatitudeElements[0];
        let dmsLongitudeSign = dmsLongitudeElements[0];
        let dmsDegreesLatitude = dmsLatitudeElements[1];
        let dmsDegreesLongitude = dmsLongitudeElements[1];
        let dmsMinutesLatitude = dmsLatitudeElements[2];
        let dmsMinutesLongitude = dmsLongitudeElements[2];
        let dmsSecondsLatitude = (dmsLatitudeElements[3]/60).toFixed(4);
        let dmsSecondsLongitude = (dmsLongitudeElements[3]/60).toFixed(4);
        let dmsrestOfDegreesLatitude = +dmsMinutesLatitude*1 + +dmsSecondsLatitude*1;
        let dmsrestOfDegreesLongitude = +dmsMinutesLongitude*1 + +dmsSecondsLongitude*1;

        console.log(dmsrestOfDegreesLatitude);
        degreesDecimalMinutes.push(dmsLatitudeSign);
        degreesDecimalMinutes.push(dmsDegreesLatitude+dmsrestOfDegreesLatitude);
        degreesDecimalMinutes.push(dmsLongitudeSign);
        degreesDecimalMinutes.push( dmsDegreesLongitude+dmsrestOfDegreesLongitude);

        console.log(degreesDecimalMinutes);
        return degreesDecimalMinutes;

    }

}
