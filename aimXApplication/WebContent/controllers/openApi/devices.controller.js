var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); // mongoose for mongodb

var Device = mongoose.model('device', {
        name : String,
		userID : String,
		areaID : String,
		state : Number,
		floorPlanX: Number,
		floorPlanY: Number,
		deviceImage: String,
});


router.post('/device/:userID', postDevice);
router.get('/device/:userID', getDevice);
router.delete('/device/:userID/:_id', deleteDevice);
router.put('/deviceUpdate/:userID/:_id', updateDevice);

module.exports = router;

//send back all devices
function getDevice(req, res) {
	// use mongoose to get all devices in the database
	Device.find({userID : req.params.userID}, function(err, devices) 
	{
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(devices); // return all devices in JSON format
	});
};

// create new device and send back all devices
function postDevice(req, res) {
	// create a device, information comes from AJAX request from Angular
	Device.create({
		name : req.body.name,
		userID : req.body.userID,
		areaID : req.body.areaID,
		done : false
	}, function(err, device) {
		if (err)
			res.send(err);

		// get and return all the devices after you create another
		Device.find({userID : req.params.userID}, function(err, devices) {
			if (err)
				res.send(err)
			res.json(devices);
		});
	});

};

// delete a device and send back all devices
function deleteDevice(req, res) 
{
	Device.remove(
	{
		_id : req.params._id
	}, 
	function(err, device) 
	{
		if (err)
			res.send(err);

		// get and return all the devices after you create another
		Device.find({userID : req.params.userID}, function(err, devices) {
			if (err)
				res.send(err)
			res.json(devices);
		});
	});
};

//update device and send back data
function updateDevice(req, res)
{
	
	Device.findOneAndUpdate({_id : req.params._id}, req.body, function(err, devices) 
	{
		console.log(req.body);
		if (err) 
			res.send(err);
		// get and return all the devices after you updated another
		Device.find({userID : req.params.userID}, function(err, devices) 
		{
			if (err)
				res.send(err)
			res.json(devices);
		});
	});
}

