const http = require('http')

const hostname = '127.0.0.1'
const port = 3322

const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
}

const socketService = require('./services/socket.service')
const microService = require('./services/micro.service')


const server = http.createServer((req, res) => {
  const isWorkerOn = req.url.includes('true') ? true : false
  microService.preformTask(isWorkerOn)
  res.end('micro service is on')
})

socketService.setUp(server, corsOptions)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
