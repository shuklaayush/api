const fs = require('fs')
const raw_data = require('../tmp/raw_data.json')

console.log('fetched rawdata')
console.log(raw_data.raw_data.length)

// var pid = [];

var states = {}
var statecodes = []

var dateitems = {}
var dates = []

// var dir_pid = './tmp/cases/pid/';
var dir_state = './tmp/cases/state/'
var dir_date = './tmp/cases/date/'

// statecode
// if (!fs.existsSync(dir_pid)) {
//     fs.mkdirSync(dir_pid, { recursive: true });
// }

if (!fs.existsSync(dir_state)) {
  fs.mkdirSync(dir_state, { recursive: true })
}
if (!fs.existsSync(dir_date)) {
  fs.mkdirSync(dir_date, { recursive: true })
}

raw_data.raw_data.forEach(element => {
  // pid.push(element["patientnumber"])
  // fs.writeFileSync(dir + element["patientnumber"]+'.json', JSON.stringify(element, null, 2)); //this takes more than a minute
  if (!states[element.statecode]) {
    states[element.statecode] = {
      raw_data: []
    }
  }
  states[element.statecode].raw_data.push(element)

  date = element.dateannounced.replace(/\//g, '-')
  if (!dateitems[date]) {
    dateitems[date] = {
      raw_data: []
    }
  }
  dateitems[date].raw_data.push(element)
})

for (key in dateitems) {
  if (!key) continue
  dates.push(key)
  if (!fs.existsSync(dir_date + key)) {
    fs.mkdirSync(dir_date + key, { recursive: true })
  }
  fs.writeFileSync(dir_date + key + '/index.json', JSON.stringify(dateitems[key], null, 2))
}
fs.writeFileSync(dir_date + 'index.json', JSON.stringify(dates, null, 2))

for (key in states) {
  if (!key) continue
  statecodes.push(key)
  if (!fs.existsSync(dir_state + key)) {
    fs.mkdirSync(dir_state + key, { recursive: true })
  }
  fs.writeFileSync(dir_state + key + '/index.json', JSON.stringify(states[key], null, 2))
}
fs.writeFileSync(dir_state + 'index.json', JSON.stringify(statecodes, null, 2))
