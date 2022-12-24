const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const socketService = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { txt: '' }) {
    try {
        // const criteria = {
        //     vendor: { $regex: filterBy.txt, $options: 'i' }
        // }
        const collection = await dbService.getCollection('task')
        var tasks = await collection.find().toArray()
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
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: ObjectId(taskId) })
        return taskId
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
        throw err
    }
}

async function add(task) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.insertOne(task)
        return task
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}

async function update(task) {
    try {
        var id = ObjectId(task._id)
        var temp = task._id
        delete task._id

        const collection = await dbService.getCollection('task')
        await collection.updateOne({ _id: id }, { $set: { ...task } })
        task._id = temp
        socketService.emitTo({ type: 'update-task', data: task })
        return task
    } catch (err) {

        throw err
    }
}

async function performTask(task) {
    try {
        task.status = 'running'
        await update(task)
        await _execute(task)

        task.status = 'done'
        task.doneAt = Date.now()

    } catch (err) {
        task.status = 'failed'
        task.errors.push(err)

    } finally {

        task.lastTried = Date.now()
        task.triesCount += 1
        await update(task)
        return task
    }
}

async function getNextTask() {
    try {
        var tasks = await query()
        tasks = tasks.filter(t => {
            return ((t.status === 'failed' && t.triesCount < 5) || t.status === 'new task')
        })
        tasks.sort((a, b) => b.importance - a.importance)
        if (tasks) return tasks[0]
        return null

    } catch (err) {
        console.log(err)
    }
}

function _execute(task) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
            else reject('High Temparture');
        }, 2000)
    })
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    performTask,
    getNextTask
}
