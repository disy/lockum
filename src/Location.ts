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

  public createLocationKeyInput(latitude: [string, number], longitude: [string, number], toleranceDistance: number) {
    
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

  private createNeighbourLocations(latitude: number, longitude: number) {
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
}
