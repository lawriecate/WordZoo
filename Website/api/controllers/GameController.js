/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var crypto = require('crypto');
var zmq = require('zmq');
function word2pos(word) {
	switch (word) {
		case "sheep":
			return 0;
		case "foil":
			return 1;
		case "land":
			return 2;
		case "plane":
			return 3;
		case "back":
			return 4;
		case "log":
			return 5;
		case "hall":
			return 6;
		case "clean":
			return 7;
		case "son":
			return 8;
		case "farm":
			return 9;
		case "lamb":
			return 10;
		case "click":
			return 11;
		case "three":
			return 12;
		case "jet":
			return 13;
		case "rust":
			return 14;
		case "bed":
			return 15;
		case "nose":
			return 16;
		case "tub":
			return 17;
		case "plug":
			return 18;
		case "top":
			return 19;
		case "green":
			return 20;
		case "flag":
			return 21;
		case "flower":
			return 22;
		case "balloon":
			return 23;
		case "pin":
			return 24;
		case "four":
			return 25;
		case "meat":
			return 26;
		case "mill":
			return 27;
		case "stop":
			return 28;
		case "west":
			return 29;
		case "box":
			return 30;
		case "drum":
			return 31;
		case "nest":
			return 32;
		case "tree":
			return 33;
		case "kick":
			return 34;
		case "cone":
			return 35;
		case "bird":
			return 36;
		case "yolk":
			return 37;
		case "fan":
			return 38;
		case "bank":
			return 39;
		case "smell":
			return 40;
		case "wave":
			return 41;
		case "throne":
			return 42;
		case "jug":
			return 43;
		case "kiss":
			return 44;
		case "tag":
			return 45;
		case "sink":
			return 46;
		case "cold":
			return 47;
		case "fog":
			return 48;
		case "drain":
			return 49;
		case "mop":
			return 50;
		case "weed":
			return 51;
		case "cook":
			return 52;
		case "shower":
			return 53;
		case "sick":
			return 54;
		case "pop":
			return 55;
		case "wood":
			return 56;
		case "toast":
			return 57;
		case "pages":
			return 58;
		case "bat":
			return 59;
		case "hog":
			return 60;
		case "cloak":
			return 61;
		case "tap":
			return 62;
		case "ball":
			return 63;
		case "mountain":
			return 64;
		case "hot":
			return 65;
		case "cube":
			return 66;
		case "pill":
			return 67;
		case "hair":
			return 68;
		case "house":
			return 69;
		case "fox":
			return 70;
		case "poodle":
			return 71;
		case "road":
			return 72;
		case "nine":
			return 73;
		case "pot":
			return 74;
		case "bell":
			return 75;
		case "day":
			return 76;
		case "rag":
			return 77;
		case "park":
			return 78;
		case "wine":
			return 79;
		case "vet":
			return 80;
		case "tray":
			return 81;
		case "pan":
			return 82;
		case "hill":
			return 83;
		case "ant":
			return 84;
		case "hip":
			return 85;
		case "fall":
			return 86;
		case "fountain":
			return 87;
		case "brick":
			return 88;
		case "bear":
			return 89;
		case "clothes":
			return 90;
		case "mane":
			return 91;
		case "snow":
			return 92;
		case "sleep":
			return 93;
		case "squid":
			return 94;
		case "rug":
			return 95;
		case "can":
			return 96;
		case "potato":
			return 97;
		case "lid":
			return 98;
		case "sock":
			return 99;
		case "grape":
			return 100;
		case "fin":
			return 101;
		case "brake":
			return 102;
		case "tape":
			return 103;
		case "fax":
			return 104;
		case "peach":
			return 105;
		case "lip":
			return 106;
		case "jump":
			return 107;
		case "tick":
			return 108;
		case "mat":
			return 109;
		case "queen":
			return 110;
		case "weather":
			return 111;
		case "puzzle":
			return 112;
		case "bill":
			return 113;
		case "gold":
			return 114;
		case "rock":
			return 115;
		case "beach":
			return 116;
		case "hose":
			return 117;
		case "square":
			return 118;
		case "bath":
			return 119;
		case "tyre":
			return 120;
		case "rake":
			return 121;
		case "curtain":
			return 122;
		case "price":
			return 123;
		case "plate":
			return 124;
		case "ben":
			return 125;
		case "big":
			return 126;
		case "owl":
			return 127;
		case "wing":
			return 128;
		case "hat":
			return 129;
		case "kid":
			return 130;
		case "mug":
			return 131;
		case "mouth":
			return 132;
		case "lift":
			return 133;
		case "calf":
			return 134;
		case "liquid":
			return 135;
		case "elf":
			return 136;
		case "hell":
			return 137;
		case "swing":
			return 138;
		case "door":
			return 139;
		case "roast":
			return 140;
		case "peg":
			return 141;
		case "head":
			return 142;
		case "leg":
			return 143;
		case "cage":
			return 144;
		case "chop":
			return 145;
		case "sack":
			return 146;
		case "bun":
			return 147;
		case "book":
			return 148;
		case "soil":
			return 149;
		case "noodle":
			return 150;
		case "monkey":
			return 151;
		case "hen":
			return 152;
		case "potatoes":
			return 153;
		case "shape":
			return 154;
		case "tower":
			return 155;
		case "pearl":
			return 156;
		case "mad":
			return 157;
		case "mine":
			return 158;
		case "pink":
			return 159;
		case "pancake":
			return 160;
		case "tomato":
			return 161;
		case "rat":
			return 162;
		case "feet":
			return 163;
		case "donkey":
			return 164;
		case "stair":
			return 165;
		case "hut":
			return 166;
		case "mud":
			return 167;
		case "cub":
			return 168;
		case "duck":
			return 169;
		case "fish":
			return 170;
		case "clown":
			return 172;
		case "dress":
			return 173;
		case "wet":
			return 174;
		case "pub":
			return 175;
		case "crown":
			return 176;
		case "peaches":
			return 177;
		case "spell":
			return 178;
		case "brain":
			return 179;
		case "chess":
			return 180;
		case "wrench":
			return 181;
		case "dish":
			return 182;
		case "frog":
			return 183;
		case "turkey":
			return 184;
		case "sun":
			return 185;
		case "look":
			return 186;
		case "class":
			return 187;
		case "pig":
			return 188;
		case "dog":
			return 189;
		case "read":
			return 190;
		case "vest":
			return 191;
		case "south":
			return 192;
		case "moon":
			return 193;
		case "ten":
			return 194;
		case "shelf":
			return 195;
		case "truck":
			return 196;
		case "shed":
			return 197;
		case "oil":
			return 198;
		case "half":
			return 199;
		case "plum":
			return 200;
		case "toad":
			return 201;
		case "ring":
			return 202;
		case "rope":
			return 203;
		case "shark":
			return 204;
		case "car":
			return 205;
		case "flour":
			return 206;
		case "train":
			return 207;
		case "lead":
			return 208;
		case "ram":
			return 209;
		case "spoon":
			return 210;
		case "red":
			return 211;
		case "band":
			return 212;
		case "bowl":
			return 213;
		case "cog":
			return 214;
		case "foot":
			return 215;
		case "club":
			return 216;
		case "soap":
			return 217;
		case "snowflake":
			return 218;
		case "bubble":
			return 219;
		case "nun":
			return 220;
		case "tin":
			return 221;
		case "dump":
			return 222;
		case "girl":
			return 223;
		case "ship":
			return 224;
		case "wheat":
			return 225;
		case "gift":
			return 226;
		case "tank":
			return 227;
		case "dice":
			return 228;
		case "pope":
			return 229;
		case "moss":
			return 230;
		case "boat":
			return 231;
		case "glass":
			return 232;
		case "bald":
			return 233;
		case "cash":
			return 234;
		case "pine":
			return 235;
		case "bow":
			return 236;
		case "ice":
			return 237;
		case "dome":
			return 238;
		case "cake":
			return 239;
		case "towel":
			return 240;
		case "tomatoes":
			return 241;
		case "rap":
			return 242;
		case "cream":
			return 243;
		case "kite":
			return 244;
		case "plant":
			return 245;
		case "men":
			return 246;
		case "beaches":
			return 247;
		case "spring":
			return 248;
		case "bushes":
			return 249;
		case "ink":
			return 250;
		case "lake":
			return 251;
		case "stone":
			return 252;
		case "six":
			return 253;
		case "bench":
			return 254;
		case "tube":
			return 255;
		case "well":
			return 256;
		case "nut":
			return 257;
		case "gnome":
			return 258;
		case "oak":
			return 259;
		case "cross":
			return 260;
		case "rain":
			return 261;
		case "play":
			return 262;
		case "sweet":
			return 263;
		case "feather":
			return 264;
		case "black":
			return 265;
		case "nap":
			return 266;
		case "tall":
			return 267;
		case "sweep":
			return 268;
		case "brown":
			return 269;
		case "fire":
			return 270;
		case "path":
			return 271;
		case "deer":
			return 272;
		case "grave":
			return 273;
		case "eight":
			return 274;
		case "knight":
			return 275;
		case "home":
			return 276;
		case "third":
			return 277;
		case "brushes":
			return 278;
		case "sand":
			return 279;
		case "mouse":
			return 280;
		case "bread":
			return 281;
		case "goal":
			return 282;
		case "man":
			return 283;
		case "lock":
			return 284;
		case "net":
			return 285;
		case "zip":
			return 286;
		case "shop":
			return 287;
		case "thumb":
			return 288;
		case "britain":
			return 289;
		case "hug":
			return 290;
		case "dust":
			return 291;
		case "steam":
			return 292;
		case "dot":
			return 293;
		case "scarf":
			return 294;
		case "tip":
			return 295;
		case "king":
			return 296;
		case "cages":
			return 297;
		case "smoke":
			return 298;
		case "star":
			return 299;
		case "pram":
			return 300;
		case "crack":
			return 301;
		case "goat":
			return 302;
		case "mash":
			return 303;
		case "chest":
			return 304;
		case "wink":
			return 305;
		case "hop":
			return 306;
		case "bug":
			return 307;
		case "page":
			return 308;
		case "town":
			return 309;
		case "spear":
			return 310;
		case "hand":
			return 311;
		case "arm":
			return 312;
		case "chair":
			return 313;
		case "coat":
			return 314;
		case "seed":
			return 315;
		case "wax":
			return 316;
		case "clock":
			return 317;
		case "bake":
			return 318;
		case "cat":
			return 319;
		case "bin":
			return 320;
		case "grill":
			return 321;
		case "sad":
			return 322;
		case "wall":
			return 323;


		default:
			return null;
	}
}

function generateState() {
	len = 324;
	value = 0.5;
	if (len == 0) return [];
	var a = [value];
	while (a.length * 2 <= len) a = a.concat(a);
	if (a.length < len) a = a.concat(a.slice(0, len - a.length));
	return a;
}

function getData() {
	sails.log('Calling python');
	var port = 3000;
	var socket = zmq.socket('req');
	socket.identity = 'client' + process.pid;
	socket.connect("tcp://127.0.0.1:" + port);
	var data = {};
	var lock = true;
	// Ask Question
	socket.send(JSON.stringify(data));

	reply = function (data, lock) {
		var answer = data.toString();
		//console.log(answer);
		sails.log(answer);
		obj = JSON.parse(answer);
		data = obj;
		lock = false;
		sails.log(obj);
	}
	// Receizve Answer
	socket.on('message', reply);
	while (lock);
	return data;
	/*
		 socket.on('connection',function(socket) {
			 sails.log('connected');
			 //Send a message after a timeout of 4seconds
		   setTimeout(function() {
			  return 'error';
		   }, 4000);
	
			 socket.on('message', function(data) {
				 var answer = data.toString();
				 //console.log(answer);
				 sails.log(answer);
				 obj = JSON.parse(answer);
				 return obj;
			 });
	
		   socket.on('disconnect', function () {
			  console.log('A user disconnected');
		   });
		 });*/
}
module.exports = {
	home: function (req, res) {

		if (!req.pupil.completedWelcome) {
			return res.redirect('/student/welcome');
		}

		games = Game.find().exec(function (err, games) {
			if (err) {
				return res.serverError(err);
			}

			//return res.view('student/home.ejs', {'title':'Start Screen',games:games,  layout: 'layout_student'});
			return res.view('student/inner_home.ejs', { 'title': 'Start Screen', games: games, layout: 'student/home2' });
		});



	},

	play: function (req, res) {

		game = Game.findOne({ slug: req.params.gameslug }).exec(function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			if (game == null) {
				return res.notFound();
			}

			return res.view('student/play.ejs', { 'title': 'Play ' + game.name, game: game, layout: 'student/game_layout' });

		});
	},
	testdata: function (req, res) {
		/*data = [
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
		];*/
		var data = [["Z1", "Z2", "Z3", "Z4", "Z5", "Z6", "Z7", "Z8"],
		["X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8"],
		["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
		["Cat", "Hat", "Mat", "Vat", "Pat", "Bat", "Fat"]];


		return res.send(data);
	},

	savetestdata: function (req, res) {
		data = req.param('gamename');
		return res.send(data);
	},

	startGame: function (req, res) {
		var data = ["smoke", "cat", "club", "gnome", "cold", "hog", "lip", "goat"];
		req.session.game.words = data;
		req.session.game.startTime = new Date.now();
		return res.send(data);
	},

	endGame: function (req, res) {
		//Play.destroy({}).exec();
		//Response.destroy({}).exec();
		var wordPercents = req.param('words');
		var gameRecord;
		var game = Game.findOne({ slug: req.param('game') }).exec(function (err, gameRecord) {
			//sails.log(gameRecord);
			if (err) {
				return res.serverError(err);
			}
			var score = parseInt(req.param('score'));
			//sails.log("S"+score);
			session = Play.new({
				game: gameRecord.id,
				pupil: req.session.pupilId,
				points: score,
				clicks: JSON.stringify(req.param('clicks')),
				session_id: crypto.randomBytes(8).toString('hex'),
			}, function (err, session) {
				// session created
				sails.log('session saved:');
				sails.log('click data');
				sails.log(session.clicks);
			
				// update points
				oldPoints = req.pupil.points;
				if (oldPoints === null) { oldPoints = 0; }
				newPoints = parseInt(oldPoints) + parseInt(req.param('score'));
				Pupil.update({ id: req.session.pupilId }, { points: newPoints }, function (err, pupil) {

				});


				// update words
				var words = req.session.game.words;
				var i = 0;
				_.each(wordPercents, function (wordPercent) {

					Word.findOrCreate({ word: words[i] }, { word: words[i] }, function (err, wordRecord) {
						if (err) {
							return res.serverError(err);
						}
						response = { play: session.id, word: wordRecord.id, wordPercent };
						//sails.log(response);
						//sails.log(gameRecord);
						Response.create({ correct: wordPercent, word: wordRecord.id, play: session.id, game: gameRecord.id, pupil: req.session.pupilId }, function (err, response) {
							//sails.log("Created");
							//sails.log(response);
						});
					});

					/*Response.create({

					}).exec(function(err,wordRepsonse) {
						
					});*/
					i++;
				});
				sails.log((i+1) + 'states  saved:');

				// update states
				// get old state
				var state = State.find({
					where: { "pupil": req.session.pupilId },
					sort: 'createdAt DESC',
					limit: 1
				}).exec(function (err, stateRecord) {


					// if no state generate
					if (stateRecord.state == null) {
						var state = generateState();
					} else {
						state = stateRecord.state;
					}


					//unpack

					//apply new values
					//var words = req.session.game.words;
					// apply decay value to state
					//var decayValue = 0.9;

					var words = req.session.game.words;
					var i = 0;

					// TODO save game state 10 times for each word

					_.each(wordPercents, function (percent) {
						state = state.map(function (value, index, arr) {
							var newStateValue = value * 0.995;
							return newStateValue.toFixed(3);
						});
						var word = words[i];

						pos = word2pos(word);
						sails.log(word + " >>> " + pos);
						state[pos] = parseFloat(percent).toFixed(3);

						var stateRecord = { state: JSON.stringify(state), pupil: req.session.pupilId };
						//sails.log("saving");
					//	sails.log(stateRecord);
						State.create(stateRecord, function (err, state) {

						});
						i++;
					});

					//sails.log(state);

					//change to make a new state for each word
					//save back


					// generate session

					// null out session data for games
					req.session.game = null;
				});
			});



		});

		//wordHistory = req.param('wordHistory');
		// save data from game to student record

		/*_each(wordHistroy,function(wordRecord) {
			//["K1", false, 3277]
			var params = {
				word = wordRecord[0],
				response = wordRecord[1],
				timeToResponse = wordRecord[2]
			}
		});*/
		return res.ok();
		return res.json({ 'status': 'saved' });
	},

	sheepgame: function (req, res) {
		return res.view('sheepgame.ejs', { 'title': 'Sheep Game' });
	},

	list: function (req, res) {
		games = Game.find().exec(function (err, games) {
			if (err) {
				return res.serverError(err);
			}

			return res.view('admin/games.ejs', { 'title': 'Manage Games', games: games, layout: 'layout_admin' });

		});
	},

	create: function (req, res) {
		Game.make({
			name: req.param('name'),
			source: req.param('source'),
			live: req.param('live'),
			slug: req.param('slug')
		}, function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			return res.redirect('/admin/games/' + game.id);
		});
	},

	editGame: function (req, res) {
		games = Game.findOne({ id: req.params.gameid }).exec(function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			return res.view('admin/gameDetails.ejs', { 'title': 'Edit Game', game: game, layout: 'layout_admin' });

		});
	},

	updateGame: function (req, res) {
		params = {
			name: req.param('name'),
			source: req.param('source'),
			live: (req.param('live') == "true"),
			slug: req.param('slug'),
		};
		Game.update({ id: req.params.gameid }, params).exec(function (err, game) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/games/' + game[0].id + '/');
		})
	},

	pythonTest: function (httpreq, res) {

		return res.json(getData());
	},

	getWords: function (req, res) {
		var words = ["back",
			"bake",
			"meat",
			"beaches",
			"ben",
			"big",
			"pope",
			"brown",
			"mine",
			"bun",
			"sack",
			"black",
			"crack",
			"brake",
			"cake",
			"lake",
			"rake",
			"feet",
			"sweet",
			"wheat",
			"peaches",
			"men",
			"hen",
			"ten",
			"pig",
			"rope",
			"soap",
			"town",
			"clown",
			"crown",
			"wine",
			"pine",
			"nine",
			"son",
			"nun",
			"sun",
			"bushes",
			"cages",
			"cloak",
			"cold",
			"cream",
			"cub",
			"day",
			"dish",
			"dome",
			"donkey",
			"brushes",
			"pages",
			"oak",
			"yolk",
			"smoke",
			"gold",
			"bald",
			"steam",
			"pub",
			"tub",
			"club",
			"tray",
			"play",
			"fish",
			"home",
			"gnome",
			"monkey",
			"turkey",
			"dot",
			"dump",
			"dust",
			"hose",
			"farm",
			"fin",
			"flour",
			"foil",
			"liquid",
			"green",
			"hot",
			"pot",
			"jump",
			"rust",
			"nose",
			"clothes",
			"arm",
			"bin",
			"pin",
			"tin",
			"tower",
			"flower",
			"shower",
			"soil",
			"oil",
			"squid",
			"queen",
			"clean",
			"hair",
			"hall",
			"head",
			"hell",
			"hip",
			"hop",
			"house",
			"lead",
			"kick",
			"kid",
			"stair",
			"square",
			"chair",
			"bear",
			"tall",
			"fall",
			"ball",
			"wall",
			"red",
			"bed",
			"shed",
			"bread",
			"smell",
			"spell",
			"well",
			"bell",
			"lip",
			"tip",
			"zip",
			"ship",
			"mop",
			"pop",
			"top",
			"stop",
			"chop",
			"shop",
			"mouse",
			"read",
			"seed",
			"weed",
			"sick",
			"tick",
			"click",
			"brick",
			"lid",
			"land",
			"moss",
			"mouth",
			"log",
			"look",
			"mane",
			"mash",
			"nap",
			"noodle",
			"owl",
			"band",
			"hand",
			"sand",
			"cross",
			"south",
			"cog",
			"dog",
			"fog",
			"hog",
			"frog",
			"book",
			"cook",
			"brain",
			"drain",
			"rain",
			"train",
			"plane",
			"cash",
			"rap",
			"tap",
			"poodle",
			"towel",
			"pink",
			"potato",
			"potatoes",
			"price",
			"rag",
			"ram",
			"roast",
			"page",
			"path",
			"throne",
			"ink",
			"sink",
			"wink",
			"tomato",
			"tomatoes",
			"dice",
			"ice",
			"tag",
			"flag",
			"pram",
			"lamb",
			"toast",
			"cage",
			"bath",
			"stone",
			"cone",
			"rug",
			"shape",
			"shark",
			"sheep",
			"toad",
			"king",
			"vest",
			"wax",
			"weather",
			"wet",
			"bug",
			"hug",
			"jug",
			"mug",
			"plug",
			"grape",
			"tape",
			"park",
			"sleep",
			"sweep",
			"road",
			"ring",
			"swing",
			"wing",
			"spring",
			"west",
			"nest",
			"chest",
			"fax",
			"feather",
			"jet",
			"vet",
			"net",
			"mad",
			"can",
			"bat",
			"hut",
			"car",
			"leg",
			"six",
			"box",
			"ant",
			"wrench",
			"sad",
			"third",
			"fan",
			"man",
			"pan",
			"cat",
			"hat",
			"mat",
			"rat",
			"nut",
			"foot",
			"star",
			"peg",
			"kiss",
			"fox",
			"plant",
			"bench",
			"dress",
			"lock",
			"duck",
			"bill",
			"gift",
			"plum",
			"glass",
			"bank",
			"shelf",
			"three",
			"chess",
			"rock",
			"sock",
			"clock",
			"truck",
			"hill",
			"mill",
			"pill",
			"grill",
			"lift",
			"thumb",
			"drum",
			"class",
			"tank",
			"elf",
			"tree",
			"wave",
			"plate",
			"wood",
			"kite",
			"fire",
			"cube",
			"beach",
			"bow",
			"girl",
			"deer",
			"grave",
			"eight",
			"mud",
			"knight",
			"tyre",
			"tube",
			"peach",
			"snow",
			"pearl",
			"spear",
			"balloon",
			"bird",
			"puzzle",
			"calf",
			"fountain",
			"britain",
			"boat",
			"goal",
			"door",
			"pancake",
			"moon",
			"spoon",
			"bubble",
			"half",
			"scarf",
			"mountain",
			"curtain",
			"coat",
			"goat",
			"bowl",
			"four",
			"snowflake"];

		function randomWords() {
			var generatedList = new Array();
			var numberOfWords = 0;

			//Loop until we have 10 unique words
			while (numberOfWords != 10) {
				var randomWord = Math.floor(Math.random() * (words.length - 1));
				//If the word is not already in our list

				if (doesNotContainWord(generatedList, words[randomWord])) {
					generatedList.push(words[randomWord]);
					numberOfWords++;
				}
			}

			return generatedList;
		}


		function doesNotContainWord(generatedList, word) {
			for (var i = 0; i < generatedList.length; i++) {
				if (generatedList[i] == word) {
					return false;
				}
			}

			return true;
		}
		var words = randomWords();
		req.session.game = {};
		req.session.game.words = words;
		req.session.game.startTime = new Date();
		//console.log(randomWords());
		return res.json(words);

	}
};