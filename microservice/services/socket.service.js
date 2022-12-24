var gIo
function setUp(server, cors) {
  const { Server } = require('socket.io')
  gIo = new Server(server, { cors })
  gIo.on('connection', (socket) => {
    console.log('a user connected')
    console.info(`Socket ${socket.id} has connected to tasks namesapce`)
  })
}

function emit(eventname, data) {
  gIo.emit(eventname, data)
}
module.exports = { setUp, emit }
