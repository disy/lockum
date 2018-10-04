"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = require("./Location");
var chai_1 = require("chai");
describe('Location fetching function in Degrees Decimal Minutes', function () {
    it('given locations of  N 33.4456 and E 74.3454 , latitude part should be 6193 and longitude part should be -12390  ', function () {
        var location = new Location_1.Location(["N", 33.4456], ["E", 74.3454], 10);
        var keyInput = location.prepareSenderLocationInput();
        chai_1.expect(keyInput[0]).to.equal(6193);
        chai_1.expect(keyInput[1]).to.equal(-12390);
    });
    it('given locations of  N 33.4456 and W 74.3454 ,  latitude part should be 6193 and longitude part should be 12390 ', function () {
        var location = new Location_1.Location(["N", 33.4456], ["W", 74.3454], 10);
        var keyInput = location.prepareSenderLocationInput();
        chai_1.expect(keyInput[0]).to.equal(6193);
        chai_1.expect(keyInput[1]).to.equal(12390);
    });
    it('given locations of  S 33.4456 and E 74.3454 ,  latitude part should be -6193 and longitude part should be -12390 ', function () {
        var location = new Location_1.Location(["S", 33.4456], ["E", 74.3454], 10);
        var keyInput = location.prepareSenderLocationInput();
        chai_1.expect(keyInput[0]).to.equal(-6193);
        chai_1.expect(keyInput[1]).to.equal(-12390);
    });
    it('given locations of  S 33.4456 and W 74.3454 , latitude part should be -6193 and longitude part should be 12390 ', function () {
        var location = new Location_1.Location(["S", 33.4456], ["W", 74.3454], 10);
        var keyInput = location.prepareSenderLocationInput();
        chai_1.expect(keyInput[0]).to.equal(-6193);
        chai_1.expect(keyInput[1]).to.equal(12390);
    });
});
