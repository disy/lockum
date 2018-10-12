import {EncryptionHelper} from "..//src//EncryptionHelper"
import { expect } from "chai";

describe('encryption utils', () => {

    it('encyrption tool should succesfully encrypt the message  ', () => {
        let ivBytes: Uint8Array = new Uint8Array(16)
        let salt: Uint8Array = new Uint8Array(16)
        let sampleLocation: Int32Array = new Int32Array(16)

        let encryptionTool = new EncryptionHelper(salt,ivBytes)
        let result = encryptionTool.encrypt(sampleLocation,"foobar",10)
        result.then(function(result){
            let message = result[0]
            expect(message).equal.toString()
        }).catch(function(err){
            console.log(err)
        })
    });
});
