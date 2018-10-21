var express = require('express');
var router = express.Router();
var nem = require("nem-sdk").default;
var fs = require("fs");

/* GET home page. */
router.get('/genkey', function(req, res, next) {
  console.log(req.query.userName);

  // Create random bytes from PRNG
  var rBytes = nem.crypto.nacl.randomBytes(32);

  // Convert the random bytes to hex
  var privateKey = nem.utils.convert.ua2hex(rBytes);
  res.json({message: privateKey});
  //res.render('index', { title: 'Express' });
});

router.post('/entryInfo', function (req, res, next) {
  var entryUserKey = "1a28f43f06ced148ca7852f839fbe65aa7bc17e8c37779041d5396d36e9c2297";
  var productKey = "TACY7PKC5OFDYUSNIALG6TFNTTAOFMAYRMA3CSAD";


  var message = req.body.message;
  // Include the library
  var nem = require("nem-sdk").default;

  // Create an NIS endpoint object
  var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

  // Create a common object holding key
  //登录人
  var common = nem.model.objects.create("common")("", entryUserKey);

  // Create an un-prepared transfer transaction object
  // 录入的商品
  var transferTransaction = nem.model.objects.create("transferTransaction")(productKey, 0, message);

  // Prepare the transfer transaction object
  var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);

  // Serialize transfer transaction and announce
  nem.model.transactions.send(common, transactionEntity, endpoint);
})

router.get('/getInfo', function(req, res, next) {
  var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  var address = req.query.key;
  nem.com.requests.account.transactions.all(endpoint, address).then(function(response) {
    res.json(response)
  }, function(err) {
    res.json(err)
  });
});

//创建钱包
router.post('/create', function (req, res, next) {
  var walletName = req.body.walletName;
  var password = req.body.password;

  var wallet = nem.model.wallet.createBrain(walletName, password, nem.model.network.data.testnet.id);

  // Convert stringified wallet object to word array
  var wordArray = nem.crypto.js.enc.Utf8.parse(JSON.stringify(wallet));

  // Word array to base64
  var base64 = nem.crypto.js.enc.Base64.stringify(wordArray);

  fs.writeFile(walletName+'.wlt', base64,  function(err) {
    if (err) {
      res.json(err);
      return console.error(err);
    }
    res.send('success');
  });

})

module.exports = router;
