export declare class Location {
    readonly toleranceDistance: number;
    private latitude;
    private longitude;
    constructor(latitude: number, longitude: number, toleranceDistance: number);
    prepareSenderLocationInput(): Int32Array;
    prepareReceiverLocationInputs(): Int32Array[];
    private calculateIntegralPart;
    private includeLocationSign;
    private createAdjacentLocations;
    private convertToDegreesDecimalMinutes;
}
