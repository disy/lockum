import {DataConvertionCalculations} from "../src/DataConvertionCalculations"
import { expect } from "chai";

describe('data converter', () => {
    it('given a string should create an instance of  byteArray', () => {
        let result: Uint8Array = DataConvertionCalculations.stringToByteArray("ahmet")
        expect(result).instanceOf(Uint8Array)
    });

    it('given a byte array should return a string', () => {
        let byteArray = DataConvertionCalculations.stringToByteArray("test")
        let result = DataConvertionCalculations.byteArrayToString(byteArray)
        expect(result).to.equal("test")
    });

    it('given a base64 should return byte array', () => {
        let ByteArray = DataConvertionCalculations.stringToByteArray("test")
        let base64 = DataConvertionCalculations.byteArrayToBase64(ByteArray)
        expect(base64).to.equal("dGVzdA==")
    });

    it('given a base64 should return byte array', () => {
        let base64 = "dGVzdA=="
        let byteArray = DataConvertionCalculations.base64ToByteArray(base64)
        expect(byteArray).instanceOf(Uint8Array)
    });
})