// import { request } from './request'
import Request from './request'
let request = Request.request
let domain = '/'
// let domain = 'http://127.0.0.1:3000/'

const getMusicList = query => { return request(query, domain + 'admin/music/list') }
const getGroupsList = query => { return request(query, domain + 'admin/groups/list') }
const createMusic = query => { return request(query, domain + 'admin/music/create') }
const createGroups = query => { return request(query, domain + 'admin/groups/create') }
const login = query => { return request(query, domain + 'admin/login') }
const getUploadToken = query => { return request(query, domain + 'admin/upload/token') }


export default {
  getMusicList,
  getGroupsList,
  createMusic,
  createGroups,
  login,
  getUploadToken
}