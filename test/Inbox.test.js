const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {abi, evm} = require("../compile");

let accounts;
let inbox;
const initialString = 'Hi there!'

beforeEach( async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one ot hose accounts to delpoy contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [initialString]})
    .send({from: accounts[0], gas: '1000000'});
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, initialString );
  });

  it('can change the message', async () => {
      const newMessage = 'Bye there!';
      await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
      setMessage =  await inbox.methods.message().call();
      assert.strictEqual(setMessage, newMessage);
  })
})
