import { Sender } from "../src/Sender"
import { expect } from "chai";

describe('sender utils', () => {

    it('a sender should get a array with the size of 4 upon encrypting the message ', () => {
        let sender = new Sender()
        let encryptionPromise = sender.encryptMessage([47.679970, 9.163592, 10], "foobar")
        encryptionPromise.then(function(result){
            expect(result.length).to.equal('9')
        })
    });
});
