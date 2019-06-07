module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
  server: {
    command: "serve ./dist -p 8888",
    port: 8888
  }
};