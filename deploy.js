require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {evm, abi} = require('./compile');

const MNEUMONIC = process.env.MNEUMONIC;
const INFURA_ENDPOINT = process.env.INFURA_ENDPOINT;
const initialString = 'Hi there!';
const gasLimit = '1000000'

const provider = new HDWalletProvider(MNEUMONIC, INFURA_ENDPOINT);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from account: ${accounts[0]}`);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [initialString]})
    .send({gas: gasLimit, from: accounts[0]});

  console.log(`Contract deloped to:${result.options.address}`);
  provider.engine.stop();
};

deploy();