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

        if(locationvalue < 0) {
            locationvalue = locationvalue * -1;
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
     * this function produces the input key for the key derivation Algorithm
     * It takes the location information and turns it into an input for the key derivation algorithm
     * 
     * @param locationValues represents the array consisting of latitude and longitude information
     * @param toleranceDistance represents the desired encryption distance for the location information 
     */
    public finalLocationOutput(locationValues: Array<string>,toleranceDistance: number) {
        console.log(this.toleraceDistanceCalculator(locationValues[0],true,5) + this.toleraceDistanceCalculator(locationValues[1],false,5)) ;
        return this.toleraceDistanceCalculator(locationValues[0],true,5) + this.toleraceDistanceCalculator(locationValues[1],false,5) ; 
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
        let locationSign = locationValue.charAt(0);
        locationValue = locationValue.slice(1);
        let location = parseFloat(locationValue); 
        location = (location * 10000);

        if (latitudeValue == true) {
            location = Math.floor(location / (toleranceDistance * 5.4));
            return this.binaryLatitudeLongitudeSignCalculator(location,locationSign); }
        else if (latitudeValue == false) {
            location = Math.floor(location / (toleranceDistance * 6));
            return this.binaryLatitudeLongitudeSignCalculator(location,locationSign); }
      
    }

    public binaryLatitudeLongitudeSignCalculator (locationValue: number, locationSign: string) {
        if (locationSign == "E") {
            return locationValue;
        }

        else if (locationSign == "W") {
            return this.integerToBinaryCalculation(locationValue);
        }

        else if (locationSign == "N") {
            return locationValue;
        }

        else if (locationSign == "S") {
            return this.integerToBinaryCalculation(locationValue);
        }
    }

    public integerToBinaryCalculation(locationValue: number) {
        let lengthOfLocation = locationValue.toString(2).length;
        let signAddition = Math.pow(2,lengthOfLocation);

        return locationValue + signAddition;
    }
}