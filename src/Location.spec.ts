import { Location } from './Location';
import { LocationHelper } from "./LocationHelper";
import {expect} from 'chai';




describe('Location fetching function in Degrees Decimal Minutes', ()=>{

    it('given locations of  [47.6797383,9.1608049],should return an array with the following location values: N4740.7843, E99.6483  ', ()=> {

        let LocationHelping = new LocationHelper();
        const locationInfo = LocationHelping.decimalDegreesToDMS(47.6797383,9.1608049);
        expect(locationInfo[0]).to.equal('N4740.7843');
        expect(locationInfo[1]).to.equal('E99.6483');
    });

    it('given locations of [-77.508333,164.754167],should return an array with the following location values: S7730.5, E16445.25 ', ()=> {

        let LocationHelping = new LocationHelper();
        const locationInfo = LocationHelping.decimalDegreesToDMS(-77.508333,164.754167);
        expect(locationInfo[0]).to.equal('S7730.5');
        expect(locationInfo[1]).to.equal('E16445.25');
    });

    it('given locations of [12.324578,-34.354369],should return an array with the following location values: N1219.4747, W3421.2621 ', ()=> {

        let LocationHelping = new LocationHelper();
        const locationInfo = LocationHelping.decimalDegreesToDMS(12.324578,-34.354369);
        expect(locationInfo[0]).to.equal('N1219.4747');
        expect(locationInfo[1]).to.equal('W3421.2621');
    });

    it('given locations of [-15.123456,-75.987654],should return an array with the following location values: S157.4074,W7559.2592 ', ()=> {

        let LocationHelping = new LocationHelper();
        const locationInfo = LocationHelping.decimalDegreesToDMS(-15.123456,-75.987654);
        expect(locationInfo[0]).to.equal('S157.4074');
        expect(locationInfo[1]).to.equal('W7559.2592');
    });
           
});

