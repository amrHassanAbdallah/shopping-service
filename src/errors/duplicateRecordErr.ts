export default class duplicateRecordErr extends Error {
    statusCode: number;

    constructor() {
        super("A record already exists with the same value");
        this.statusCode = 409
        Object.setPrototypeOf(this, duplicateRecordErr.prototype);
    }
}
