require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewears/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://wadebutler:qwerty14x@cluster0.a7xfj.azure.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log("connected");
})

mongoose.connection.on('error', (err) => {
    console.log("error", err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`your email ${req.user.email}`)
})

app.listen(3000, () => {
    console.log("listening")
})