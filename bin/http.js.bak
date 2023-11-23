require("dotenv").config()
process.env.NODE_ENV = 'development';

process.env.DATABASE_URL = 'postgresql://postgres:AcgG43*eDdce6g3E*d6ddFe4d2c4C144@monorail.proxy.rlwy.net:11456/railway';

const app = require("../app")
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log("App running on port:  ", PORT);
})