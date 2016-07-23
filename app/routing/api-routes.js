var friends = require("../data/friends.js");
var path = require("path");

module.exports = function(app){

	app.get('/api/theList', function(req, res){
		res.json(friends);
	});

	app.post('/api/theList', function(req, res){
		var lowestDifferenceInt = 50;
		var chosenMatch;
		friends.forEach(function(storedUserObject){
			var difference = 0;
			for(i=0;i<storedUserObject.friendScores.length;i++){
				difference+=Math.abs(storedUserObject.friendScores[i] - req.body.friendScores[i]);
			} if(difference<lowestDifferenceInt){
				lowestDifferenceInt = difference;
				chosenMatch = storedUserObject;
			}
		});

		res.json(chosenMatch);
		friends.push(req.body);
	});
}