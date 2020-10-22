const Service = require('egg').Service
const fs = require('fs')
const { xlsx2json } = require('../utils/xlsxUtil');
class ImsiService extends Service {
  async list() {
    const { app } = this
    const data = await app.mysql.select('imsi_phone')
    return { code: 200, data }
  }
  async update() {
    const { ctx, app } = this
    const file = await ctx.request.files ? ctx.request.files[0] : false
    if (file && fs.statSync(file.filepath).isFile()) {
      try {
        fs.copyFile(`app/public/${file.filename}`, file.filepath, () => {
          console.log(arguments);
        })
        // const result = await xlsx2json(file)
        // const dbData = Object.values(result)[0].map(i => `(${i.IMSI号},${i.手机号})`).join(',')
        // const sql = `INSERT INTO imsi_phone (imsi,phone) VALUES ${dbData} ON DUPLICATE KEY UPDATE phone=VALUES(phone)`
        // const sqlRes = await app.mysql.query(sql)
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