// Get the context of the canvas element we want to select
var ctx = document.getElementById("scoreOverTime").getContext("2d");
var score = new Array();
var dateTime =  new Array();
var studentName;
var sgameName;
var sdifficultyName;

var ochart;
var isLine = false;
ctx.canvas.width = (window.innerWidth * 0.45);
ctx.canvas.height = (window.innerHeight * 0.45);

var data = {
    labels: dateTime,
    datasets: [
        {
            label: "Score over time",
            fillColor: "rgba(0,88,233,1)",
            strokeColor: "rgba(0,88,233,1)",
            pointColor: "rgba(0,88,233,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(0,255,0,1)",
            data: score
        }
    ]
};

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: (window.innerHeight *0.014),

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: function(chartData) { 
						if(!isLine) {
							var theChosenWords = getChosenWords(sgameName, sdifficultyName, chartData.label);
							return "Words chosen: " + theChosenWords[0][0] + ": "
								   + theChosenWords[0][1] + " " + theChosenWords[1][0] + ": " 
								   + theChosenWords[1][1] + " " + theChosenWords[2][0] + ": " 
								   + theChosenWords[2][1];
					    }
						else {
							return chartData.label  + ": " + chartData.value;
						}
					 },

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}

//Listeners
$('#namelist').on('change', updateChart)
$('#game').on('change', updateChart)
$('#difficulty').on('change', updateChart)
$('#graph').on('change', updateChart)

 function updateChart(){
    studentName = $('#namelist').find(":selected").text();
	sgameName = $('#game').find(":selected").text();
	sdifficultyName = $('#difficulty').find(":selected").text();
	var sgraphName = $('#graph').find(":selected").text();
    
	//Reset the chart
	for(var i = 0; i < score.length; i++) {
		ochart.removeData();
	} 
	score.length = 0;
	dateTime.length = 0;
	
	if(sgraphName == "Scores"){
		//Draw Line Graph
		isLine = true;
		importGraphData(sgameName,sdifficultyName,sgraphName);
		ochart = new Chart(ctx).Line(data);
	} else if (sgraphName == "Most Failed") {
		//Draw Bar Chart
		isLine = false;
		var importedData = importMostFailed(sgameName, sdifficultyName, sgraphName);
		for(var i = 0; i < importedData.length; i++) {
			dateTime[i] = importedData[i][0];
			score[i] = importedData[i][1];
		}
		ochart = new Chart(ctx).Bar(data);
	}
		
	//Update Title and Information Text
	var stitle = "Graph showing " + sgraphName + " for " + sgameName + " game on " + sdifficultyName + " difficulty";
	$('#title').text(stitle);
	$('#curriculumFocus').text("Area of curriculum focus: " + getAreaOfCurriculum(sgameName));
	$('#averageScore').text("Average score: " + importStatistics(sgameName, sdifficultyName, 'php/importAverageScoreStudent.php'));
	$('#highestScore').text("Highest score: " + importStatistics(sgameName, sdifficultyName, 'php/importMaxScoreStudent.php'));
	if(sgameName != "Zebra") {
		$('#averageResponseTime').text("Average response time: " + importStatistics(sgameName, sdifficultyName, 'php/importAverageResponseTimeStudent.php') + " seconds");
	} else {
		$('#averageResponseTime').text("");
	}
	$('#averagePlayTime').text("Average play time: " + importStatistics(sgameName, sdifficultyName, 'php/importAverageSessionTimeStudent.php') + " seconds");
	
	getChosenWords("Elephant", "Hard", "");
 }
 
function importGraphData(sgameName, sdifficultyName, sgraphName) {
	$.ajax({
      method: 'get',
      url: 'php/importScoreOverTimeStudent.php',
      dataType: 'json',
      async: false,
	  data: {
		'gameName': sgameName,
		'difficulty': sdifficultyName,
        'username': studentName,
		'ajax': true
      },
      success: function(data) {  
		$('#data').text(data);
		for(var i = 0; i<data.length; i++) {
			score[i] = data[i][0];
			dateTime[i] = data[i][1];
		}
      }
    });  	
}

function importStatistics(sgameName, sdifficultyName, phpFileName){
	var statistics;
	$.ajax({
      method: 'get',
      url: phpFileName,
      dataType: 'json',
      async: false,
	  data: {
		'gameName': sgameName,
		'difficulty': sdifficultyName,
        'username': studentName,
		'ajax': true
      },
      success: function(data) {  
		$('#data').text(data);
		statistics = data;
      }
    });
	stringParts = String(statistics).split(".");
	return stringParts[0];
}

function importMostFailed(sgameName, sdifficultyName) {
	var mostFailedWord;
	var failedWords = new Array();
	$.ajax({
      method: 'get',
      url: 'php/importMostFailedStudent.php',
      dataType: 'json',
      async: false,
	  data: {
		'gameName': sgameName,
		'difficulty': sdifficultyName,
        'username': studentName,
		'ajax': true
      },
      success: function(data) {  
		$('#data').text(data);
		if(sgameName == "Zebra") {
			for(var i = 0; i < data.length; i++) {
				failedWords.push(data[i][0]);
				failedWords.push(data[i][1]);
				failedWords.push(data[i][2]);
			}
		} else {
			for(var i = 0; i < data.length; i++) {
				var str = String(data[i]).split("@");
				for(var j = 0; j < str.length; j++) {
					if(str[j] !== undefined && str[j] !== "" && str[j] !== "undefined") { 
						failedWords.push(str[j]);
					}
				}
			}
        }
	  }
    });
	mostFailedWords = getMostCommon(failedWords);
	return mostFailedWords;
}

function getChosenWords(sgameName,sdifficultyName,chosenWord) {
	var chosenWords = new Array();
	$.ajax({
      method: 'get',
      url: 'php/importChosenWordsStudent.php',
      dataType: 'json',
      async: false,
	  data: {
		'gameName': sgameName,
		'difficulty': sdifficultyName,
		'word': chosenWord,
        'username': studentName,
		'ajax': true
      },
      success: function(data) {  
		$('#data').text(data);
		if(sgameName == "Zebra") {
			for(var i = 0; i < data.length; i++) {
				chosenWords.push(data[i][0]);
			}
        } else {
			var chosenWordsList = new Array();
			var failedWordsList = new Array();
			for(var i = 0; i < data.length; i++) {
				var chosenStr = String(data[i][0]).split("@");
				var failedStr = String(data[i][1]).split("@");
				for(var j = 0; j < chosenStr.length; j++) {
					if(chosenStr[j] !== undefined && chosenStr[j] !== "" && chosenStr[j] !== "undefined") { 
						chosenWordsList.push(chosenStr[j]);
						failedWordsList.push(failedStr[j]);
					}
				}	
			}
			for(var i = 0; i < failedWordsList.length; i++) {
				if(failedWordsList[i] == chosenWord) {
					chosenWords.push(chosenWordsList[i]);
				}
			}
	    }
	  }
    });  
	mostChosenWords = getMostCommon(chosenWords);
	return mostChosenWords;
}

function getAreaOfCurriculum(currentGame) {
	switch(currentGame) {
		case "Zebra":		return "Reading and vocabulary";
		case "Lion":		return "Spelling";
		case "Elephant":	return "Phonics";
		case "Giraffe":		return "Synonyms";
		default:			return "";
	}
}

function getMostCommon(array) {
	//Count occurence of each value in array
	var map = new Object();
	for(var i = 0; i < array.length; i++) {
		if(!(array[i] in map)) {
			map[array[i]] = 1;
		} else {
			map[array[i]]++;
		}
	}
	
	var mostFailed = new Array();
	for(var i = 0; i < 10; i++) {
		currentMax = ["", 0];
		for(var key in map) {
			if(map[key] > currentMax[1]) {
				currentMax = [key, map[key]];
			}
		}
		mostFailed[i] = currentMax;
		delete map[currentMax[0]];
	}
	return mostFailed;
}