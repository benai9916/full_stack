## Run client
- cd `client` directory
- install nodejs
- Install dependencies: `npm i`
- Run client: `npm run start`
- Head to browser and hit: http://localhost:3000

## Run server
- cd server
- install python
- create virtual env - `python3 -m venv env`
- activate env `. .env/bin/activate`
- install dependencies - `pip3 install -r requirements.txt`
- Run server - `python3 manage.py runserver`

### Secret Token to delete
1. `JBFDTOQAK9C1JI65C25QIVYAW`
2. `0WRRJKT4ZWT01WUIFIW3N1WVG`
3. `CE90QJJXIFRYR57WJFUL9AANK`

### End points
Base url: `http://127.0.0.1:8000`
- Post message
    - End point: `/api/v1/chat`
    - Method: POST
    - Body
    ```
     {
        "message": message
      }
    ```
- Get message
  - End point: `/api/v1/chat`
  - Method: GET
  
- Delete Single message
  - End point: `/api/v1/chat/{id}`
  - Method: DELETE
  - Body:
  ```
   {
      "token": secret_token
    }
  ```
- Delete all messages
  - End point: `/api/v1/chat`
  - Method: DELETE
  - Body:
  ```
   {
      "token": secret_token
    }
  ```

