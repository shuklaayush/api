const zones = require('../tmp/zones.json')
const fs = require('fs')
const moment = require('moment-timezone')

var dir = './tmp/zones_daily/'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const now = moment().unix()
var date = moment.unix(now)
formated_date = date.tz('Asia/Kolkata').format('YYYY-MM-DD')

var today_dir = dir + formated_date
var latest_dir = dir + 'latest'
if (!fs.existsSync(today_dir)) {
  fs.mkdirSync(today_dir)
}
if (!fs.existsSync(latest_dir)) {
  fs.mkdirSync(latest_dir)
}
var zones_string = JSON.stringify(zones, null, 2)
fs.writeFileSync(today_dir + '/zones.json', zones_string)
fs.writeFileSync(latest_dir + '/zones.json', zones_string)
