
# Shopping-service

Shopping service is a service built on top of express js using typescript.

## Installation

### Dependencies
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* postgres
* [docker-compose](https://docs.docker.com/compose/install/)

## Up & Running
### Locally
Make sure to run postgresql first, then update the database.json & .env files with your database name, user, password.

#### Steps
1. ```shell
   npm run start
   ```
### Using docker-compose
#### Steps
1. ```shell
   docker-compose up
   ```

## Usage

1. Create a user
    ```bash
    curl --location --request POST 'localhost:3000/users' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "username":"hamdaa",
   "password":"hamda",
   "first_name":"kk",
   "last_name":"kk"
   }'
    ```

2. Use the token from the first step to create a new product

    ```bash
    curl --location --request POST 'localhost:3000/products' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImhhbWRhYSIsImZpcnN0X25hbWUiOiJrayIsImxhc3RfbmFtZSI6ImtrIn0sImlhdCI6MTYzNzYxODE0NiwiZXhwIjoxNjM3NjIxNzQ2fQ.89L9hu7QmUWDvqXzOXU7BCrjtPBdgfINomlrNBKLfDw' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "name":"hamda",
   "price":12.25
   }'
    ```

3. Use the token from the first step to create an order

    ```bash
    curl --location --request POST 'localhost:3000/orders' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImhhbWRhYSIsImZpcnN0X25hbWUiOiJrayIsImxhc3RfbmFtZSI6ImtrIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGtQTzl3TUtUdUpGSXM2S2pFdFk0N2VUTlFST2hRUXVvRGdXY01TbWoyY0J2ZC9ZUFhyNFJpIn0sImlhdCI6MTYzNzYyMTc4MCwiZXhwIjoxNjM3NjI1MzgwfQ.JFKN_KYbw44NhOIHaOkk1zByk8pdKygkj7zgUdrrmPI' \
   --header 'Content-Type: application/json' \
   --data-raw '{
   "products": [
   {
   "id": 1,
   "quantity": 5
   },
   {
   "id": 2,
   "quantity": 5
   }
   ]
   }'
    ```
4. Use the token from the first step to List orders
   ```shell
   curl --location --request GET 'localhost:3000/users/3/orders' \
   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImhhbWRhYSIsImZpcnN0X25hbWUiOiJrayIsImxhc3RfbmFtZSI6ImtrIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJGtQTzl3TUtUdUpGSXM2S2pFdFk0N2VUTlFST2hRUXVvRGdXY01TbWoyY0J2ZC9ZUFhyNFJpIn0sImlhdCI6MTYzNzYyMTc4MCwiZXhwIjoxNjM3NjI1MzgwfQ.JFKN_KYbw44NhOIHaOkk1zByk8pdKygkj7zgUdrrmPI'
   ```
5. List products
   ```shell
   curl --location --request GET 'localhost:3000/products/'
   ```
6. Get product
   ```shell
   curl --location --request GET 'localhost:3000/products/1'
   ```
