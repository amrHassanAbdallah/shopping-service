import Client from '../database'
import bcrypt from 'bcrypt'
import duplicateRecordErr from "../errors/duplicateRecordErr";

const saltRounds = process.env.SALT_ROUNDS||""
const pepper = process.env.BCRYPT_PASSWORD||""

export type User = {
    id?: string;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT id,username FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`unable get users: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            //@ts-ignoreX$
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (username, password_digest,first_name,last_name) VALUES($1, $2,$3,$4) RETURNING *'

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.username, hash,u.first_name,u.last_name])
            const user = result.rows[0]

            conn.release()
            user.password_digest = undefined

            return user
        } catch(err:any) {
            //todo adjust it to be interface.
            if (err.code == 23505){
                throw new duplicateRecordErr()
            }
            throw new Error(`unable create user (${u.username}): ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'

            const result = await conn.query(sql, [id])
            const product = result.rows[0]

            conn.release()

            return product
        } catch(err) {
            throw new Error(`unable delete user (${id}): ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])
        if(result.rows.length) {

            const user = result.rows[0]

            if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
            }
        }
        throw new Error("username or password invalid")

    }
}
