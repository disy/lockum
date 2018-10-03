export declare class LocationHelper {
    static calculateLocationKeyMaterial(latitude: number, longitude: number, toleranceDistance: number): string;
    static includeToleranceDistance(latitude: number, longitude: number, toleranceDistance: number): string;
    static convertToDegreesDecimalMinutes(locationValue: number): number;
    static includeLocationSignBits(locationValue: number, isNorthOrWest: Boolean): number;
    static createLocationMaterials(latitude: number, longitude: number, toleranceDistance: number): String[];
}
