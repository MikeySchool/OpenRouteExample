require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./ApiRoutes');
const PORT = process.env.PORT || 1557;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiRoutes); // connecting all files of routes

app.listen(PORT, () =>
	console.log(`Success  ==> API Server now listening on PORT ${PORT} in ${process.env.ENV}`)
);
