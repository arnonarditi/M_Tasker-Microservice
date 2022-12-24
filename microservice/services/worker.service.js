const taskService = require('./task.service')
let gIsWorkerOn

async function runWorker(isWorkerOn) {
  if (isWorkerOn!==undefined) gIsWorkerOn = isWorkerOn

  if (!gIsWorkerOn) return
  var delay = 4000
  try {
    const task = await taskService.getNextTask()
    console.log('task:', task)
    if (task) {
      try {
        await taskService.performTask(task)
      } catch (err) {
        console.log(`Failed Task`, err)
      } finally {
        delay = 1
      }
    } else {
      console.log('Snoozing... no tasks to perform')
    }
  } catch (err) {
    console.log(`Failed getting next task to execute`, err)
  } finally {
    setTimeout(runWorker, delay)
  }
}

module.exports = { runWorker }
