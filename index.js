// require your server and launch it
const server = require('./api/server')
const PORT = 5000

server.listen(5000, () => {
    console.log(`BOOM--->API running on port ${PORT}`)
})