var express = require('express');

// Get the router
var router = express.Router();
var Message = require('./models/message');

// Middleware for all this routers requests
router.use(function timeLog(request, response, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// GET all messages (using a GET at http://localhost:8080/messages)
router.route('/messages')
  .get(function(request, response) {
    Message.find(function(error, messages) {
      if (error)
        response.send(error);
        response.json(messages);
    });
  });

// Create a message (using POST at http://localhost:8080/messages)
router.route('/messages')
  .post(function(request, response) {
    var message = new Message();
      // Set text and user values from the request
	    message.text = request.body.text;
      message.user = request.body.user;

      // Save message and check for errors
      message.save(function(error) {
        if (error)
          response.send(error);
          response.json({ message: 'Message created successfully!' });
      });
  });

// GET message with id (using a GET at http://localhost:8080/messages/:message_id)
router.route('/messages/:message_id')
  .get(function(request, response) {
    Message.findById(request.params.message_id, function(error, message) {
      if (error)
        response.send(error);
        response.json(message);
    });
  });

// Update message with id (using a PUT at http://localhost:8080/messages/:message_id)
router.route('/messages/:message_id')
  .put(function(request, response) {
    Message.findById(request.params.message_id, function(error, message) {
      if (error)
        response.send(error);
          // Update the message text
	        message.text = request.body.text;
          message.save(function(error) {
            if (error)
              response.send(error);
              response.json({ message: 'Message successfully updated!' });
          });
    });
  });

// Delete message with id (using a DELETE at http://localhost:8080/messages/:message_id)
router.route('/messages/:message_id')
  .delete(function(request, response) {
    Message.remove({
      _id: request.params.message_id
    }, function(error, message) {
      if (error)
        response.send(error);
        response.json({ message: 'Successfully deleted message!' });
    });
  });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
