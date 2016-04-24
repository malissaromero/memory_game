var express = require('express');

var mongo = require('mongodb');

// Get the router
var router = express.Router();
var Data = require('./models/message');

var mongoose = require("mongoose");
db = mongoose.connect('mongodb://localhost/memorydb')

// Middleware for all this routers requests
router.use(function (request, response, next) {
  request.db = db;
  next();
});

// router.use('/users', data);

router.route('users/adduserdata')
  .post(function(request, response) {
    var user = request.body.user;
    var relativeName = request.body.relativeName;
    var photo = request.body.photo;
  });

// GET all messages (using a GET at http://localhost:8080/messages)
router.route('/users')
  .get(function(request, response) {
    Data.find(function(error, messages) {
      if (error)
        response.send(error);
        response.json(messages);
    });
  });

// Create a message (using POST at http://localhost:8080/messages)
router.route('/users')
  .post(function(request, response) {
    var data = new Data();
      // Set text and user values from the request
	    data.user = request.body.user;
      data.relativeName = request.body.relativeName;
      data.photo = request.body.photo;

      // Save message and check for errors
      data.save(function(error) {
        if (error)
          response.send(error);
          response.json({ message: 'data created successfully!' });
      });
  });

// GET message with id (using a GET at http://localhost:8080/messages/:message_id)
router.route('/users/:user_id')
  .get(function(request, response) {
    Data.findById(request.params.user_id, function(error, message) {
      if (error)
        response.send(error);
        response.json(message);
    });
  });

// Update message with id (using a PUT at http://localhost:8080/messages/:message_id)
router.route('/users/:user_id')
  .put(function(request, response) {
    Data.findById(request.params.user_id, function(error, message) {
      if (error)
        response.send(error);
          // Update the message text
	        message.text = request.body.text;
          message.save(function(error) {
            if (error)
              response.send(error);
              response.json({ message: 'data successfully updated!' });
          });
    });
  });

// Delete message with id (using a DELETE at http://localhost:8080/messages/:message_id)
router.route('/users/:user_id')
  .delete(function(request, response) {
    Data.remove({
      _id: request.params.user_id
    }, function(error, message) {
      if (error)
        response.send(error);
        response.json({ message: 'Successfully deleted data!' });
    });
  });

module.exports = router;
