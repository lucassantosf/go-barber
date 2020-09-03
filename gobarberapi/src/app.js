require('dotenv/config');

const express = require('express');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RateLimitRedis = require('rate-limit-redis');

require('./database');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    );
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15,
          max: 10,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
