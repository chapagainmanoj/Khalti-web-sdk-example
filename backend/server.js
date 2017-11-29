require('dotenv').config();

var axios = require('axios');
var khalti_url = 'https://khalti.com/api/payment/verify/';

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

var secret_key = process.env.KHALTI_SECRET_KEY;

// router.post(/pending)
router.post('/transactions',(req,res)=>{
	// console.log("Createing Transactions");
	// do database stuffs here
	var uuid = "transactions-UUID-xxx";
	res.json({
		uuid:uuid,
		status:'pending'
	});
});

// ROUTES
router.post('/charge', function(req, res){
	axios.post( khalti_url,
		{ token: req.body.token, amount: req.body.amount },
		{ "Authorization": `Key ${secret_key}`}
	)
	.then((result)=>{
		var uuid = "transactions-UUID-xxx"; // get uuid
		console.log('charging');
		// console.log(result);
			// your business logic
			res.json({
				uuid: uuid,
				status: "paid"
			});
	})
	.catch((error)=> console.error(error));
});


app.use('/', router);

// Start server
app.listen(port, function(){
  console.log('Server listening on port ' + port)
});
