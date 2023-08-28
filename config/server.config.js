if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_STRING: process.env.DB_STRING,
  DB_NAME: process.env.DB_NAME,
  SECRET_KEY : process.env.SECRET_KEY
};
