// const express = require("express");
// const cron = require("node-cron");
// const fs = require("fs");
// const Web3 = require('web3');
// const User = require('./models/User');
// const Tx = require('ethereumjs-tx').Transaction
// const net = require('net');
// const abi = require('./config/abi.json');
// app = express();

// // local
// // const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/111c37ca46de4d2683e84890812025e7"));
// // production
// const web3 = new Web3('https://node.ethereum.monarchtoken.io');

// function cronJob() {
//     // every sunday @ midnight: 0 0 * * 0 || by the minute: * * * * * 
//     cron.schedule("0 0 * * 0", function() {
//         // Open WeeklyTransactions File and Process each raw entry one at a time
//         fs.readFile('weeklyTransactions.json', 'utf8', function readFileCallback(err, data){
//             if (err){
//                 console.log(err);
//             } else {
//                 obj = JSON.parse(data); //now its an object
//                 var user_transaction = obj.table;

//                 console.log("user transaction: " + user_transaction);
//                 console.log("user transaction.length: " + user_transaction.length);
                
//                 if(user_transaction != undefined && user_transaction.length > 0){
//                     user_transaction.forEach(processRawText);
//                 }
                    
//             }
//         });

//         // Function for forEach loop above
//         function processRawText(item, index) {
//             var raw_text = item.raw
//             var user = item.user;
//             console.log("============================ Processing Raw Text =====================");
//             console.log("Raw Text: " + raw_text);
            
//             // Broadcast transaction. TODO Comment Back In Later
//             web3.eth.sendSignedTransaction(raw_text, (err, txHash) => {
//                 if(err) console.log(err);
//                 console.log('txHash returned:', txHash);
//                 // Step 1) Update user in db with txHash
//                 // TODO might need to move into another callback later
//                 // .once('transactionHash', function(hash){ ... })
//                 // .once('receipt', function(receipt){ ... })
//                 // .on('confirmation', function(confNumber, receipt){ ... })
//                 updateUser(txHash, user, index);
//                 // Step 2) Remove object in weeklyTransactions table for users 
//             }).on('receipt', () => {
//                 console.log("Received transactions");
//             });
//         }
//     });
// }



// //updates weekly json file
// function updateWeeklyTxTable(index){
//     fs.readFile('weeklyTransactions.json', 'utf8', function readFileCallback(err, data){
//         if (err){
//             console.log(err);
//         } else {
//             obj = JSON.parse(data); //now its an object
//             var user_transaction = obj.table;

//             if (user_transaction != undefined && user_transaction.length > 0){
//                 // Step 1) Remove element at location index
//                 user_transaction.splice(index,1);
                
//                // Insert back into file after removal
//                 var output = JSON.stringify({table: user_transaction});
//                 fs.writeFile('weeklyTransactions.json', output, function (err) {
//                     if (err) return console.log(err);
//                     console.log("Scheduled transaction removed");                
//                 });
//             }   
//         }
//     });
// }

// module.exports = {
//     startCronJob: cronJob()
// };
