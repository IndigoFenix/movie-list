require('dotenv').config();

const 	express = require('express');
const 	cors = require('cors');
const 	bodyParser = require('body-parser');
const 	morgan = require('morgan');
const 	mongoose = require('mongoose');
const 	path = require('path');
const 	busboy = require('connect-busboy'); //Parse form data
const 	port = process.env.PORT || 3000;
const 	host = process.env.BASE_URL || 'http://127.0.0.1';

/*
const RedisServer = require('redis-server');
const r_server = new RedisServer(6379);
 
r_server.open((err) => {
  if (err === null) {
  }
});

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});
*/


const app = express();
const   options = {
	socketTimeoutMS: 0,
	keepAlive: true
};

console.log('Starting new build');

mongoose.connect(process.env.DB, options).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database'+ err)}
);

const server = require('http').createServer(app);

app.use(busboy());

app.use(bodyParser.json({limit: '10000000mb'}));
app.use(bodyParser.urlencoded({limit: '10000000mb', extended: true}));
app.set('appName', 'movie-app');

app.set('views', path.join(__dirname + '/HTML'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());

//For a proper app, I would use Redis for this. I'll use a local cache instead for the demo.
/*
	Active users are indexed by id and store all user data, along with a token.
*/
const cache = {
	'active_users':new Map()
}

app.use('/', function (req, res, next) {
	req.cache = cache;
	if (req.header('user_id') && req.header('token')){
		let current_user = cache.active_users.get(req.header('user_id'));
		if (current_user && current_user.token == req.header('token')){
			req.current_user = current_user;
		} else {
			req.current_user = null;
		}
	}
    next();
});

app.use("/api/auth",require("./routes/auth"));
app.use("/api/user",require("./routes/user"));
app.use("/api/movie",require("./routes/movie"));
app.use("/api/categories",require("./routes/categories"));
app.use("/api/populate",require("./routes/populate"));

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(200).send({'error':err.message || 'Unknown Error'});
});

server.listen(port, () => console.log(`listening on port ${port} + host ${host}`));
