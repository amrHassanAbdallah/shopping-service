// @ts-ignore
import Client from '../database'


export type OrderProduct = {
    product_id:Number;
    quantity:Number;
}
export type Order = {
    id?: Number;
    products:OrderProduct[];
    status: OrderStatus;
    user_id: Number;
}
export enum OrderStatus {
    Active = "active",
    Complete = "complete"
}

export class OrderStore {
    async getUserOrders(user_id:string): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw err
        }
    }


    async create(b: Order): Promise<Order> {
        const sql = 'INSERT INTO orders (status, user_id ,products) VALUES($1, $2,$3) RETURNING *'

        // @ts-ignore
        const conn = await Client.connect()
        let values = [OrderStatus.Active, b.user_id,JSON.stringify(b.products)]
        const result = await conn.query(sql, values)
        const res = result.rows[0]
        conn.release()

        return res
    }


}
