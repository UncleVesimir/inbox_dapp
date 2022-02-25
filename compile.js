const path = require("path");
const fs = require("fs");
const solc = require ("solc");

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, "utf8");

let compilerInput = {
  language: 'Solidity',
  sources: {
    'Inbox.sol':
    {
      content:source
    }
  },
  settings:
  {
    optimizer:
    {
      enabled: true
    },
    outputSelection:
    {
        '*':{
            '*':['*']
        }
    }
  }
}

output = JSON.parse(solc.compile(JSON.stringify(compilerInput)))

module.exports = output.contracts['Inbox.sol']['Inbox']

// fs.writeFile('contract.json', JSON.stringify(output.contracts["Inbox.sol"]['Inbox']), ()=> {})_

