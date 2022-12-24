import axios from 'axios'
import { httpService } from './http.service.js'
const baseUrl = 'task/'

// window.crudService = crudService
async function query() {
  return await httpService.get(baseUrl)
}

async function getById(entityId) { }

async function remove(entityId) {
  console.log('baseUrl+entityId:', baseUrl + entityId)
  httpService.delete(baseUrl + entityId)
}

async function getEmptyItem() { }
async function save(entity) {
  if (entity._id) {
    return await httpService.put(baseUrl + entity._id, entity)
  }
  console.log(entity)
  return await httpService.post(baseUrl, entity)
}

async function start(itemId) {
  return await httpService.get(baseUrl + itemId + '/start')
}
function getActivity() {
  // crudService.getActivities()
}
async function toggleWorker(isWorkerRunning) {
  try {
    await axios.get(`http://127.0.0.1:3322/`,  {params:{isWorkerRunning}} )
} catch (error) { }
}

async function generate() {
  // todo toggle run worker
  try {
    return await httpService.put(baseUrl + '/1234/start')
  } catch (error) { }
}

async function microService() {
  await axios.get('http://127.0.0.1:3322/')
}

export const itemService = {
  query,
  getById,
  remove,
  getEmptyItem,
  save,
  getActivity,
  start,
  toggleWorker,
  generate,
  microService,
}
