const http = require('http')
const querystring = require('querystring')
const jwt = require('jsonwebtoken')
const redis = require('redis')

// 统一登入流程
// 1、用户第一次登入将会以账户密码生成token，并存储在redis数据库中，将token放入cookie中，以便后续请求自动带上
// 2、后续请求，比较cookie中token是否与redis中一致，如果校验通过则返回请求数据，否则失败

// redis
const client = redis.createClient(6379, '127.0.0.1')
client.on('error', err => {
  console.log('error:' + err)
})

// 获取cookie
const getCookie = (cookieStr, key) => {
  var token = ''
  var arr = null
  cookieStr && cookieStr.split('; ').forEach(item => {
    if (!item) return
    arr = item.split('=')
    if (arr[0] == key) token = arr[1]
  })
  return token
}

let text = async (key)=>{
  // 使用promise将异步变成同步
  return await new Promise((resolve) => {
      client.get(key, function(err, res){
        if (err) throw err
        resolve(res);
      });
  });
}

// 校验cookie中的token
const validToken = (reqToken) => {
  return new Promise(async (resolve, reject) => {
    var token = await text('token')
    if (token) {
      if (token == reqToken) {
        resolve(true)
      } else {
        resolve(false)
      }
    } else {
      resolve(false)
    }
  })
}

// 创建服务
http.createServer(async (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://zsstest.zuel.com:8081",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, HEAD",
    "Access-Control-Allow-Headers": "User-Agent, Origin, Cache-Control, Content-type",
    "Access-Control-Allow-Credentials": "true",
  })
  if (request.method === 'OPTIONS') {
    response.end()
  }
  if (request.url === '/api/getUserInfo.do' && request.method === 'GET') {
    var result = {}
    // 到redis集群中校验token合法性
    var reqToken = getCookie(request.headers.cookie, 'token')
    console.log('request init token:' + request.headers.cookie)
    console.log('request token: ' + reqToken)
    console.log('valid token:' + (await validToken(reqToken)))
    console.log('=============================================')
    if (reqToken && (await validToken(reqToken))) {
      result = {
        status: 0,
        msg: null,
        success: true,
        re: {
          name: '周胜',
          pwd: '123'
        }
      }
    } else {
      // 如果不合法就重定向到sso登入页
      result = {
        status: 401,
        msg: null,
        success: false,
        loginUrl: 'http://sso.zuel.com:8082/#/login'
      }
    }
    response.end(JSON.stringify(result))
  }
}).listen(8887)

console.log('serve is loading~~~')