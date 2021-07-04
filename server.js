var express = require('express');
var neo4j = require('neo4j');

// Identifying ExpressJs
var app = module.exports = express();

// Connection to Database
var dbconf = require('./app/configs/database');
db = new neo4j.GraphDatabase(`http://${dbconf.user}:${dbconf.password}@${dbconf.hostname}:${dbconf.port}`);

// Routing Application
require('./app/routes/main')(app, db);

// Configure public folder
app.use(express.static('public'));

// Start server using port 3000
app.listen(3000);
