const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db')
const authRoute = require('./routes/authRoute')
const chatRoute = require('./routes/chatRoute')
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT||8002;

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname1, "/../client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.js"))
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is started")
    })
}

app.use('/api/auth', authRoute);
app.use('/api/chat', chatRoute);

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`.bgCyan.white);
})