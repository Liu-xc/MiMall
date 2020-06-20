let baseURL;
// nodejs中有一个process进程，通过这个进程来获取参数
// 基于CORS和JSONP跨域
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
  default:
    baseURL = 'http://mall-pre.springboot.cn/api'
    break
}

export default {
  baseURL
}