export class LocationHelper{

   //this is the main function which gets the current latitude and longitude values in the form of decimal degrees 
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

    public decimalDegreesToDMSCalculator (locationvalue: number,isLatitude: boolean) {
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

    /**
     * this function gets the location information and produces the binary representation of location datas
     * this binary representation will be used as an input for an expensive key derivation algorithm
     * 
     * @param locationValues represents the array consisting of latitude and longitude information
     * @param toleranceDistance represents the desired encryption distance for the location information 
     */
    public binaryLocationRepresentator(locationValues: Array<string>,toleranceDistance: number) {
      /*  console.log(this.binaryLatitudeLongitudeSignCalculator(locationValues[0])+ this.toleraceDistanceCalculator(locationValues[0],true,5)+locationValues[0]
        + this.toleraceDistanceCalculator(locationValues[0],false,5) + this.binaryLatitudeLongitudeSignCalculator(locationValues[1])); */


        return this.binaryLatitudeLongitudeSignCalculator(locationValues[0])+ this.toleraceDistanceCalculator(locationValues[0],true,5)

          + this.binaryLatitudeLongitudeSignCalculator(locationValues[1] + this.toleraceDistanceCalculator(locationValues[1],false,5));
    }

    /**
     * This method takes the location, multiplies it by 10.000 and then divides it by toleranceDistance*CorrespondingValue
     * 
     * @param locationValue indicates the latitude or longitutde value to be calculated by desired tolerance distance
     * @param latitudeValue there are two different values when tolerance value is processed, therefore this variable
     *  is used to check if its latitude or longitude
     * @param toleranceDistance represents the desired encryption distance for the location information 
     */
    public toleraceDistanceCalculator(locationValue: string,latitudeValue: boolean,toleranceDistance) {
        locationValue = locationValue.substring(1).slice(0,-1);
        let location = parseFloat(locationValue); 
        location = location * 10000;

        if (latitudeValue)
            location = location / (toleranceDistance * 5.4);
        else
            location = location / (toleranceDistance*6);

            location = Math.floor(location);
 
        return locationValue;
    }

    public binaryLatitudeLongitudeSignCalculator (locationValue: string) {
        if (locationValue.substring(0,1) == "E") {
            return 0;
        }

        else if (locationValue.substring(0,1) == "W") {
            return 1;
        }

        else if (locationValue.substring(0,1) == "N") {
            return 0;
        }

        else if (locationValue.substring(0,1) == "S") {
            return 1;
        }
    }

}