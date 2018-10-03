export declare class Location {
    private latitude;
    private longitude;
    constructor(latitude: number, longitude: number);
    createLocationKeyMaterial(toleranceDistance: number): string;
    createLocationKeyMaterials(toleranceDistance: number): String[];
}
