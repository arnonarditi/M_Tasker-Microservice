const { getRandomInt } = require('./util.service')

function execute() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
      else reject(getRandomError())
    }, 1000)
  })
}

function getRandomError() {
  const errors = [
    'Not enough memory',
    'No motivation to execute',
    'Error on server side',
    'Task over Due',
  ]

  return errors[getRandomInt(0, errors.length)]
}

module.exports = {
  execute,
}
