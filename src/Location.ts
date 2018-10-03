import { LocationHelper } from "./LocationHelper";

export class Location {
  private latitude: number
  private longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = parseFloat(latitude.toFixed(6))
    this.longitude = parseFloat(longitude.toFixed(6))
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
}
