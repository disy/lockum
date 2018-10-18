export class ResultHolder {

    constructor(readonly encryptedText: string, readonly keyhash: string, readonly toleranceDistance?: number, readonly salt?: Uint8Array, readonly iv?: Uint8Array) {

    }

    public getEncryptedText(): string {
        return this.encryptedText
    }

    public getKeyHash(): string {
        return this.keyhash
    }

    public getToleranceDistance(): number {
        return this.toleranceDistance
    }

    public getSalt(): Uint8Array {
        return this.salt
    }

    public getIV(): Uint8Array {
        return this.iv
    }
}