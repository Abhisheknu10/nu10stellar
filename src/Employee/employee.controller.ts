import { Controller, Get, Post, Body, HttpCode ,Delete,Param} from '@nestjs/common';
//import   Stellar  from 'stellar-sdk';
import {EmployeeService} from './employee.service';
import {Employee} from './employee.entity';
import path from 'path';
import axios from 'axios';

import * as stellar from 'stellar-sdk'
//const pair = stellar.Keypair.random()
 
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService){}
 
    @Get('all')
    async getAll():Promise<Employee[]>{
        return await this.employeeService.findAll();
    }

@Post('add/:name')
@HttpCode(201)
async createEmployee(@Param("name") name:String){
	
    const pair = stellar.Keypair.random()



  var _currentemployee = {
    name ,
    secret: pair.secret(),
    publicKey: pair.publicKey()

  };

    await axios.get("/friendbot", {
      baseURL: "https://horizon-testnet.stellar.org",
      //baseURL: "http://127.0.0.1:8000",
      params :{addr :_currentemployee.publicKey}
      
      //http://localhost:8000/friendbot?addr=GAJCCCRIRXAYEU2ATNQAFYH4E2HKLN2LCKM2VPXCTJKIBVTRSOLEGCJZ
      });
    
 return _currentemployee;

}

@Post('update')
@HttpCode(200)
updateEmployee(@Body() employeeToUpdate:any){
	this.employeeService.update(employeeToUpdate);
}

@Delete('delete/:id')
@HttpCode(200)
deleteEmployee(@Param('id') id){
	this.employeeService.delete(id);
}



@Get(':id/checkbalance')
async getBalance(@Param('id') id:String){
	
    //const pair = stellar.Keypair.random()
  //  Employee _currentemployee = new Employee();

  const server = new stellar.Server("https://horizon-testnet.stellar.org");
  const val = await server.loadAccount(id.toString());
  console.log("**************");

  console.log("Balance");
  console.log(val.account_id);
  console.log(val.balances);
  return val.balances;

}

@Get(':id/fundingbalance/:amount')
async getfunding(@Param('id') id:String,@Param('amount') amount:String){
  const aliceSecret = id.toString();
  //axios.get("/friendbot", {
  //baseURL: "https://horizon-testnet.stellar.org",
  //params :{addr :address}
  
 //// }).then(res => {
  //  console.log(res.status);
  ////  return res.status;
//});

const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org", {allowHttp: true});
const {TimeoutInfinite} = require("stellar-base");
//const accounts = require("../accounts.json");

   
// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair.fromSecret(
  "SDYWDVNWSB3N3VX3R5RBPJPD4QZGDSHJJPMLPNQI5TYYOVEPVRBQRCRK",
  );
  var receivingKeys = StellarSdk.Keypair.fromSecret(
    aliceSecret,
  );
    
// Create an object to represent the new asset
var astroDollar = new StellarSdk.Asset("USDC", issuingKeys.publicKey());
// First, the receiving account must trust the asset
server
  .loadAccount(receivingKeys.publicKey())
  .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: astroDollar,
          limit: "1000",
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then(console.log)

  // Second, the issuing account actually sends a payment using the asset
  .then(function () {
    return server.loadAccount(issuingKeys.publicKey());
  })
  .then(function (issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: receivingKeys.publicKey(),
          asset: astroDollar,
          amount: amount,
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then(res => {
     console.log(res.status);
    return "Deposited";
  });
  

 
}






@Get(':id/withdrawbalance')
async getWithdraw(@Param('id') id:String){
  const aliceSecret = id.toString();
  //axios.get("/friendbot", {
  //baseURL: "https://horizon-testnet.stellar.org",
  //params :{addr :address}
  
 //// }).then(res => {
  //  console.log(res.status);
  ////  return res.status;
//});

const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org", {allowHttp: true});
const {TimeoutInfinite} = require("stellar-base");
//const accounts = require("../accounts.json");

   
// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair.fromSecret(
  aliceSecret,
  );
  var receivingKeys = StellarSdk.Keypair.fromSecret(
    "SDSF44WUGURYD3TESVCX2D7A7E262CZOC56ZJ4LP6RI2N2WUWWEVFE6P" ,
  );
    
// Create an object to represent the new asset
var astroDollar = new StellarSdk.Asset("USDC", issuingKeys.publicKey());
// First, the receiving account must trust the asset
server
  .loadAccount(receivingKeys.publicKey())
  .then(function (receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: astroDollar,
          limit: "1000",
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then(console.log)

  // Second, the issuing account actually sends a payment using the asset
  .then(function () {
    return server.loadAccount(issuingKeys.publicKey());
  })
  .then(function (issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: receivingKeys.publicKey(),
          asset: astroDollar,
          amount: "100",
        }),
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then(res => {
     console.log(res.status);
    return "Withdraw";
  });
  

 
}
// @Get(':id/gettransaction')
// async getTransaction(@Param('id') id:String){
	



// var StellarSdk = require("stellar-sdk");
// var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// var responseval = function (resp :any) {
//   console.log("********");
//   console.log(resp);
//   return resp;
// };

// var es = server
//   .transactions()
//   .forAccount(id.toString())
//   .cursor("now")
//   .stream({ onmessage : responseval });
  

 
// }

}