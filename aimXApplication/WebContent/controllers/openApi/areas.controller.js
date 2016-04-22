var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); // mongoose for mongodb

var Area = mongoose.model('area', {
        name : String,
		userID : String,
		parentID : String,
});


router.post('/area/:userID', postArea);
router.get('/area/:userID', getAreas);
router.delete('/area/:userID/:_id', deleteArea);
router.put('/areaUpdate/:userID/:_id', updateArea);

module.exports = router;


function getAreas(req, res) {
	// use mongoose to get all areas in the database

	Area.find({userID : req.params.userID}, function(err, areas) 
	{

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(areas); // return all areas in JSON format
	});
};

// create area and send back all areas after creation
function postArea(req, res) {
	// create a area, information comes from AJAX request from Angular

	Area.create({
		name : req.body.name,
		parentID : req.body.parentID,
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

//update area and send back data
function updateArea(req, res)
{
	Area.findOneAndUpdate({_id : req.params._id}, req.body, function(err, areas) 
	{
		if (err) 
			res.send(err);
		// get and return all the areas after you updated another
		Area.find({userID : req.params.userID}, function(err, areas) 
		{
			if (err)
				res.send(err)
			res.json(areas);
		});
		
	});
}
