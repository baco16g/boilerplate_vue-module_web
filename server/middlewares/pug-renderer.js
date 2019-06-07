const url = require('url')
const path = require('path')
const pug = require('pug')

module.exports = (req, res, next) => {
  const reqPath = url.parse(req.url).pathname
  const reqExtname = path.extname(path.basename(reqPath))

  if (!reqPath.match(/(\/|\.html)$/)) {
    return next()
  }

  const srcPath = reqExtname === '.html' ? reqPath.replace(reqExtname, '.pug') : path.join(reqPath, 'index.pug')

  const htmlBuffer = pug.renderFile(path.join(`./src/templates`, srcPath), {
    basedir: `./src/templates`,
    pretty: true
  })

  res.send(htmlBuffer.toString())
}