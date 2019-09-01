require('dotenv').config(); // Keep this require at top of this file to load environment variables in .env file

const express = require('express');
const smsRoute = require('./lib/api/routes/sms');

const app = express();

app.use(express.json());
app.use('/api/sms', smsRoute);
app.use(express.static('lib/public'));

const server = app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server running on port ${server.address().port}`);
});