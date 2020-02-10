const info = {
  // 基本错误
  500: {

  },
  400: {

  },
  401: {

  },
  402: {

  },

  // 状态码为200时
  // 用户认证 10000
  LOGIN_SUCCESS: {
    code: 10001,
    msg: '登录成功'
  },
  // 音乐操作 20000
  GET_MUSIC_LIST: {
    code: 20002,
    msg: '获取音乐列表成功'
  }
  // 列表操作 30000

  // 歌手操作
}

const success = function(responseName, data) {
  return {
    code: info[responseName].code,
    msg: info[responseName].msg,
    data: data || []
  }
}

const error = function(responseName, err) {
  return {
    code: info[responseName].code,
    msg: info[responseName].msg,
    err: err || ''
  }
}


module.exports = {

}