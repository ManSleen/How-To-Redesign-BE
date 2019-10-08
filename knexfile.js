require('dotenv').config();

const localPg = {
  host: "localhost",
  database: "users",
  user: "mike.vansleen",
  password: "password"
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://postgres:password@localhost/howto',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://postgres:password@localhost/howto_test',
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: productionDbConnection,
    migrations: {
      directory: __dirname + "/data/migrations"
    },
    seeds: {
      directory: __dirname + "./data/seeds"
    },
    useNullAsDefault: true
  }
}
