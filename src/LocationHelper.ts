export class LocationHelper {

    public static calculateLocationKeyMaterial(latitude: number, longitude: number, toleranceDistance: number) {

        if (latitude == null || longitude == null) {
            throw new Error('Location information has not been fetched.')
        }

        let locationKeyMaterial = this.includeToleranceDistance(latitude, longitude, toleranceDistance)
        console.log("key derivation function input should be: " + locationKeyMaterial)

        return locationKeyMaterial
    }

    public static includeToleranceDistance(latitude: number, longitude: number, toleranceDistance: number): string {
        let isNorth = false
        let isWest = false

        // location sign is decided(N,W,E,S) and location value is made positive
        if (latitude < 0) {
            latitude = latitude * -1
        } else if (latitude > 0) {
            isNorth = true
        }

        if (longitude < 0) {
            longitude = longitude * -1
            isWest = true
        }

        //location is converted to required format(Degrees DecimalMinutes)
        latitude = this.convertToDegreesDecimalMinutes(latitude)
        longitude = this.convertToDegreesDecimalMinutes(longitude)

        latitude = latitude * 10000
        longitude = longitude * 10000

        //calculate the latitude part
        if (isNorth) {
            latitude = Math.floor(latitude / (toleranceDistance * 5.4))
            latitude = this.includeLocationSignBits(latitude, true)
            console.log("latitude part:" + latitude)
        } else {
            latitude = Math.floor(latitude / (toleranceDistance * 5.4))
            latitude = this.includeLocationSignBits(latitude, false)
        }

        //calculate the longitude part
        if (isWest) {
            longitude = Math.floor(longitude / (toleranceDistance * 6))
            longitude = this.includeLocationSignBits(longitude, true)
        } else {
            longitude = Math.floor(longitude / (toleranceDistance * 6))
            longitude = this.includeLocationSignBits(longitude, false)
            console.log("longitude part:" + longitude)
        }

        return latitude.toString() + longitude.toString()
    }

    //converts from Decimal Degrees to Degrees Decimal Minutes
    public static convertToDegreesDecimalMinutes(locationValue: number): number {
        let locationValueDegrees = Math.floor(locationValue)
        let locationValueDecimal = parseFloat(((locationValue % 1) * 60).toFixed(5).substring(0, 7))
        let result = parseFloat(locationValueDegrees.toString() + locationValueDecimal.toString())
        return result
    }

    public static includeLocationSignBits(locationValue: number, isNorthOrWest: Boolean): number {
        let firstBit = 1 << 27
        let secondBit = 1 << 26

        if (isNorthOrWest) {
            return firstBit + secondBit + locationValue
        }
        else {
            return firstBit + locationValue
        }
    }

    public static createLocationMaterials(latitude: number, longitude: number, toleranceDistance: number): String[] {
        let isNorth = false
        let isWest = false
        let quadrantsList = new Array<String>()
        let leftLatitudeQuadrant: number
        let rightLatitudeQuadrant: number
        let leftLongitudeQuadrant: number
        let rightLongitudeQuadrant: number

        //location sign is decided and location values are changed to be positive
        if (latitude < 0) {
            latitude = latitude * -1
        } else if (latitude > 0) {
            isNorth = true
        }

        if (longitude < 0) {
            longitude = longitude * -1
            isWest = true
        }

        //location is converted to required format(Degrees DecimalMinutes)
        latitude = this.convertToDegreesDecimalMinutes(latitude)
        longitude = this.convertToDegreesDecimalMinutes(longitude)

        latitude = latitude * 10000
        longitude = longitude * 10000


        //calculate the latitude parts
        if (isNorth) {
            //actual latitude
            latitude = Math.floor(latitude / (toleranceDistance * 5.4))
            let center = latitude
            latitude = this.includeLocationSignBits(latitude, true)

            //get the left quadrant
            leftLatitudeQuadrant = center - 1
            leftLatitudeQuadrant = this.includeLocationSignBits(leftLatitudeQuadrant, true)

            //get the right quadrant
            rightLatitudeQuadrant = center + 1
            rightLatitudeQuadrant = this.includeLocationSignBits(rightLatitudeQuadrant, true)

        } else {
            //actualy latitude
            latitude = Math.floor(latitude / (toleranceDistance * 5.4))
            let center = latitude
            latitude = this.includeLocationSignBits(latitude, false)

            //get the left quadrant
            leftLatitudeQuadrant = center - 1
            leftLatitudeQuadrant = this.includeLocationSignBits(leftLatitudeQuadrant, false)

            //get the right quadrant
            rightLatitudeQuadrant = center + 1
            rightLatitudeQuadrant = this.includeLocationSignBits(rightLatitudeQuadrant, false)
        }

        //calculate the longitude parts
        if (isWest) {
            //actual longtitude
            longitude = Math.floor(longitude / (toleranceDistance * 6))
            let center = longitude
            longitude = this.includeLocationSignBits(longitude, true)

            // get the left quadrant
            leftLongitudeQuadrant = center - 1
            leftLongitudeQuadrant = this.includeLocationSignBits(leftLongitudeQuadrant, true)

            //get the right quadrant
            rightLongitudeQuadrant = center + 1
            rightLongitudeQuadrant = this.includeLocationSignBits(rightLongitudeQuadrant, true)

        } else {
            //actual longitude
            longitude = Math.floor(longitude / (toleranceDistance * 6))
            let center = longitude
            longitude = this.includeLocationSignBits(longitude, false)
            //get the left quadrant
            leftLongitudeQuadrant = center - 1
            leftLongitudeQuadrant = this.includeLocationSignBits(leftLongitudeQuadrant, false)
            //get the right quadrant
            rightLongitudeQuadrant = center + 1
            rightLongitudeQuadrant = this.includeLocationSignBits(rightLongitudeQuadrant, false)
        }

        //initialize arrays with possible values
        quadrantsList[0] = leftLatitudeQuadrant.toString() + leftLongitudeQuadrant.toString()
        quadrantsList[1] = leftLatitudeQuadrant.toString() + longitude.toString()
        quadrantsList[2] = leftLatitudeQuadrant.toString() + rightLongitudeQuadrant.toString()
        quadrantsList[3] = latitude.toString() + leftLongitudeQuadrant.toString()
        quadrantsList[4] = latitude.toString() + longitude.toString()
        quadrantsList[5] = latitude.toString() + rightLongitudeQuadrant.toString()
        quadrantsList[6] = rightLatitudeQuadrant.toString() + leftLongitudeQuadrant.toString()
        quadrantsList[7] = rightLatitudeQuadrant.toString() + longitude.toString()
        quadrantsList[8] = rightLatitudeQuadrant.toString() + rightLongitudeQuadrant.toString()

        return quadrantsList
    }
}