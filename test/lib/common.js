'use strict';

const fs = require('fs')

async function attachFile(fileUpload, filename, callback) {
  await browser.execute(callback, fileUpload)
  await fileUpload.waitForDisplayed();
  await fileUpload.setValue(filename)
}

async function parseTable(table) {
  const thead = await table.$('thead')
  const tbody = await table.$('tbody')

  const theadText = await thead.getProperty('innerText')
  const tbodyText = await tbody.getProperty('innerText')

  const theadArray = theadText.split('\n').map(row => row.split('\t')).slice(0, -1);
  const tbodyArray = tbodyText.split('\n').map(row => row.split('\t')).slice(0, -1);

  // TODO: remove trailing from \n from string instead
  return { thead: theadArray, tbody: tbodyArray }
}

function readCsv(filename, delimiter = ',') {
  const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' }).replace(/\r/g, '\n').replace(/\n\n/g, '\n')
  const lines = data.split('\n').filter(x => x.trim() !== '')
  const header = lines[0].split(delimiter)
  const list = []
  lines.splice(1).forEach((line) => {
    const values = line.split(delimiter)
    if (values.every(x => x.trim() === '')) return
    const obj = header.reduce((acc, key, i) => {
      const match = values[i].match(/^\s*"(.*?)"\s*$/)
      acc[key] = match ? match[1] : values[i];
      return acc
    }, {})
    list.push(obj)
  })
  return list
}

module.exports = {
  attachFile,
  parseTable,
  readCsv
}