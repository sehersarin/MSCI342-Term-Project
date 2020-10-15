# MSCI342-Term-Project
Group project for MSCI 342: Principles of Software Engineering.

The overall problem the team aims to address is the non-confidentiality and inefficient process of booking appointments with mental health support staff members. 

## Backend Code File Structure (server)
1. migrations: all the required database changes, such as creating a new table
2. lib: general server methods, such as connecting to the database
3. routes: directs the api endpoints to the appropriate handlers.
4. models: contains all the business logic and database manipulations/querying
    a. data: contains the formatting for the tables
    b. db: contains the sql querying and manipulation statements
    c. handlers: contains all the business logic for a certain behaviour

5. tests: contains all the test code

* Special Notes: 
1. For naming the migrations, it needs to follow [version].[action].[optional-description].sql. Refer to [Postgrator documentation](https://www.npmjs.com/package/postgrator) for more details.
2. Do NOT touch past migrations to avoid checksum errors. If corrections need to be made, create a new sql statement.
3. Use single quotes for strings in the sql statements. 

## Local Setup
1. Clone the repo and install packages using `npm install`.
2. Setup PostgreSQL and create a new database. Refer to PostgreSQL installation below for more details.
3. Add a file in server named `.env` with the following line (and replace the capitalized values in <> when your values):

```shell
DATABASE_URL=postgres://<SUPERUSER>:<PASSWORD>@127.0.0.1:<PORT>/<DATABASENAME>
```
4. Add a folder named `.jest`. Inside this folder, create a file `setEnvVars.js`. Add the following in this file (and replace the capitalized values in <> when your values):

```js
process.env.DATABASE_URL = "postgres://<SUPERUSER>:<PASSWORD>@127.0.0.1:<PORT>/<DATABASENAME>"
```

5. Run locally using either option a or b. The frontend code will run on port 3000 and the backend code will run on port 4000.
    a. Run `npm run start:dev` in the root folder.
    b. cd into react-ui and run `npm start` and then cd into server folder and run `npm start`.

### PostgreSQL Setup
*For Mac users, https://postgresapp.com/ is another option.*

1. Download [PostgreSQL] (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Setup a default user and connection following the instructions in the prompts
*Please note down your password, port, and superuser values!*
3. Navigate to the location of the PostgreSQL installation

Location of PostgreSQL (may need to google/search your files if different):

```json
{
    "windows": "C:\Program Files\PostgreSQL\9.0\bin",
    "mac": "/usr/local/var/postgres"
}
```

Potential debugging links:
- [Windows](https://doc.odoo.com/7.0/install/windows/postgres/)
- [Mac](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm)

4. Connect to the database server

```shell
psql -U <USERNAME>
```

5. Create a new database

```sql
CREATE DATABASE testing;
```
