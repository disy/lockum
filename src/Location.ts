const latitudeCoefficient = 5.4
const longitudeCoefficent = 6

export class Location {
  private latitude: [string, number] = ["", 0]
  private longitude: [string, number] = ["", 0]

  constructor(latitude: number, longitude: number, readonly toleranceDistance: number) {
    this.latitude = this.convertToDegreesDecimalMinutes(latitude,true)
    this.longitude = this.convertToDegreesDecimalMinutes(longitude,false)
  }

  public prepareSenderLocationInput() {
    let latitudePart = this.calculateIntegralPart(this.latitude[0], this.latitude[1])
    let longitudePart = this.calculateIntegralPart(this.longitude[0], this.longitude[1])
    latitudePart = this.includeLocationSign(this.latitude[0], latitudePart)
    longitudePart = this.includeLocationSign(this.longitude[0], longitudePart)
    let input = new Int32Array([latitudePart, longitudePart])

    return input
  }

  public prepareReceiverLocationInputs() {
    let latitudePart = this.calculateIntegralPart(this.latitude[0], this.latitude[1])
    let longitudePart = this.calculateIntegralPart(this.longitude[0], this.longitude[1])
    latitudePart = this.includeLocationSign(this.latitude[0], latitudePart)
    longitudePart = this.includeLocationSign(this.longitude[0], longitudePart)
    let inputsArray = this.createAdjacentLocations(latitudePart, longitudePart)

    return inputsArray
  }

  private calculateIntegralPart(hemisphere: string, locationValue: number) {
    locationValue = locationValue * 10000

    if (hemisphere == "N" || hemisphere == "S") {
      return locationValue / (this.toleranceDistance * latitudeCoefficient)
    } else {
      return locationValue / (this.toleranceDistance * longitudeCoefficent)
    }
  }

  private includeLocationSign(hemisphere: string, locationValue: number) {
    if (hemisphere == "N" || hemisphere == "W") {
      return locationValue
    } else {
      return locationValue * -1
    }
  }

  private createAdjacentLocations(latitude: number, longitude: number) {
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

    let location: [string,number] = [locationSign,degreesDecimalMinutes]
    return location
  }
}
