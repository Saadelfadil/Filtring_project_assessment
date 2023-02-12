const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express();
const connectDB = require("./server/database/connection")
const cors = require("cors")

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 4000;

connectDB();

app.use(bodyParser.json());
app.use(cors());


app.use('/', require("./server/routes/router"))

app.listen(PORT, () => console.log(`Server Listen in port http://localhost:${PORT}`));