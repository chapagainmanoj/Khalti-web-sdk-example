require('dotenv').config();

var requestp= require('request-promise');

var KHALTI_VERIFY = 'https://khalti.com/api/v2/payment/verify/';

var express = require('express'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
	app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var router = express.Router();

// EXPRESS CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// var secret_key = process.env.KHALTI_SECRET_KEY;
var secret_key = 'test_secret_key_xxxxxxxx'


router.post('/test',(req,res)=>{
	console.log(req.body.testdata);
	// res.jsonp({
	// 	uuid:'transactions-UUID',
	// 	status:'success'
	// });
	res.status(500).send({
		error: 'this is error',
		status: 'error'
	})
});

// ROUTES
router.post('/charge', function(req, res) {
	// console.log(payload);

	var KHALTI_VERIFY = 'https://khalti.com/api/v2/payment/verify/';
	let options = {
	  method: 'POST',
	  uri: KHALTI_VERIFY,
	  body: JSON.stringify({
	    'token': req.body.token,
	    'amount': req.body.amount
	  }),
	  headers: {
	    "Authorization": 'Key test_secret_key_b6b009c3ce3d4cd79c501de3bca3610f',
	    "Content-Type": 'application/json'
	  }
	}
	requestp(options)
	.then((result)=>{
	  console.log('charged', result);
	  var uuid = "transactions-UUID-xxx"; // get uuid
	    res.jsonp({
	      data: result,
	      status: "success"
	    });
	})
	.catch((error)=> {
	  res.status(500).send({
			error: error.response.data,
			status: 'failed',
		});
	});
});

app.use('/', router);

// Start server
app.listen(port, function(){
  console.log('Server listening on port ' + port)
});
