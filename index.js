const express = require('express');
const app = express();
const config = require('config');
require('module-alias/register');

const winston = require('winston');

process.logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/sync_error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/sync_success.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/app_fail.log', level: 'warn'})
  ]
});

const getUsers = require('./services/reqres/getUsers');


app.disable('x-powered-by');
app.set('trust proxy', true)

app.listen(process.env.PORT || 3022);
console.log(`App listening on port ${process.env.PORT || 3022}`);

process.on('uncaughtException', function(err) {
   logger.log('warn', err.stack)
});


getUsers();
setInterval(getUsers, 60000);


app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path)
    res.setHeader('Access-Control-Allow-Origin', config.get('origin'));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/v1', require('./v1/routes'));

app.use('*', (req, res) => res.json({
    status: {
        code: 404,
        message: 'Route not found'
    }
}))