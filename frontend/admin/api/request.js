import axios from 'axios'

const request = async (q, url) => {
  let response

  let query = q || {}

  // let method = query.method || 'get'
  // let data = query.method || {}
  await axios({
    url,
    method: query.method || 'get',
    data: query.data || {}
  }).then(res => {
    response = res
  }).catch(err => {
    response = err
  })
  return response
}

export default { request }