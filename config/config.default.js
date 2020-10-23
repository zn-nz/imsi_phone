/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603256448129_7019'
  config.security = {
    csrf: {
      enable: false,
      headerName: 'x-csrf-hp-wifi' // 自定义请求头,默认为'x-csrf-token'
    }
  }

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host！！！都是生产环境
      host: '15.112.20.110', // 本地
      // host: '15.17.26.109',// Liunx服务器
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Kingnet318*',
      // 数据库名
      database: 'hp_wifi'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }
  config.multipart = {
    fileSize: '20mb',
    // mode: 'stream',
    mode: 'file',
    whitelist: ['.xlsx', '.xls']
  }
  return {
    ...config,
    ...userConfig
  }
}
