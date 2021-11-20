export default class DuplicateRecordErr extends Error {
    statusCode: number;

    constructor() {
        super("A record already exists with the same value");
        this.statusCode = 409
        Object.setPrototypeOf(this, DuplicateRecordErr.prototype);
    }
}
