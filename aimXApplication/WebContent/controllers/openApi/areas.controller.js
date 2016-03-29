var config = require('config.json');
var express = require('express');
var router = express.Router();
//var userService = require('services/user.service');

var mongoose = require('mongoose'); // mongoose for mongodb

var Area = mongoose.model('area', {
        name : String,
		parentID : String,
		userID : String,
});


router.post('/:userID', postArea);
router.get('/:userID', getAreas);
router.delete('/:userID/:_id', deleteArea);


module.exports = router;


function getAreas(req, res) {
	// use mongoose to get all areas in the database

	Area.find({userID : req.params.userID}, function(err, areas) 
	{
	console.info("test "+req.params.userID);

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(areas); // return all areas in JSON format
	});
};

// create area and send back all areas after creation
function postArea(req, res) {
	// create a area, information comes from AJAX request from Angular

	console.info("testing"+req.body.userID);
	Area.create({
		name : req.body.name,
		parentID : req.body.parentID;
		userID : req.body.userID,

		done : false
	}, function(err, area) {
		if (err)
			res.send(err);

		// get and return all the areas after you create another
		Area.find({userID : req.params.userID}, function(err, areas) {

			if (err)
				res.send(err)
			res.json(areas);
		});
	});

};

// delete a area
function deleteArea(req, res) 
{
	Area.remove(
	{
		_id : req.params._id
	}, 
	function(err, area) 
	{
		if (err)
			res.send(err);

		// get and return all the areas after you create another
		Area.find({userID : req.params.userID}, function(err, areas) {

			if (err)
				res.send(err)
			res.json(areas);
		});
	});
};
