import { LocationHelper } from "./LocationHelper";

const latitudeCoefficient = 5.4
const longitudeCoefficent = 6

export class Location {
  private latitude: number
  private longitude: number
  private isSender: Boolean

  constructor(latitude: number, longitude: number) {
    this.latitude = parseFloat(latitude.toFixed(6))
    this.longitude = parseFloat(longitude.toFixed(6))
  }

  public prepareKeyDerivationInput(latitude: [string, number], longitude: [string, number], toleranceDistance: number) {
    if (this.isSender) {
      let latitudePart = this.calculateIntegralPart(latitude[0], latitude[1])
      latitudePart = this.includeLocationSign(latitude[0], latitudePart)
      let longitudePart = this.calculateIntegralPart(longitude[0], longitude[1])
      longitudePart = this.includeLocationSign(longitude[0], longitudePart)

      let input = new Int32Array([latitudePart, longitudePart])

      return input

    } else {

      let latitudePart = this.calculateIntegralPart(latitude[0], latitude[1])
      latitudePart = this.includeLocationSign(latitude[0], latitudePart)

      let longitudePart = this.calculateIntegralPart(longitude[0], longitude[1])
      longitudePart = this.includeLocationSign(longitude[0], longitudePart)

      return this.createAdjacentLocations(latitudePart, longitudePart)
    }
  }


  //creates an input for key derivation function of the sender
  public createLocationKeyMaterial(toleranceDistance: number) {
    let locationKeyMaterial = LocationHelper.calculateLocationKeyMaterial(this.latitude, this.longitude, toleranceDistance)
    return locationKeyMaterial
  }

  //creates an array of inputs with neighbour quadrants of the receiver
  public createLocationKeyMaterials(toleranceDistance: number) {
    let locationKeyMaterials = LocationHelper.createLocationMaterials(this.latitude, this.longitude, toleranceDistance)
    return locationKeyMaterials
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

  private calculateIntegralPart(hemisphere: string, locationValue: number) {
    locationValue = locationValue * 10000

    if (hemisphere == "N" || hemisphere == "S") {
      return locationValue / latitudeCoefficient
    } else {
      return locationValue / longitudeCoefficent
    }
  }

  private includeLocationSign(hemisphere: string, locationValue: number) {
    if (hemisphere == "N" || hemisphere == "W") {
      return locationValue
    } else {
      return locationValue * -1
    }
  }
}
