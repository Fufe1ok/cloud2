// const express = require('express');
// const app = express();
const roomApi = require("./roon_api.js");


// // Add scoped middleware for all-users endpoint
// app.use('/all-users', function(req, res, next) {
//   console.log("in scoped middleware function of /all-users");
//   if (!req.headers.admin_token) {
//     throw("No admin authentication token provided");
//   }
//   next();
// });

// // Add global middleware applicable for all endpoints
// app.use(function(req, res, next) {
//   console.log("in global middleware function");
//   if (!req.headers.token) {
//     throw("No authentication token provided");
//   }
//   next();
// });


// // Root endpoint
// app.get('/', (req, res) => {
//   res.send('Hello World!!!')
// });
//
// // Get all user endpoint
// app.get('/all-users', async (req, res) => {
//   try {
//     user = new users();
//     let data = await user.getAllUsers();
//     if (data == null) {
//       res.status(404).send("No record found")
//     }
//     res.send(data)
//   }catch (err) {
//     res.status(500).send({err})
//   }
// });
//
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// const mongoose = require('mongoose');

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = 8080;
const app = express();
app.use(cors());
const router = express.Router();

// // this is our MongoDB database
// const dbRoute =
//   'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';

// connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });

// let db = mongoose.connection;

// db.once('open', () => console.log('connected to the database'));
//
// // checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getRooms', async (req, res) => {
  try {
    room_api = new roomApi();
    let data = await room_api.getAllRooms();
    if (data == null) {
      res.status(404).send("No record found")
    }
    // res.send(data);
    res.json({success: true, data: data});
  } catch (err) {
    res.status(500).send({err})
  }
  return '{value : "Hello world"}';
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateRoom', async (req, res) => {
  const {id, update} = req.body;
  console.log('update');

  // Data.findByIdAndUpdate(id, update, (err) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteRoom', (req, res) => {
  const {id} = req.body;
  console.log('delete');
  // Data.findByIdAndRemove(id, (err) => {
  //   if (err) return res.send(err);
  //   return res.json({ success: true });
  // });
});

// this is our create methid
// this method adds new data in our database

// let counterOfPostRequest = 0;

router.post('/putRoom', async (req, res) => {
  // let data = new Data();

  // counterOfPostRequest++;
  // console.log(counterOfPostRequest);
  const {roomData} = req.body;


  try {
    room_api = new roomApi();
    let data = await room_api.addRoom(roomData);
    res.json({ success: true })
  } catch (err) {
    res.status(500).send({err})
  }




  // if ((!id && id !== 0) || !message) {
  //   return res.json({
  //     success: false,
  //     error: 'INVALID INPUTS',
  //   });
  // }
  // data.message = message;
  // data.id = id;
  // data.save((err) => {
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true });
  // });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));