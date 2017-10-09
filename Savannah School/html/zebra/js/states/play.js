
/**
@author G52GRP - GAIL - #326704
@license 
@overview playState responsible for playing the game, loads in images then 
**/
//variable for elephant
var zebra = zebra || {};

//Define PlayState as a function and define variabels used locally in the Play State
zebra.PlayState = function() {
    currentLane = 1;
    score = 0;
    speed = 5;

};
//this.ready = false;

//Allow main.js to inherit properties from methods in prototype
zebra.PlayState.prototype = {

        //Preload loads in item names 
        preload: function() {
            //Load in words to arrays
            for (var i = 0; i < itemNames.length; i++) {
                this.game.load.image(itemNames[i], filePath[i]);
            }
        },
        //Sets up Background, keyboard, scores and touch controls
        create: function() {
            //Setup background and player
            raceTrack = this.game.add.tileSprite(0, 0, 1280, 720, 'playBackground');
            scoreBack = this.game.add.sprite(1000, 0, 'scoreDisplay');
            wordBack = this.game.add.sprite(456, 40, 'wordDisplay');
            scoreBack.scale.setTo(1, 1.1);
            wordBack.scale.setTo(1, 1.1);
            player = this.game.add.sprite(50, playerLanePositions[1], 'zebraSprite');
            player.animations.add('right', [0, 1, 2, 3], 10, true);
            lives = this.game.add.sprite(0, 0, 'livesSprite');
            lives.animations.add('reduceLives', [0, 1, 2, 3], 10, true);

            //Setup keyboard actions.
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.moveUp, this);
            this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.moveDown, this);

            //Setup touchscreen controls
            this.game.input.onDown.add(function(touchStart) {
                startPoint = touchStart.clientY;
            }, this);
            this.game.input.onUp.add(function(touchEnd) {
                endPoint = touchEnd.clientY;
                if ((startPoint - endPoint) > 100) {
                    this.moveUp();
                } else if ((endPoint - startPoint) > 100) {
                    this.moveDown();
                }
            }, this);

            //If user closes window, score is still recorded
            // window.onbeforeunload = function() {
            //   this.onComplete();
            //   if(!!this.ready) {
            //       console.log("moo");
            //     }
            // },

            //Setup timer
            initialTime = Math.floor(this.game.time.time / 1000);

            //Setup Score text and items
            scoreText = this.game.add.text(1135, 45, "0", {
                font: '40px Arial',
                fill: "#ff9933"
            });
            scoreText.anchor.setTo(0.5);
            winnerItemText = this.game.add.text(640, 85, "", {
                font: '60px Arial',
                fill: "#ff9933"
            });
            winnerItemText.anchor.setTo(0.5);
            updateTextCorrect = this.game.add.text(80, playerLanePositions[currentLane], "", {
                fill: "#00ff00"
            });
            updateTextIncorrect = this.game.add.text(80, playerLanePositions[currentLane], "", {
                fill: "#ff0000"
            });
            this.spawnItem();
        },

        //Update function, keeps track of score spawns, moves and kills items
        update: function() {
            if (item0.x == 80) {
                this.itemSelectCheck();
            }

            //Kills items when they move off the screen.
            if (item0.x == 0 || item1.x == 0 || item2.x == 0) {
                item0.kill();
                item1.kill();
                item2.kill();
                this.spawnItem();
            }
            //Moves item across screen at given speed
            raceTrack.tilePosition.x -= speed;
            item0.x -= speed;
            item1.x -= speed;
            item2.x -= speed;
            player.animations.play('right', 10, true);

            //increments score
            score++;
            scoreText.text = score;
        },

        //itemSelectCheck function checks which item the player has selected and handle actions if correct/incorrect
        itemSelectCheck: function() {
            if (player.y == itemWinnerLane - 75) {
                item0.kill();
                score += 1000;
                this.createUpdateText(updateTextCorrect, "+1000");
            } else if (player.y == item1.y - 75) {
                item1.kill();
                this.reduceLife(incorrectItemName1);
            } else {
                item2.kill();
                this.reduceLife(incorrectItemName2);
            }
        },

        //SpawnItem function to spawn in items
        spawnItem: function() {
            takenItems = [false, false, false, false, false, false, false, false, false, false, false, false];
            takenLanes = [false, false, false];

            //Spawn item0
            var itemSelected = this.duplicateLaneCheck(takenItems, itemNames.length);
            itemWinnerLane = itemLanePositions[this.duplicateLaneCheck(takenLanes, 3)];

            winnerName = itemNames[itemSelected]; // create so the next two lines do not have to do itemNames[itemSelected]
            winnerItemText.text = winnerName;
            item0 = this.game.add.sprite(1280, itemWinnerLane, winnerName);

            //Spwan item1 
            incorrectItemName1 = itemNames[this.duplicateLaneCheck(takenItems, itemNames.length)];
            item1 = this.game.add.sprite(1280, itemLanePositions[this.duplicateLaneCheck(takenLanes, 3)], incorrectItemName1);

            //Spawn item2 
            incorrectItemName2 = itemNames[this.duplicateLaneCheck(takenItems, itemNames.length)];
            item2 = this.game.add.sprite(1280, itemLanePositions[this.duplicateLaneCheck(takenLanes, 3)], incorrectItemName2);

            //This ensures the player never goes behind the objects once they are spawned
            this.game.world.bringToTop(player);
        },

        //DuplicateLaneCheck Function checks for duplicates.
        duplicateLaneCheck: function(inputArray, randomLimit) {
            laneOrItem = Math.floor((Math.random() * randomLimit) + 0);
            while (inputArray[laneOrItem]) {
                laneOrItem = Math.floor((Math.random() * randomLimit) + 0);
            }
            inputArray[laneOrItem] = true;
            return laneOrItem;
        },

        //ReduceLife function decrease life by one and cheks if it is game over yet
        reduceLife: function(itemChosen) {
            chosenWords[lives.animations.frame] = winnerName;
            failedWords[lives.animations.frame] = itemChosen;
            lives.animations.frame++;
            this.createUpdateText(updateTextIncorrect, "-1");
            if (lives.animations.frame == 3) {
                this.gameOver();
            }
        },

        //MoveUp function moves the player up 
    moveUp:function (){
        if (currentLane != 0) {
            currentLane--;
            player.y = playerLanePositions[currentLane];
        }
    },
    //MoveDown Function moves the player down
    moveDown: function() {
        if (currentLane != 2) {
            currentLane++;
            player.y = playerLanePositions[currentLane];
        }
    },

    //CreateUpdateText Function generates and animates the update text on item pickups
    createUpdateText: function(updateText, textToShow) {
        updateText.alpha = 1;
        updateText.position.y = playerLanePositions[currentLane] - 20;
        updateText.text = textToShow;
        this.game.add.tween(updateText).to({
            y: 0
        }, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(updateText).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
    },

    //Gameover function starts new state of game over
    gameOver: function() {
        this.game.state.start('gameover');
    }
};