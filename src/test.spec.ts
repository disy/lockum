
import { Location } from "./Location";
import { expect } from "chai";


describe('Location fetching function in Degrees Decimal Minutes', ()=>{

    it('given locations of  N 33.4456 and E 74.3454 , latitude part should be 6193 and longitude part should be -12390  ', ()=> {

        let location = new Location(["N",33.4456],["E",74.3454],10)
        let keyInput  = location.prepareSenderLocationInput()
        expect(keyInput[0]).to.equal(6193)
        expect(keyInput[1]).to.equal(-12390)
    });

    it('given locations of  N 33.4456 and W 74.3454 ,  latitude part should be 6193 and longitude part should be 12390 ', ()=> {

        let location = new Location(["N",33.4456],["W",74.3454],10)
        let keyInput  = location.prepareSenderLocationInput()
        expect(keyInput[0]).to.equal(6193)
        expect(keyInput[1]).to.equal(12390)
    });

    it('given locations of  S 33.4456 and E 74.3454 ,  latitude part should be -6193 and longitude part should be -12390 ', ()=> {

        let location = new Location(["S",33.4456],["E",74.3454],10)
        let keyInput  = location.prepareSenderLocationInput()
        expect(keyInput[0]).to.equal(-6193)
        expect(keyInput[1]).to.equal(-12390)
    });

    it('given locations of  S 33.4456 and W 74.3454 , latitude part should be -6193 and longitude part should be 12390 ', ()=> {
        let location = new Location(["S",33.4456],["W",74.3454],10)
        let keyInput  = location.prepareSenderLocationInput()
        expect(keyInput[0]).to.equal(-6193)
        expect(keyInput[1]).to.equal(12390)
    });
});

