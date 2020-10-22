const XLSX = require('xlsx')
module.exports = {
  xlsx2json: async file => {
    let result = {}
    const workbook = XLSX.readFile(file.filepath)
    workbook.SheetNames.forEach(i => {
      result[i] = XLSX.utils.sheet_to_json(workbook.Sheets[i])
    })
    return result
  },
  json2xlsx: (json, fileName = 'out') => {
    const result = {
      SheetNames: [],
      Sheets: {}
    }
    let filePath = ''
    if (filename.includes('.xls')) {
      filepath = `res/${fileName}`
    } else {
      filepath = `res/${fileName}.xlsx`
    }
    for (const i in json) {
      result.SheetNames.push(i)
      result.Sheets[i] = XLSX.utils.json_to_sheet(json[i])
    }
    XLSX.writeFile(result, filepath)
  }
}