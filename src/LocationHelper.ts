export class LocationHelper{

   //this function gets the current latitude and longitude values in the form of decimal degrees 
    //and returns them as degrees decimal minutes form
     public decimalDegreesToDMS(latitude: number, longitude: number) {
        let degreesDecimalMinutes: Array<string> = [];
        let dmsLatitude;
        let dmsLongitude; 
        if( latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }
     
        //Dms stands for degrees minutes seconds 
        dmsLatitude =this.decimalDegreesToDMSCalculator(latitude,true)
        dmsLongitude=this.decimalDegreesToDMSCalculator(longitude,false)
       
        degreesDecimalMinutes= this.dmsToDegreesDecimalMinutes(dmsLatitude,dmsLongitude);
        console.log(degreesDecimalMinutes);
        return degreesDecimalMinutes;

    }

     //this function gets the latitude and longitude values in the form of degrees minutes and seconds
    //then returns them as degrees decimal minutes.
     public dmsToDegreesDecimalMinutes (latitude: Array<string>, longitude: Array<string>) {
        let degreesDecimalMinutes: Array<any> = [];

        if( latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }
        
        degreesDecimalMinutes[0] = (this.dmsToDegreesDecimalMinutesCalculator(latitude));
        degreesDecimalMinutes[1] = (this.dmsToDegreesDecimalMinutesCalculator(longitude));

        return degreesDecimalMinutes;

    }

    public decimalDegreesToDMSCalculator(locationvalue: number,isLatitude: boolean){
        let dmsInformation: Array<string> = [];
        let integer;
        let minutes;
        let seconds;
        let locationSign;
        let latitudeInformation = isLatitude;

        if(latitudeInformation &&  locationvalue < 0) {
            locationSign  = "S";
        }
        else if( latitudeInformation &&  locationvalue > 0 ){
            locationSign  = "N";
        }
        else if(latitudeInformation == false && locationvalue < 0){
            locationSign  = "W";
        }
        else if(latitudeInformation == false && locationvalue > 0){
            locationSign  = "E";

        }
        integer = Math.floor(locationvalue);
        minutes = Math.floor((locationvalue-integer)*60);
        seconds = (((locationvalue-integer)*60-minutes)*60).toFixed(4);

        dmsInformation[0] = locationSign;
        dmsInformation[1] = integer;
        dmsInformation[2] = minutes;
        dmsInformation[3] = seconds;

        return dmsInformation;
    }
    
    public dmsToDegreesDecimalMinutesCalculator(locationInfo: Array<string>){
        let locationSign = locationInfo[0];
        let degrees = locationInfo[1]
        let decimalMinutes = +locationInfo[2] +  +(+locationInfo[3] / 60).toFixed(4);
        let degreesDecimalMinutes = locationSign + degrees + decimalMinutes;
        
        return degreesDecimalMinutes;

    }

}