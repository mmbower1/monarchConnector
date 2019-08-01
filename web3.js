const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction
const net = require('net');
const abi = require('./config/abi.json');
const fs = require('fs');
const User = require('./models/User'); 
const keys = require('./config/keys');

// ganashe connection
// const web3 = new Web3('http://127.0.0.1:7545');

// console.log(Web3);
// console.log(web3.eth.accounts.create());

// infura testnet connection will be swtiched to monarch node
const web3 = new Web3('https://node.ethereum.monarchtoken.io');

function transaction(receivingAddress, tokens, user) {
    console.log(" ");
    console.log("Tokens: " + tokens);
    console.log(" ");
    console.log("User in web3: " + user);
    console.log(" ");
    const amount = web3.utils.toWei(String(tokens), 'ether');
    console.log("Amount in wei: " + amount);
    console.log(" ");
    console.log("Post toWei");

    // // get balance of an address
    // web3.eth.getBalance(fromAddress, (err, bal) => {
    //     // gets balance
    //     balance = bal;
    //     // gets eth balance in wei units
    //     balance = web3.utils.fromWei(bal, 'ether');
    //     console.log('contractAddress balance: ', web3.utils.fromWei(bal, 'ether'))
    // });

        // real transaction sent to user accounts broadcasted on eth network
        web3.eth.getTransactionCount(keys.fromAddress2, "pending", (err, txCount) => {
            if(err){
                console.log("error: " + err);
            }
            
            console.log("getTransactionCount");
        
            // const fromContract = new web3.eth.Contract(abi, contractAddress, { from : keys.fromAddress2 });
            console.log("fromContract: " + keys.fromContract);
            
            // const receivingContract = fromContract.methods.transfer(receivingAddress, amount).encodeABI();
            console.log('txCount:', txCount);

            // const gasPrice = web3.eth.getGasPrice().then(console.log);

            // // build transaction
            // const txObject = {
            //     nonce: web3.utils.toHex(txCount),
            //     to: keys.contractAddress,
            //     from: keys.fromAddress2,
            //     value: '0x',
            //     gasLimit: web3.utils.toHex(200000),
            //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            //     data: keys.receivingContract,
            //     chainId: 1,
            // }
            // console.log('txObject:', txObject);

            // // sign transaction
            // const tx = new Tx(txObject);
            // tx.sign(keys.fromAddressPrivateKey2);
        
            // // serialize transaction
            // const serializedTransaction = tx.serialize();
            // const raw = '0x' + serializedTransaction.toString('hex');

            // // broadcast transaction. txHash identifies the transaction
            // web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            //     console.log('txHash:', txHash);
            //     console.log(`has errors: ${err}`);

            //     updateHash(txHash, user);
            // }).on('receipt', console.log);

            queueUpTransaction(user);

            //updateHash(txHash, user);
            
        // sends raw to weeklyTransaction file for multisender/cronjob
        // queueUpTransaction(email, wallet, balance, user);
    });
}

// //  appends the txHash string to mongodb
// async function updateHash(_txHash, user){
//     console.log("_txHash: " + _txHash);
//     var query = {'_id':user._id};
//     console.log(" ");
//     console.log("user._id: " + user._id);

//     await User.updateOne(query, {txHash: _txHash}, {upsert:true, strict: false}, 
//         function(err, doc){
//             if (err) return res.send(500, { error: err });
//             console.log("User Updated Successfully" );
//     });
// }


// holds wallet address in a weekly queue before finalizing transaction
function queueUpTransaction(user){
    console.log(" ");
    console.log("queueUpTransaction entered");
    console.log(" ");
    console.log(" user: " + user);
    fs.readFile('weeklyTransactions.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            console.log("No error in queueUpTransaction");
            obj = JSON.parse(data); //now its an object
            console.log("obj: " + obj);
            obj.table.push({email: user.email, wallet: user.wallet, balance: user.balance}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('weeklyTransactions.json', json, 'utf8', (err) => { 
                // In case of a error throw err. 
                if (err) throw err; 
                console.log("Success in queueUpTransaction")
            });
        }
    });
}

module.exports = transaction;