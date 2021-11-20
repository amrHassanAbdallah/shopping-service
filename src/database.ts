import {Connection, Pool, PoolClient} from "pg";
import config from "./config";


class Client {
    static connection: PoolClient;

    static async connect() {
        if (this.connection) {
            return this.connection
        } else {
            const connection = new Pool({
                host: config.db.host,
                user:config.db.user,
                password:config.db.password,
                database:config.db.database,
                application_name:config.application_name,
                min: 1,
                max: 10,
                idleTimeoutMillis: 5000
            });
            return await connection.connect();
        }

    }
}

export default Client
