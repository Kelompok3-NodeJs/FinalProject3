module.exports = {
    development: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      dialect: process.env.PGDIALECT,
      pgport: process.env.PGPORT,
      port: process.env.PORT
    
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
  