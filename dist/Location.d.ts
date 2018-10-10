export declare class Location {
    readonly toleranceDistance: number;
    private latitude;
    private longitude;
    constructor(latitude: number, longitude: number, toleranceDistance: number);
    getTransformedLocation(): Int32Array;
    getAdjacentQuadrants(): Int32Array[];
    private transformLocation;
    private includeLocationSign;
    private createAdjacentQuadrants;
    private convertToDegreesDecimalMinutes;
}
