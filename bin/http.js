require("dotenv").config()
process.env.NODE_ENV = 'development';

process.env.DATABASE_URL = '';

const app = require("../app")
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("App running on port:  ", PORT);
})