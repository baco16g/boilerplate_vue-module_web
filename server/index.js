const express = require('express')

const pugRenderer = require('./middlewares/pug-renderer')

const app = express()

app
  .use(express.static('./dist'))
  .get('*', pugRenderer)
  .listen(3000, 'localhost')
