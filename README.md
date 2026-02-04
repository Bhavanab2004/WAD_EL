# College Hunt Hub

Full-stack College Review Application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (running locally)

## Installation & Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Ensure you have a `.env` file in the root directory with the following content (adjust credentials if necessary):
    ```env
    PORT=5000
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=college_hunt_db
    DB_PASSWORD=admin123
    DB_PORT=5432
    JWT_SECRET=supersecretkeyChangeThisInProduction
    ```

3.  **Database Setup**
    Run the following scripts in order to create the database and seed initial data:

    ```bash
    # Create the database
    node create_db.js

    # Create tables and seed admin user
    node check_setup.js
    ```

## Running the Application

Start the server using:

```bash
npm start
```

The server will start at `http://localhost:5000`.

## Admin Access

An admin user is created mostly by the seed script:
- **Email:** `admin@example.com`
- **Password:** `admin123`

## Troubleshooting

### Error: `ENOENT: no such file or directory, open '...package.json'`
This error usually means you are running the command from the wrong directory.
Ensure you are inside the `CollegeHuntHub-main` folder (the one containing `package.json`).

```bash
cd CollegeHuntHub-main
npm install
```
