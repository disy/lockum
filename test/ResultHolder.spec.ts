import { ResultHolder } from "../src/ResultHolder";
import { expect } from "chai";

describe('ResultHolder utils', () => {

    let salt = new Uint8Array(16)
    let iv = new Uint8Array(32)
    let result = new ResultHolder("ciphertext", "keyhash", 10, salt, iv)

    it('given the ciphertext it should return the parameter correctly', () => {

        expect(result.getEncryptedText()).to.equal("ciphertext")
    });

    it('given the keyhash as a parameter it should return it correctly', () => {

        expect(result.getKeyHash()).to.equal("keyhash")
    });

    it('given parameters it shoudl return an array buffer as a salt type', () => {


        expect(result.getSalt()).instanceOf(Uint8Array)
    });

    it('given parameters it shoudl return an array buffer as a iv type', () => {

        expect(result.getIV()).instanceOf(Uint8Array)
    });
});

