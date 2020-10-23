const Service = require('egg').Service
const fs = require('fs')
const { xlsx2json } = require('../utils/xlsxUtil')
class ImsiService extends Service {
  async list() {
    const { app } = this
    const result = await app.mysql.select('imsi_phone')
    const data = {}
    result.forEach(i => {
      data[i.imsi] = i.phone
    })
    return { code: 200, data }
  }
  async update() {
    const { ctx, app } = this
    const file = (await ctx.request.files) ? ctx.request.files[0] : false
    if (file && fs.statSync(file.filepath).isFile()) {
      try {
        fs.copyFile(
          file.filepath,
          `app/public/upload/${new Date().getTime()}_${file.filename}`,
          error => {
            console.log(error)
          }
        )
        const result = await xlsx2json(file)
        const dbData = Object.values(result)[0]
          .filter(i => i.IMSI号)
          .map(i => `(${i.IMSI号},${i.手机号})`)
          .join(',')
        let sqlRes = '表格内容格式错误'
        if (dbData) {
          const sql = `INSERT INTO imsi_phone (imsi,phone) VALUES ${dbData} ON DUPLICATE KEY UPDATE phone=VALUES(phone)`
          sqlRes = await app.mysql.query(sql)
        }
        return { code: 200, data: sqlRes }
      } catch (error) {
        return error
      } finally {
        fs.unlink(file.filepath, () => { })
      }
    } else {
      return { code: -1, data: '请上传表格' }
    }
  }
}
module.exports = ImsiService
