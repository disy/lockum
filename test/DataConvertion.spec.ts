import {DataConvertionCalculations} from "../src/DataConvertionCalculations"
import { expect } from "chai";

describe('data converter', () => {
    it('should create an instance of  byteArray', () => {
        let converter =  DataConvertionCalculations
        let result: Uint8Array = converter.stringToByteArray("ahmet")
        expect(result).instanceOf(Uint8Array)
    });
})