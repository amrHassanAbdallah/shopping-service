// @ts-ignore
import Client from '../database'

export type Product = {
    id?: Number;
    name: String;
    price: Number;
    category?: String;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()
            console.log(result,sql,id)
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(b: Product): Promise<Product> {
        let sql = ''
        if (b.category) {
            sql = 'INSERT INTO products (name, price,category ) VALUES($1, $2,$3) RETURNING *'
        } else {
            sql = 'INSERT INTO products (name, price ) VALUES($1, $2) RETURNING *'
        }

        // @ts-ignore
        const conn = await Client.connect()
        let values = [b.name, b.price]
        if (b.category) {
            values.push(b.category)
        }
        const result = await conn
            .query(sql, values)

        const res = result.rows[0]

        conn.release()

        return res
    }

    async delete(id: string): Promise<Product> {
            const sql = 'DELETE FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const res = result.rows[0]

            conn.release()

            return res

    }
}
