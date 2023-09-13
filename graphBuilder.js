//Repurposing the ChartNew.js library to build gaussian distributions for team draft picks
var globe = {"teams":[{"id":0,"name":"Cardwell's Heroes","picks":[1,2,3,4,4,7,8,9,10,11,12,13,13,14,15,16,18,19,19],"mean":10,"std":5.647542548941554},{"id":1,"name":"Diesel Weasels","picks":[1,2,3,3,4,4,5,5,5,6,6,7,7,8,9,10,11,12,15],"mean":6,"std":3.576237364075618},{"id":2,"name":"Alchoholic Tyrannosaurus","picks":[1,4,7,8,10,11,12,13,14,14,14,15,15,16,17,18,18,19,19],"mean":13,"std":4.909711107376353},{"id":3,"name":"Ayr Flamers","picks":[1,3,8,11,12,12,13,13,14,15,16,16,17,17,17,18,18,19,19],"mean":14,"std":4.936438093669522},{"id":4,"name":"Copes Mafia","picks":[1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,16,17,18,19],"mean":11,"std":5.380275868489703},{"id":5,"name":"Dog Pound","picks":[1,2,2,3,3,4,4,5,5,6,7,8,10,11,12,13,15,17,18],"mean":8,"std":5.1809367167683},{"id":6,"name":"North Kariya","picks":[1,2,5,6,7,9,9,10,10,11,12,12,13,14,16,16,17,18,19],"mean":11,"std":5.03670736221905},{"id":7,"name":"Disorderly Conduct","picks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"mean":10,"std":5.477225575051661},{"id":8,"name":"The Margarita Machines","picks":[1,2,2,3,3,4,5,6,6,6,7,8,9,9,9,10,10,12,17],"mean":7,"std":3.9068091705043444},{"id":9,"name":"Giroux Laich Boyes","picks":[1,2,3,3,4,5,5,6,8,9,11,14,14,15,16,17,17,18,19],"mean":10,"std":6.013143498773508},{"id":10,"name":"Old Milwaukee Maple Leafs","picks":[1,5,6,7,8,9,11,11,12,13,13,14,15,15,16,18,18,19,19],"mean":12,"std":4.963021151211066},{"id":11,"name":"Joncles Bruiser Buds","picks":[1,2,3,6,7,8,9,10,11,12,13,13,14,15,16,17,17,18,19],"mean":11,"std":5.350848432479509},{"id":12,"name":"Team On Purpose Meth","picks":[1,2,2,3,4,4,5,6,7,7,8,8,9,10,10,11,14,15,16],"mean":7,"std":4.346807661043362},{"id":13,"name":"The Nerdz","picks":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"mean":10,"std":5.477225575051661}]}

const returnTeam = () => {
	return globe.teams;
	//let currentTeams = JSON.parse(teams);
	//return teams[0];
}

const buildGraph = (currentTeam) => {
	let newChartObject = {};

	let newData = {
		labels : ["1", 3, 6, "10", 13, 16, "19"],
		xBegin : 1,
		xEnd : 19,
		datasets : [
			{
				strokeColor : "rgba(220, 220, 220, 1)",
				data : [currentTeam.picks],
				xPos : [],
				title : "sinus"
			}
		]
	};

	let gaussVariance = Math.pow(currentTeam.std, 2);
	let gaussMean = currentTeam.mean;

	let nbiter = 400;

	for(let i = 0; i < nbiter; i++) {
		newData.datasets[0].xPos[i]=newData.xBegin+i*(newData.xEnd-newData.xBegin)/nbiter;
		newData.datasets[0].data[i]=(1/(gaussVariance*Math.sqrt(2*Math.PI))) * Math.exp(-((newData.datasets[0].xPos[i]-gaussMean)*(newData.datasets[0].xPos[i]-gaussMean))/(2*gaussVariance));
	}

	let tempString = '';

	for(let i = 0; i < currentTeam.picks.length; i++) {
		tempString += '[' + currentTeam.picks[i] + '] ';
	}

	let options = {
		canvasBorders : true,
		canvasBordersWidth : 3,
		canvasBordersColor : "black",
		graphTitle : currentTeam.name +'\n' + "PICKS: "+ tempString,
		legend : true,
		datasetFill : false,
		annotateDisplay : true,
		pointDot :false,
		animationLeftToRight : true,
		animationEasing: "linear",
		yAxisMinimumInterval : 0.02,
		graphTitleFontSize: 18		
	};

	newChartObject.currentData = newData;
	newChartObject.currentOptions = options;

	return newChartObject;
}
