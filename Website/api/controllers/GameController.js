/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var zmq = require('zmq');
/* function word2pos(word) {
	 switch (word) {
		 case "smoke":
		 return 0;
		case "cat":
		 return 1;
		case "club":
		 return 2;
		case "gnome":
		 return 3;
		case "cold":
		 return 4;
		case "hog":
		 return 5;
		case "lip":
		 return 6;
		case "goat":
		 return 7;
		case "plane":
		 return 8;
		case "dot":
		 return 9;
		case "box":
		 return 10;
		case "pin":
		 return 11;
		case "mash":
		 return 12;
		case "mane":
		 return 13;
		case "hug":
		 return 14;
		case "lid":
		 return 15;
		case "lamb":
		 return 16;
		case "toast":
		 return 17;
		case "zip":
		 return 18;
		case "sack":
		 return 19;
		case "rug":
		 return 20;
		case "top":
		 return 21;
		case "sweet":
		 return 22;
		case "jet":
		 return 23;
		case "tomatoes":
		 return 24;
		case "third":
		 return 25;
		case "hose":
		 return 26;
		case "tip":
		 return 27;
		case "mouth":
		 return 28;
		case "sock":
		 return 29;
		case "pink":
		 return 30;
		case "cog":
		 return 31;
		case "feet":
		 return 32;
		case "cross":
		 return 33;
		case "feather":
		 return 34;
		case "brown":
		 return 35;
		case "cloak":
		 return 36;
		case "bench":
		 return 37;
		case "back":
		 return 38;
		case "bug":
		 return 39;
		case "cage":
		 return 40;
		case "fox":
		 return 41;
		case "nun":
		 return 42;
		case "chest":
		 return 43;
		case "nine":
		 return 44;
		case "hot":
		 return 45;
		case "hill":
		 return 46;
		case "duck":
		 return 47;
		case "hen":
		 return 48;
		case "nut":
		 return 49;
		case "boat":
		 return 50;
		case "park":
		 return 51;
		case "page":
		 return 52;
		case "black":
		 return 53;
		case "nest":
		 return 54;
		case "cash":
		 return 55;
		case "cube":
		 return 56;
		case "sink":
		 return 57;
		case "sick":
		 return 58;
		case "queen":
		 return 59;
		case "plate":
		 return 60;
		case "clean":
		 return 61;
		case "moon":
		 return 62;
		case "poodle":
		 return 63;
		case "pearl":
		 return 64;
		case "leg":
		 return 65;
		case "bread":
		 return 66;
		case "soil":
		 return 67;
		case "britain":
		 return 68;
		case "brushes":
		 return 69;
		case "clothes":
		 return 70;
		case "bake":
		 return 71;
		case "shed":
		 return 72;
		case "hat":
		 return 73;
		case "ship":
		 return 74;
		case "bow":
		 return 75;
		case "thumb":
		 return 76;
		case "seed":
		 return 77;
		case "lock":
		 return 78;
		case "cream":
		 return 79;
		case "plug":
		 return 80;
		case "jump":
		 return 81;
		case "south":
		 return 82;
		case "snowflake":
		 return 83;
		case "tap":
		 return 84;
		case "pop":
		 return 85;
		case "tube":
		 return 86;
		case "dump":
		 return 87;
		case "door":
		 return 88;
		case "tape":
		 return 89;
		case "head":
		 return 90;
		case "puzzle":
		 return 91;
		case "rust":
		 return 92;
		case "hell":
		 return 93;
		case "pan":
		 return 94;
		case "clock":
		 return 95;
		case "ten":
		 return 96;
		case "tyre":
		 return 97;
		case "shop":
		 return 98;
		case "shark":
		 return 99;
		case "farm":
		 return 100;
		case "dish":
		 return 101;
		case "frog":
		 return 102;
		case "grave":
		 return 103;
		case "oil":
		 return 104;
		case "peach":
		 return 105;
		case "spell":
		 return 106;
		case "drum":
		 return 107;
		case "roast":
		 return 108;
		case "spear":
		 return 109;
		case "yolk":
		 return 110;
		case "owl":
		 return 111;
		case "shape":
		 return 112;
		case "mad":
		 return 113;
		case "land":
		 return 114;
		case "coat":
		 return 115;
		case "day":
		 return 116;
		case "dog":
		 return 117;
		case "square":
		 return 118;
		case "potato":
		 return 119;
		case "knight":
		 return 120;
		case "red":
		 return 121;
		case "balloon":
		 return 122;
		case "sheep":
		 return 123;
		case "bed":
		 return 124;
		case "cake":
		 return 125;
		case "bun":
		 return 126;
		case "pancake":
		 return 127;
		case "peaches":
		 return 128;
		case "ice":
		 return 129;
		case "vest":
		 return 130;
		case "fax":
		 return 131;
		case "mouse":
		 return 132;
		case "train":
		 return 133;
		case "spring":
		 return 134;
		case "mine":
		 return 135;
		case "gift":
		 return 136;
		case "green":
		 return 137;
		case "click":
		 return 138;
		case "bowl":
		 return 139;
		case "beaches":
		 return 140;
		case "hair":
		 return 141;
		case "gold":
		 return 142;
		case "rap":
		 return 143;
		case "net":
		 return 145;
		case "cook":
		 return 146;
		case "sun":
		 return 147;
		case "sleep":
		 return 148;
		case "bath":
		 return 149;
		case "deer":
		 return 150;
		case "ben":
		 return 151;
		case "road":
		 return 152;
		case "king":
		 return 153;
		case "rain":
		 return 154;
		case "glass":
		 return 155;
		case "mat":
		 return 156;
		case "brick":
		 return 157;
		case "smell":
		 return 158;
		case "throne":
		 return 159;
		case "gun":
		 return 160;
		case "drain":
		 return 161;
		case "mug":
		 return 162;
		case "hop":
		 return 163;
		case "chop":
		 return 164;
		case "rat":
		 return 165;
		case "pope":
		 return 166;
		case "wax":
		 return 167;
		case "swing":
		 return 168;
		case "pram":
		 return 169;
		case "can":
		 return 170;
		case "vet":
		 return 171;
		case "west":
		 return 172;
		case "tank":
		 return 173;
		case "lake":
		 return 174;
		case "bat":
		 return 175;
		case "foot":
		 return 176;
		case "ball":
		 return 177;
		case "potatoes":
		 return 178;
		case "tower":
		 return 179;
		case "hut":
		 return 180;
		case "wall":
		 return 181;
		case "wrench":
		 return 182;
		case "monkey":
		 return 183;
		case "plum":
		 return 184;
		case "cone":
		 return 185;
		case "toad":
		 return 186;
		case "fire":
		 return 187;
		case "pub":
		 return 188;
		case "wine":
		 return 189;
		case "nose":
		 return 190;
		case "snow":
		 return 191;
		case "pot":
		 return 192;
		case "wink":
		 return 193;
		case "bin":
		 return 194;
		case "tomato":
		 return 195;
		case "truck":
		 return 196;
		case "girl":
		 return 197;
		case "lead":
		 return 198;
		case "eight":
		 return 199;
		case "towel":
		 return 200;
		case "four":
		 return 201;
		case "town":
		 return 202;
		case "bird":
		 return 203;
		case "price":
		 return 204;
		case "meat":
		 return 205;
		case "calf":
		 return 206;
		case "house":
		 return 207;
		case "scalf":
		 return 208;
		case "rag":
		 return 209;
		case "turkey":
		 return 210;
		case "rock":
		 return 211;
		case "three":
		 return 212;
		case "bear":
		 return 213;
		case "stone":
		 return 214;
		case "wood":
		 return 215;
		case "fin":
		 return 216;
		case "jug":
		 return 217;
		case "squid":
		 return 218;
		case "steam":
		 return 219;
		case "dress":
		 return 220;
		case "pages":
		 return 221;
		case "pill":
		 return 222;
		case "weed":
		 return 223;
		case "flag":
		 return 224;
		case "cub":
		 return 225;
		case "mud":
		 return 226;
		case "kid":
		 return 227;
		case "sand":
		 return 228;
		case "kiss":
		 return 229;
		case "hand":
		 return 230;
		case "flour":
		 return 231;
		case "bushes":
		 return 232;
		case "car":
		 return 233;
		case "goal":
		 return 234;
		case "clown":
		 return 235;
		case "bank":
		 return 236;
		case "tag":
		 return 237;
		case "home":
		 return 238;
		case "tall":
		 return 239;
		case "class":
		 return 240;
		case "fish":
		 return 241;
		case "tin":
		 return 242;
		case "ring":
		 return 243;
		case "dice":
		 return 244;
		case "crack":
		 return 245;
		case "mill":
		 return 246;
		case "pine":
		 return 247;
		case "flower":
		 return 248;
		case "donkey":
		 return 249;
		case "men":
		 return 250;
		case "hip":
		 return 251;
		case "brake":
		 return 252;
		case "log":
		 return 253;
		case "ant":
		 return 254;
		case "brain":
		 return 255;
		case "wing":
		 return 256;
		case "crown":
		 return 257;
		case "look":
		 return 258;
		case "ink":
		 return 259;
		case "spoon":
		 return 260;
		case "mountain":
		 return 261;
		case "wet":
		 return 262;
		case "foil":
		 return 263;
		case "sweep":
		 return 264;
		case "stop":
		 return 265;
		case "bald":
		 return 266;
		case "tray":
		 return 267;
		case "mop":
		 return 268;
		case "kick":
		 return 269;
		case "tub":
		 return 270;
		case "peg":
		 return 271;
		case "tree":
		 return 272;
		case "fan":
		 return 273;
		case "bubble":
		 return 274;
		case "rope":
		 return 275;
		case "fall":
		 return 276;
		case "fountain":
		 return 277;
		case "soap":
		 return 278;
		case "bill":
		 return 279;
		case "book":
		 return 280;
		case "dome":
		 return 281;
		case "half":
		 return 282;
		case "stair":
		 return 283;
		case "nap":
		 return 284;
		case "curtain":
		 return 285;
		case "wheat":
		 return 286;
		case "well":
		 return 287;
		case "path":
		 return 288;
		case "grill":
		 return 289;
		case "ram":
		 return 290;
		case "noodle":
		 return 291;
		case "rake":
		 return 292;
		case "beach":
		 return 293;
		case "elf":
		 return 294;
		case "cages":
		 return 295;
		case "weather":
		 return 296;
		case "tick":
		 return 297;
		case "hall":
		 return 298;
		case "kite":
		 return 299;
		case "dust":
		 return 300;
		case "shelf":
		 return 301;
		case "shower":
		 return 302;
		case "plant":
		 return 303;
		case "chair":
		 return 304;
		case "chess":
		 return 305;
		case "bell":
		 return 306;
		case "lift":
		 return 307;
		case "grape":
		 return 308;
		case "read":
		 return 309;
		case "wave":
		 return 310;
		case "moss":
		 return 311;
		case "oak":
		 return 312;
		case "band":
		 return 313;
		case "pig":
		 return 314;
		case "sad":
		 return 315;
		case "play":
		 return 316;
		case "star":
		 return 317;
		case "fog":
		 return 318;
		case "big":
		 return 319;
		case "arm":
		 return 320;
		case "liquid":
		 return 321;
		case "six":
		 return 322;
		case "man":
		 return 323;

	 	default:
	 		return null;
	 }
 }

function generateState() {
	len = 300;
	value = 0.5;
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}*/

function getData() {
  sails.log('Calling python');
  var port = 3000;
  var socket = zmq.socket('req');
  socket.identity = 'client' + process.pid;
  socket.connect("tcp://127.0.0.1:"+port);
  var data = {};
	var lock = true;
  // Ask Question
  socket.send(JSON.stringify(data));

  reply = function(data,lock) {
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
	 while(lock);
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

			/*if(!req.pupil.completedWelcome) {
				return res.redirect('/student/welcome');
			}*/

			games = Game.find().exec(function(err,games) {
				if (err) {
					return res.serverError(err);
				}

					//return res.view('student/home.ejs', {'title':'Start Screen',games:games,  layout: 'layout_student'});
          return res.view('student/inner_home.ejs', {'title': 'Start Screen',games:games,  layout: 'student/home2'});
			});



  },

	play: function(req,res) {

		game = Game.findOne({slug:req.params.gameslug}).exec(function(err,game) {
			if (err ) {
				return res.serverError(err);
			}

      if(game == null) {
        return res.notFound();
      }

				return res.view('student/play.ejs', {'title':'Play '+game.name,game:game,  layout: 'student/game_layout'});

		});
	},
	testdata: function (req,res) {
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
		var data = [["Z1","Z2","Z3","Z4","Z5","Z6","Z7","Z8"],
							["X1","X2","X3","X4","X5","X6","X7","X8"],
							["C1","C2","C3","C4","C5","C6","C7","C8"],
							["Cat","Hat","Mat","Vat","Pat","Bat","Fat"]];


		return res.send(data);
	},

	savetestdata: function (req,res) {
		data = req.param('gamename');
		return res.send(data);
	},

	startGame: function(req,res) {
		var data = ["smoke","cat","club","gnome","cold","hog","lip","goat"];
		req.session.game.words = data;
		req.session.game.startTime = new Date.now();
		return res.send(data);
	},

	endGame: function(req,res) {
		var wordPercents = req.param('words');
		var game = Game.findOne({slug:req.params.gameslug}).exec(function(err,game) {
			session = Play.new({
				game: game.id,
				pupil:req.session.pupilId
			},function(err,session) {
				// session created

				// update words

				// update states
				// get old state
				//var state = req.pupil.state;
				// if no state generate
				//if(state == null) {
					var state = generateState();
				//}
				sails.log(state);
				//unpack


				//apply new values
				//var words = req.session.game.words;
				// apply decay value to state
				//var decayValue = 0.9;


				var words = req.session.game.words;
				var i = 0;

				_.each(wordPercents,function(percent) {
					pos = word2pos(words[i]);
					state[pos] = state[pos] * percent ;
					i++;
				});
				sails.log(state);

				// change to make a new state for each word

				// save back
				State.update({id:req.pupil.state.id},function(err,state) {

				});

				// null out session data for games
				req.session.game = null;
			});
		});

		wordHistory = req.param('wordHistory');
		// save data from game to student record
		// generate session
		session = Play.create({

		}).exec(function(err,records) {

		});
		/*_each(wordHistroy,function(wordRecord) {
			//["K1", false, 3277]
			var params = {
				word = wordRecord[0],
				response = wordRecord[1],
				timeToResponse = wordRecord[2]
			}
		});*/
		return res.ok();
    return res.json({'status':'saved'});
	},

	sheepgame: function( req,res) {
		return res.view('sheepgame.ejs', {'title':'Sheep Game'});
	},

	list: function(req,res) {
		games = Game.find().exec(function(err,games) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/games.ejs', {'title':'Manage Games',games:games,  layout: 'layout_admin'});

		});
	},

	create: function(req,res) {
		Game.make({
      name: req.param('name'),
			source: req.param('source'),
			live: req.param('live'),
			slug: req.param('slug')
    }, function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			  return res.redirect('/admin/games/'+game.id);
		});
	},

	editGame: function(req,res) {
		games = Game.findOne({id: req.params.gameid}).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/gameDetails.ejs', {'title':'Edit Game',game:game,  layout: 'layout_admin'});

		});
	},

	updateGame: function(req,res) {
		params = {
      name: req.param('name'),
			source: req.param('source'),
      live: (req.param('live')=="true"),
			  slug: req.param('slug'),
    };
		Game.update({id:req.params.gameid},params).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/games/'+game[0].id+'/');
		})
	},

  pythonTest: function(httpreq,res) {

    return res.json(getData());
  },

	getWords: function(req,res) {
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
		    "gun",
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

		function randomWords(){
		    var generatedList = new Array();
		    var numberOfWords = 0;

		    //Loop until we have 10 unique words
		    while(numberOfWords != 10){
		      var randomWord = Math.floor(Math.random() * (words.length - 1));
		      //If the word is not already in our list
		      if(doesNotContainWord(generatedList, words[randomWord]))
		        generatedList.push(words[randomWord]);
		        numberOfWords++;
		    }

		    return generatedList;
		}


		function doesNotContainWord(generatedList, word){
		  for(var i = 0; i < generatedList.length; i++){
		      if(generatedList[i] == word){
		        return false;
		      }
		  }

		  return true;
		}
    var words = randomWords();
    req.session.game.words = words;
		req.session.game.startTime = new Date.now();

		//console.log(randomWords());
		return res.json(words);

	}
};
