# Welcome to Flights Service

## Project Setup

- cline the project on your local
- Execute `npm install` on the same path as root directory
- Create a `.env` file in the root directory and then add the following piece of json

```

{
  "development": {
    "username": "<YOUR_DB_LOGIN_NAME>",
    "password": "<YOUR_DB_LOGIN_PASSWORD>",
    "database": "Flights_Search_DB_Dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

}

```

```

- once you have added our db config as listed above , go to the src folder from your server and execute 'npx sequelize db:create'

and then execute
`npx sequelize db:migrate`

```


## DB Design

- Airplance Table

  - id
  - model_number
  - capacity
  - created_at
  - updated_at

- Flights

  - id
  - src_city_id
  - dest_airport_id
  - departure
  - arrival
  - flight_number
  - airplane_id
  - airport_id

- Airport
- id
- name
- city_id
- address
- updated_at
- created_at
- RelationShip -> city has many airports , and every airport belong to a city.

- City
- id
- name

Airplane ---- 1 : N ---->>> Flights
Airport ---- 1 : N ---->>> Flights
City ---- 1 : N ---->>> Airport


