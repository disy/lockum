export class LocationHelper {

    public static calculateLocationKeyMaterial(latitude: number, longitude: number, toleranceDistance: number) {
        
        if( latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }
 
        let keypartLatitude = this.includeToleranceDistance(latitude, "latitude", toleranceDistance)
        let keypartLongitude = this.includeToleranceDistance(longitude, "longitude", toleranceDistance)
        console.log("Key Input Material:"+keypartLatitude.toString() + keypartLongitude.toString())

        return parseInt(keypartLatitude.toString() + keypartLongitude.toString())
    }

    public static includeToleranceDistance(locationValue: number, locationType: string, toleranceDistance: number): number {
        let shouldSetBit = false 

        //check if location value is positive and add LocationSignBit logic if required
        if(locationValue > 0) {
            shouldSetBit = true
        } 
        else {
            locationValue *=-1
        }

        //convert location type
        locationValue = this.convertToDegreesDecimalMinutes(locationValue)

        if(locationType == "latitude") {
            
            if(shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 5.4))
                return this.setBit(locationValue)    
            } else { 
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 5.4)) 
                return locationValue
            } 
        } else if(locationType == "longitude") {
            if(shouldSetBit) {
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 6))
                return this.setBit(locationValue)       
            } else { 
                locationValue = Math.floor(locationValue * 10000 / (toleranceDistance * 6))
                return locationValue
            }
        }      
    }

    public static convertToDegreesDecimalMinutes(locationValue: number): number {
        let locationValueDegrees = Math.floor(locationValue)
        let locationValueDecimal = parseFloat(((locationValue % 1)*60).toFixed(4)) 
        let result = parseFloat(locationValueDegrees.toString()+ locationValueDecimal.toString())
        return result
    }

    public static setBit(locationValue: number): number {
        let bitPosition = Math.floor(Math.log2(locationValue))+1
        let numberToAdd = Math.pow(2, bitPosition)
        return locationValue+numberToAdd      
    }
}