module.exports = {
  development: {
    username: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'DeathByDocuments_dev',
    details: {
      host: process.env.SEQUELIZE_HOST,
      port: 3306,
      dialect: 'mysql'
    }
  },
  test: {
    username: process.env.TU,
    password: process.env.TP || null,
    database: 'DeathByDocuments_test',
    details: {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: false
    }
  },
  production: {
    'use_env_variable': 'JAWSDB_URL',
    details: {
      dialect: 'mysql'
    }
  }
};
