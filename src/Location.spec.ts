import { Location } from './Location'
import {expect} from 'chai';
import {should} from 'mocha';




//this test case is designed for the latitude 59.3293235(decimal degrees)
//and longitude 18.0685808(decimal degrees) coordinates.
//in return degrees decimal minutes should be as following
//after mathematical calculations Latitude: 5919.7594 Longitude: 184.1148

describe('Location fetching function in Decimal Degrees', ()=>{

    it('should return location information in the form of an array', ()=> {

        let locationClass = new Location(59.3293235 ,18.0685808);
        const locationInfo = locationClass.decimalDegreesToDMS(59.3293235, 18.0685808);
        expect(locationInfo).to.be.an('Array');
       
    });

   it('should return location in the form of an array with the size of 4', ()=> {

        let locationClass = new Location(34.567,47.678);
        const locationInfo = locationClass.decimalDegreesToDMS(59.3293235 ,18.0685808);
        expect(locationInfo).have.lengthOf(4);
       
   });

   it('should return N as a first paramter based on given input', ()=> {

    let locationClass = new Location(34.567,47.678);
    const locationInfo = locationClass.decimalDegreesToDMS(59.3293235, 18.0685808);
    expect(locationInfo[0]).to.equal('N');
   
   });

   it('should return 5919.7594 as a second parameter based on given input', ()=> {

    let locationClass = new Location(59.3293235 ,18.0685808);
    const locationInfo = locationClass.decimalDegreesToDMS(59.3293235 ,18.0685808);
    expect(locationInfo[1]).to.equal('5919.7594');
   
   });

   it('should return E as a third parameter based on given input', ()=> {

    let locationClass = new Location(59.3293235, 18.0685808);
    const locationInfo = locationClass.decimalDegreesToDMS(59.3293235, 18.0685808);
    expect(locationInfo[2]).to.equal('E');
   
   });

   it('should return 184.1148 as a fourth parameter based on given input', ()=> {

    let locationClass = new Location(59.3293235, 18.0685808);
    const locationInfo = locationClass.decimalDegreesToDMS(59.3293235, 18.0685808);
    expect(locationInfo[3]).to.equal('184.1148');
   
   });

});

