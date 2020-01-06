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

// 创建服务
http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://sso.zuel.com:8082",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "User-Agent, Origin, Cache-Control, Content-type",
      "Access-Control-Allow-Credentials": "true",
    })
    response.end()
  }
  if (request.url === '/api/login.do' && request.method === 'POST') {
    // 获取请求参数
    var data = ''
    var result = {}
    request.on('data', (chunk) => {
      data += chunk
    })
    request.on('end', () => {
      data = decodeURIComponent(data)
      data = querystring.parse(data)
      if (data.account === '123' && data.pwd === '123') {
        token = jwt.sign({
          account: data.account,
          pwd: data.pwd,
          time: new Date().getTime()
        }, 'xxxxx')
        // token = token.substring(0, token.indexOf('.'))
        console.log('token: ' + token)
        client.set('token', token, redis.print);
        response.setHeader('Set-Cookie', `token=${token};Path=/;domain=.zuel.com;expires=1`)
        // response.setHeader('Location', `${data.loginUrl}`)
        result = {
          status: 0,
          msg: null,
          success: true,
          re: null
        }
        console.log('loginUrl: ' + data.loginUrl)
      } else {
        result = {
          status: 1,
          msg: '账户密码错误，请重新登入',
          success: false,
          re: null
        }
      }
      // writeHead需在setHeader后才有效
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://sso.zuel.com:8082",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "User-Agent, Origin, Cache-Control, Content-type",
        "Access-Control-Allow-Credentials": "true",
      })
      response.end(JSON.stringify(result))
    })
  } 
}).listen(8888)

console.log('serve is loading~~~')