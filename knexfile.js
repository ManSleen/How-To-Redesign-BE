const localPg = {
  host: "localhost",
  database: "users",
  user: "mike.vansleen",
  password: "password"
};

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      // Name your database and path it correctly
      filename: "./data/users.db3"
    },
    useNullAsDefault: true,
    migrations: {
      // Configure where you want your migrations folder to live
      directory: "./data/migrations"
    },
    seeds: {
      // Configure where you want your seeds folder to live
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      // use a testing db here, if you'd like
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: productionDbConnection,
    migrations: {
      directory: __dirname + "/data/migrations"
    },
    seeds: {
      directory: __dirname + "./data/seeds"
    }
  }
};
