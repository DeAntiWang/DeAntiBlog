/**
 * 配置环境文件
 */


/**
 * baseUrl: 请求域名前缀
 */

let baseUrl = '';
if(process.env.NODE_ENV === 'test') {
  // 本地测试环境
  baseUrl = '';
}else{
  // 生产环境(相对路径)
  baseUrl = '';
}



export {
  baseUrl
}