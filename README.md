# Challenge Ticmas

This project is an application developed with NestJS, using TypeORM as the Object-Relational Mapping (ORM) to interact with a MySQL database.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Configuration

The `.env` file contains the environment variables necessary for the application configuration. Make sure to set the following variables according to your preferences:

- `PORT`: Port on which the server will run.
- `HOST`: Host of the MySQL database.
- `MYSQL_DB_NAME_DEV`: Name of the MySQL database in the development environment.
- `MYSQL_DB_NAME_TEST`: Name of the MySQL database in the test environment.

## Usage

To run the application in development mode, you can use the following command:

```bash
npm run start:dev
```

This will start the server in development mode and automatically reload on code changes.

## Tests

To run tests and watch for changes, you can use the following command:

```bash
npm run test:watch
```

This command runs the tests and continuously watches for changes in the code.

## Endpoints

The application exposes the following endpoints:

- `GET /tasks`: Get all tasks.
- `GET /tasks/:id`: Get a task by its ID.
- `GET /tasks/status/:status`: Get all tasks with a specific status.
- `GET /tasks/:id/days-passed`: Get the days passed since the creation of a task.
- `POST /tasks`: Create a new task.
- `DELETE /tasks/:id`: Delete a task.
- `PATCH /tasks/:id`: Update a task.
