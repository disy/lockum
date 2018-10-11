const latitudeCoefficient = 5.4
const longitudeCoefficent = 6

export class Location {
  private latitude: [string, number] = ["", 0]
  private longitude: [string, number] = ["", 0]

  constructor(latitude: number, longitude: number, readonly toleranceDistance: number) {
    this.latitude = this.convertToDegreesDecimalMinutes(latitude, true)
    this.longitude = this.convertToDegreesDecimalMinutes(longitude, false)
  }

  //returns transformed latitude and longitue value as a key derivation function's input
  public getTransformedLocation() {
    let latitudePart = this.transformLocation(this.latitude[0], this.latitude[1])
    let longitudePart = this.transformLocation(this.longitude[0], this.longitude[1])

    let result = new Int32Array([latitudePart, longitudePart])
    return result
  }

  //returns an array of adjacent quadrants with transformed locations (used by receiver)
  public getAdjacentQuadrants() {
    let latitudePart = this.transformLocation(this.latitude[0], this.latitude[1])
    let longitudePart = this.transformLocation(this.longitude[0], this.longitude[1])

    let resultArray = this.createAdjacentQuadrants(latitudePart, longitudePart)
    return resultArray
  }

  private transformLocation(hemisphere: string, locationValue: number) {
    locationValue = locationValue * 10000

    if (hemisphere == "N" || hemisphere == "S") {
      return this.includeLocationSign(hemisphere, locationValue / (this.toleranceDistance * latitudeCoefficient))
    } else {
      return this.includeLocationSign(hemisphere, locationValue / (this.toleranceDistance * longitudeCoefficent))
    }
  }

  private includeLocationSign(hemisphere: string, locationValue: number) {
    if (hemisphere == "N" || hemisphere == "W") {
      return locationValue
    } else {
      return locationValue * -1
    }
  }

  //creates and array of adjacent quadrants using transformed locations
  private createAdjacentQuadrants(latitude: number, longitude: number) {
    let adjacentLocations = Array<Int32Array>()
    adjacentLocations[0] = new Int32Array([latitude - 1, longitude - 1])
    adjacentLocations[1] = new Int32Array([latitude - 1, longitude])
    adjacentLocations[2] = new Int32Array([latitude - 1, longitude + 1])
    adjacentLocations[3] = new Int32Array([latitude, longitude - 1])
    adjacentLocations[4] = new Int32Array([latitude, longitude])
    adjacentLocations[5] = new Int32Array([latitude, longitude + 1])
    adjacentLocations[6] = new Int32Array([latitude + 1, longitude - 1])
    adjacentLocations[7] = new Int32Array([latitude + 1, longitude])
    adjacentLocations[8] = new Int32Array([latitude + 1, longitude + 1])

    return adjacentLocations
  }

  private convertToDegreesDecimalMinutes(locationValue: number, isLatitude: boolean) {
    let locationSign = ""
    if (locationValue < 0 && isLatitude) {
      locationSign = "S"
      locationValue = locationValue * -1
    } else if (locationValue < 0 && !isLatitude) {
      locationSign = "W"
      locationValue = locationValue * -1
    } else if (locationValue > 0 && isLatitude) {
      locationSign = "N"
    } else if (locationValue > 0 && !isLatitude) {
      locationSign = "E"
    }

    let degreesPart = Math.floor(locationValue)
    let floatingMinutes = +((locationValue % 1) * 60).toFixed(4)
    let minutesIntegralPart = Math.floor(floatingMinutes)
    let minutesIntegralDigitNumber = Math.floor(Math.log10(minutesIntegralPart)) + 1
    let degreesDecimalMinutes = (degreesPart * (Math.pow(10, minutesIntegralDigitNumber))) + floatingMinutes

    let location: [string, number] = [locationSign, degreesDecimalMinutes]
    return location
  }
}
