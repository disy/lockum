export declare class Location {
    readonly toleranceDistance: number;
    private latitude;
    private longitude;
    constructor(latitude: [string, number], longitude: [string, number], toleranceDistance: number);
    prepareSenderLocationInput(): Int32Array;
    prepareReceiverLocationInputs(): Int32Array[];
    private calculateIntegralPart;
    private includeLocationSign;
    private createAdjacentLocations;
}
