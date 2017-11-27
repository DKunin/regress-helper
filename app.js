const config = require('./config/');
const logger = require('./util/logger')(config);
const express = require('express');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const dbConnection = require('./util/dbconnection');
const ProductsHandler = require('./app/routes/products');
const WishlistHandler = require('./app/routes/wishlist');

// const SDC = require('statsd-client');
// const sdc = new SDC({ host: 'localhost'});

// var timer = new Date();
// sdc.increment('some.counter'); // Increment by one.
// sdc.gauge('some.gauge', 10); // Set gauge to 10
// sdc.timing('some.timer', timer); // Calculates time diff
// sdc.histogram('some.histogram', 10, {foo: 'bar'}) // Histogram with tags
console.log(config.get('port'));
const app = express();
app.use(bodyParser.json());
app.use(addRequestId());

dbConnection
  .setup(config)
  .then(db => {
    app.get('/status', function(req, res) {
      res.sendStatus(200);
    });

    const productsRouter = new ProductsHandler(db, logger).getRouter();
    const wishlistRouter = new WishlistHandler(db, logger).getRouter();

    app.use('/v1/products', productsRouter);
    app.use('/v1/wishlist', wishlistRouter);

    app.use((err, req, res, next) => {
      logger.error(err);
      res.sendStatus(500);
    });

    return startServer(app, config.get('port'));
  })
  .catch(err => {
    logger.error(err);
    process.exit(1);
  });

function startServer(server, port) {
  return new Promise((resolve, reject) => {
    server.listen(port, err => {
      if (err) return reject(err);
      logger.info(`Listening on port ${port}`);
      resolve();
    });
  });
}
