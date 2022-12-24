function makeId() {
  return (Math.random() + 1).toString(36).substring(2)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) 
}

module.exports = { makeId, getRandomInt }
