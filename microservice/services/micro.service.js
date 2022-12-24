const { runWorker } = require('./worker.service')

async function preformTask(isWorkerOn) {
  try {
    runWorker(isWorkerOn)
    console.log('worker is running')
  } catch (error) {}
}

module.exports = { preformTask }
