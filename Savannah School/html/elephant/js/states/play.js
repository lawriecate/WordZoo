
/**
@author G52GRP - GAIL - #326704
@license 
@overview playState responsible for playing the game, here the images are loaded in the easels and then the user picks the easeels 
imports words depending on which difficulty is clicked
**/
//variable for elephant
var elephant = elephant || {};

//Define RulesState as a function and define variables used locally in the Play State
elephant.PlayState = function() {
    score = 0;
    numResponses = 0;
    timeAllowed = 60;
    failedItems = "";
    chosenItems = "";
    responseTimes = new Array();

};

//Allow main.js to inherit properties from methods in prototype
elephant.PlayState.prototype = {

    //Preload loads in item names 
    preload: function() {
        //Load in words to arrays
        for (var i = 0; i < itemNames.length; i++) {
            this.game.load.image(itemNames[i], filePath[i]);
        }
    },

    //Adds images, text and score to play state
    create: function() {
        //set up background
        this.game.add.tileSprite(0, 0, 1280, 720, 'playBackground');

        //Set up easels
        easel1 = this.game.add.button(65, 150, 'easel', function() {
            clickedEasel = 0;
            this.itemSelectCheck(itemPositions[0]);
        }, this, 0, 0, 0);
        easel2 = this.game.add.button(352, 150, 'easel', function() {
            clickedEasel = 1;
            this.itemSelectCheck(itemPositions[1]);
        }, this, 0, 0, 0);
        easel3 = this.game.add.button(642, 150, 'easel', function() {
            clickedEasel = 2;
            this.itemSelectCheck(itemPositions[2]);
        }, this, 0, 0, 0);
        easel1.scale.setTo(0.9, 0.85);
        easel2.scale.setTo(0.9, 0.85);
        easel3.scale.setTo(0.9, 0.85);

        //Setup touchscreen/keyboard controls
        easel1.input.useHandCursor = true;
        easel2.input.useHandCursor = true;
        easel3.input.useHandCursor = true;


        //Add in text
        scoreText = this.game.add.text(90, 665, "0", {
            font: '60px Arial',
            fill: "#ff9933"
        });
        winnerItemText = this.game.add.text(1060, 210, "", {
            font: '60px Arial',
            fill: "#ff9933"
        });
        scoreText.anchor.setTo(0.5);
        winnerItemText.anchor.setTo(0.5);

        //Add in time
        initialTime = Math.floor(this.game.time.time / 1000);
        timer = this.game.add.text(400, 630, initialTime, {
            font: '60px Arial',
            fill: "#ff9933"
        });
        this.spawnItem();

        //If user closes window, score is still recorded
        window.onbeforeunload = function() {
            this.gameOver();
        }
    },

    //Updates time countdown from 60 also keeps count of score
    update: function() {
        scoreText.text = score;
        var timeRemaining = Math.floor((timeAllowed - ((this.game.time.time / 1000) - initialTime)))
        timer.text = "Time: " + timeRemaining;
        if (timeRemaining <= 0) {
            var sum = 0;
            for (i = 0; i < responseTimes.length; i++) {
                sum += responseTimes[i];
            }
            averageResponseTime = sum / responseTimes.length;
            this.gameOver();
        }
    },

    //add item to a lane
    spawnItem: function() {
        laneLayout = [false, false, false];

        //generate winning item
        itemWinnerPosition = Math.floor(Math.random() * 3);
        winnerItemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        laneLayout[itemWinnerPosition] = winnerItemName;
        item0 = this.game.add.sprite(itemPositions[itemWinnerPosition], 165, winnerItemName);
        item0.scale.setTo(2, 2);

        //generate the rhyming word
        this.getRhymingWord();
        winnerItemText.text = "" + rhymingWord;

        //generate a random item1 
        var itemLane = Math.floor(Math.random() * 3);
        itemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        while (itemName == winnerItemName || laneLayout[itemLane] != false) {
            itemLane = Math.floor(Math.random() * 3);
            itemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        }
        laneLayout[itemLane] = itemName;
        item1 = this.game.add.sprite(itemPositions[itemLane], 165, itemName);
        item1.scale.setTo(2, 2);

        //generate a random item2
        var itemLane = Math.floor(Math.random() * 3);
        itemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        while (itemName == winnerItemName || laneLayout[itemLane] != false) {
            itemLane = Math.floor(Math.random() * 3);
            itemName = itemNames[Math.floor(Math.random() * itemNames.length)];
        }
        laneLayout[itemLane] = itemName;
        item2 = this.game.add.sprite(itemPositions[itemLane], 165, itemName);
        item2.scale.setTo(2, 2);


        spawnTime = this.game.time.time / 1000;
    },



    /**
    //Check whether the easel selected is correct  
    @ parameter - easel selected 
    **/


    //param easel selected 
    itemSelectCheck: function(easelSelected) {
        responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
        numResponses++;
        if (easelSelected == itemPositions[itemWinnerPosition]) {
            score += 1;
            this.createUpdateScoreText("+ 1", "#00ff00", 90, 665);
        } else {
            timeAllowed -= 5;
            this.createUpdateScoreText("- 5", "#ff0000", 520, 665);
            failedItems = failedItems.concat(rhymingWord + "@");
            chosenItems = chosenItems.concat(laneLayout[clickedEasel] + "@");
        }
        item0.kill();
        item1.kill();
        item2.kill();
        this.spawnItem();
    },


    /**
    //update score text updates the score 
    @ parameter - text, colour, x, y
    **/
    createUpdateScoreText: function(text, colour, x, y) {
        var updateScoreText = this.game.add.text(x, y, text, {
            font: "bold 60px Arial",
            fill: colour
        });
        updateScoreText.alpha = 1;
        updateScoreText.anchor.setTo(0.5);
        this.game.add.tween(updateScoreText).to({
            y: '-100'
        }, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(updateScoreText).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
    },

    //ajax call to ensure that a rhyming word is retrieved from server 
    getRhymingWord: function() {
        $.ajax({
            method: 'get',
            url: 'php/rhymingWord.php',
            dataType: 'json',
            async: false,
            data: {
                'word': winnerItemName,
            },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    rhymingWord = data;
                }
            }
        });
    },

    //GamveOver State goes to game over state and resets all variables to zero
    gameOver: function() {
        //go to gameover state
        this.game.state.start('gameover');
    }
};