const dbService = require('./db.service')
const externalService = require('./external.service')
const socketService = require('./socket.service')
const utilService = require('./util.service')

const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { txt: '' }) {
  try {
    // const criteria = {
    //   vendor: { $regex: filterBy.txt, $title: 'i' },
    // }
    const collection = await dbService.getCollection('task')
    var tasks = await collection.find({}).toArray()
    return tasks
  } catch (err) {
    logger.error('cannot find tasks', err)
    throw err
  }
}

async function getById(taskId) {
  try {
    const collection = await dbService.getCollection('task')
    const task = collection.findOne({ _id: ObjectId(taskId) })
    return task
  } catch (err) {
    logger.error(`while finding task ${taskId}`, err)
    throw err
  }
}

async function remove(taskId) {
  try {
    console.log(taskId)
    const collection = await dbService.getCollection('task')
    await collection.deleteOne({ _id: ObjectId(taskId) })
    return taskId
  } catch (err) {
    logger.error(`cannot remove task ${taskId}`, err)
    throw err
  }
}
async function removeMany(taskId) {
  try {
    const collection = await dbService.getCollection('task')
    const results = await collection.deleteMany()
    return results
  } catch (err) {
    logger.error(`cannot remove task ${taskId}`, err)
    throw err
  }
}

async function add(task) {
  console.log('task:', task)
  try {
    const collection = await dbService.getCollection('task')
    await collection.insertOne(task)
    return task
  } catch (err) {
    logger.error('cannot insert task', err)
    throw err
  }
}

async function addMany(tasks) {
  try {
    const collection = await dbService.getCollection('task')
    const insertResult = await collection.insertMany(tasks)
    return insertResult
  } catch (error) {}
}
async function update(task) {
  try {
    socketService.emit('update-task', task)
    const id = task._id
    delete task._id
    const collection = await dbService.getCollection('task')
    await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...task } })
    task._id = id
    return task
  } catch (err) {
    logger.error(`cannot update task ${task._Id}`, err)
    throw err
  }
}

async function performTask(task) {
  try {
    task.status = 'running'
    await update(task)
    await externalService.execute()
    task.doneAt = Date.now()
    task.status = 'done'
  } catch (error) {
    task.status = 'fail'
    task.errors.push(error)
  } finally {

    task.lastTriedAt = Date.now()
    task.triesCount++
    return await update(task)
  }
}

async function getNextTask() {
  try {
    const tasks = await query()
    tasks.sort((a, b) => b.triesCount - a.triesCount)
    console.log('tasks:', tasks)
    return tasks.filter((task) => task.triesCount <= 5).pop()
  } catch (error) {}
}

function generateTasks() {
  var newTasks = []

  for (let i = 0; i < 10; i++) {
    // generate title
    let wordsCount = utilService.getRandomInt(1, 5)
    let title = ''
    for (let j = 0; j < wordsCount; j++) {
      title += ' ' + words[utilService.getRandomInt(0, words.length)]
    }

    // generate description
    wordsCount = utilService.getRandomInt(1, 15)
    let description = ''
    for (let j = 0; j < wordsCount; j++) {
      description += ' ' + words[utilService.getRandomInt(0, words.length)]
    }

    const importance = utilService.getRandomInt(1, 5)

    newTasks.push(add({ title, description, importance }))
  }
  return newTasks
}

function getRandomTitle() {
  const length = utilService.getRandomInt(1, 5)
  let title = ''
  for (var i = 0; i < length; i++) {
    title += words[utilService.getRandomInt(1, words.length - 1)]
  }
  return title
}
function getRandomDescription() {
  const length = utilService.getRandomInt(1, 5)
  let title = ''
  for (var i = 0; i < length; i++) {
    title += words[utilService.getRandomInt(1, words.length - 1)]
  }
  return title
}

var words = [
  'The sky',
  'above',
  'the port',
  'was',
  'the color of television',
  'tuned',
  'to',
  'a dead channel',
  'All',
  'this happened',
  'more or less',
  'I',
  'had',
  'the story',
  'bit by bit',
  'from various people',
  'and',
  'as generally',
  'happens',
  'in such cases',
  'each time',
  'it',
  'was',
  'a different story',
  'It',
  'was',
  'a pleasure',
  'to',
  'burn',
]
module.exports = {
  addMany,
  remove,
  query,
  getById,
  add,
  update,
  performTask,
  getNextTask,
  generateTasks,
  getRandomTitle,
  getRandomDescription,
  removeMany,
}
