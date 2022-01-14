const http = require('http');

require('dotenv').config({ path: '.env' });
require('./config/database');

const app = require('./app');
app.set('port', process.env.PORT || 3001);

const server = http.createServer(app);


server.listen(process.env.PORT || 3001);