var config = require('config.json');
var express = require('express');
var router = express.Router();
//var userService = require('services/user.service');

var mongoose = require('mongoose'); // mongoose for mongodb

var Todo = mongoose.model('Todo', {
        text : String,
		userID : String,
});


router.post('/post/:userID', postTodo);
router.get('/get/:userID', getTodo);
router.delete('/delete/:_id/:userID', deleteTodo);

module.exports = router;


function getTodo(req, res) {
	// use mongoose to get all todos in the database
	Todo.find({userID : req.params.userID}, function(err, todos) 
	{
	console.info("test "+req.params.userID);
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(todos); // return all todos in JSON format
	});
};

// create todo and send back all todos after creation
function postTodo(req, res) {
	// create a todo, information comes from AJAX request from Angular
	console.info("testing"+req.body.userID);
	Todo.create({
		text : req.body.text,
		userID : req.body.userID,
		done : false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find({userID : req.params.userID}, function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});

};

// delete a todo
function deleteTodo(req, res) 
{
	Todo.remove(
	{
		_id : req.params._id
	}, 
	function(err, todo) 
	{
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find({userID : req.params.userID}, function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
};
