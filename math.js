const fs = require('fs/promises');

path = './teams.json'

fs.readFile(path)
	.then((data) => {
		let parse = JSON.parse(data);

		console.log(parse);

		parse = calculateMean(parse);
		writeToJson(parse);

		parse = calculateSTD(parse);
		writeToJson(parse);
	})
	.then((data) => {
		console.log("Successfully saved changes");
	})
	.catch((error) => {
		console.log("ERROR OPENING FILE: " + error);
	});

const writeToJson = (parse) => {
	return new Promise(function(resolve, reject) {
		fs.writeFile(path, JSON.stringify(parse), function(err) {
			if(err) reject(err);
			else resolve(parse);
		});
	});
}

const calculateSTD = (parse) => {
	for(let i = 0; i < parse.teams.length; i++) {
		let currentMean = parse.teams[i].mean;
		let currentPicks = parse.teams[i].picks;
  		let std = Math.sqrt(currentPicks.map(x => Math.pow(x - currentMean, 2)).reduce((a, b) => a + b) / currentPicks.length);
		parse.teams[i].std = std;
	}

	return parse;
}

const calculateMean = (parse) => {
	for(let i = 0; i < parse.teams.length; i++) {
		let newMean = 0;
		let currentTeam = parse.teams[i];

		for(let j = 0; j < currentTeam.picks.length; j++) {
			newMean += currentTeam.picks[j];
		}

		newMean /= currentTeam.picks.length;

		parse.teams[i].mean = Math.round(newMean);
	}

	return parse;
}