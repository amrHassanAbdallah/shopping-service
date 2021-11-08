import {Connection, Pool, PoolClient} from "pg";

class Client {
    static connection: PoolClient;

    static async connect() {
        if (this.connection) {
            return this.connection
        } else {
            const connection = new Pool({
                host: 'postgres://localhost',
                min: 1,
                max: 10,
                idleTimeoutMillis: 5000
            });
            return await connection.connect();
        }

    }
}

export default Client
