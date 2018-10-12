
import { Location } from "../src/Location";
import { expect } from "chai";

describe('Location convertions', ()=>{

    it('given locations of 47.679970,9.163593 with tolerance distance of 10, results should be 877925 and  -16635  ', ()=> {

        let location = new Location(47.679970,9.163593,10)
        let keyInput  = location.getTransformedLocation()
        expect(keyInput[0]).to.equal(877925)
        expect(keyInput[1]).to.equal(-16635)
    });

    it('given locations of 47.679970,-9.163593 with tolerance distance of 10, results should be 877925 and  16635 ', ()=> {

        let location = new Location(47.679970,-9.163593,10)
        let keyInput  = location.getTransformedLocation()
        expect(keyInput[0]).to.equal(877925)
        expect(keyInput[1]).to.equal(16635)
    });

    it('given locations of -47.679970,9.163593 with tolerance distance of 10, results should be -877925 and -16635', ()=> {

        let location = new Location(-47.679970,9.163593,10)
        let keyInput  = location.getTransformedLocation()
        expect(keyInput[0]).to.equal(-877925)
        expect(keyInput[1]).to.equal(-16635)
    });

    it('given locations of -47.679970,-9.163593 with tolerance distance of 10, results should be -877925 and 16635', ()=> {
        let location = new Location(-47.679970,-9.163593,10)
        let keyInput  = location.getTransformedLocation()
        expect(keyInput[0]).to.equal(-877925)
        expect(keyInput[1]).to.equal(+16635)
    });

    
});

