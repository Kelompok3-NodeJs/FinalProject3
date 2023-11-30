module.exports = {
    development: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      dialect: process.env.PGDIALECT,
      port: process.env.PGPORT
    
    },
    test: {
      username: null,
      password: null,
      database: null,
      host: null,
      dialect: null
    },
    production: {
      username: null,
      password: null,
      database: null,
      host: null,
      dialect: null
    }
  };
  