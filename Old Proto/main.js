	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"

var readingNotesModule = "div#readingNotesModule"

var readingNotesLesson1 = "div#readingNotesLesson1"
	
var fromSettings = null;
var previousScreen = null;

var currentModule = 3;//for croll to functionality

$(document).ready(function(){
	$(".fitScreen").hide();//super hacky
	$(loginScreen).show();
	previousScreen = "loginScreen"

	var actUser = "user";
	var actPass = "abc";
	var allowEnter = false;
	$("a#registerBtn").click(function(){
		var user = $("#username").val();
		var pass = $("#password").val();

		if(pass == actPass){
			if(user == actUser){
				allowEnter = true;
			}
		}
	});


	//this may not work if the previous screens are back to back and get in a fun loop
	// $("a.backBtn").click(function(){
	// 	console.log("Back to: " + previousScreen)
	// 	$(this).closest(".fitScreen").hide();
	// 	if(previousScreen != null){
	// 		$("div#"+previousScreen).show();
	// 	}else{
	// 		console.log("Do something");
	// 	}
	// });

	//general controller for nav buttons
	$(".navBtn").click(function(){
		var idStr = $(this).closest(".fitScreen").attr('id')
		if(allowEnter ||  idStr == "settingsScreen"){
			previousScreen = idStr;
			console.log("setting previous:" + previousScreen)
			$(this).closest(".fitScreen").hide();
		}
	});

	$("a#registerBtn").click(function(){
		if(allowEnter){
			$(moduleSelectScreen).show();
		}
	});
	$("a#readingNotesModuleBtn").click(function(){
		$(readingNotesModule).show();
	});

	

	$("a#backToLoginBtn").click(function(){
		$(loginScreen).show();
	});
	$("a#backToModuleSelectBtn").click(function(){
		$(moduleSelectScreen).show();
	});
	$("a#backToModuleBtn").click(function(){
		$(readingNotesModule).show();
	});
	
	$("a#settingsBtn").click(function(){
		fromSettings = $(this).closest(".fitScreen").attr('id');
		$(this).closest(".fitScreen").hide();//added because login control
		$(settingsScreen).show();
	});
	//dynamic controller for returning to correct screen 
	$("a#backFromSettingsBtn").click(function(){
		$("div#"+fromSettings).show();
	});

	//when module is complete, switch module select background image to the complete one. 
	//--follow proper sequence of checks.
	//--set bool when proper sequence is pressed
	//--switch img src attr

	//scroll to module on title click
	$('a#scrollToModule').click(function() {
		$('html, body').animate({
		  scrollTop: $("ul#moduleList > li:nth-child("+(currentModule-1)+")").offset().top
		});
	  });

	var check = "pictures/settingsScreen/setting_blind_check.png"
	var uncheck = "pictures/settingsScreen/setting_blind_uncheck.png"
	$("a#toggleColorBlind").click(function(){
		$("img#colorBlindOptImage").attr('src', function(index, attr){
			return attr == uncheck ? check : uncheck;
		});
	});

	//I wrote this, but it's useless ahaha Can maybe turn it into a function

	// var unlocked = "pictures/module1/module1_level_unlocked.png"
	// $("a.nodeBtn").click(function(){//use this for when a lesson is completed
	// 	$(this).children().attr('src', unlocked)
	// });

	$("a#n1").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(readingNotesLesson1).show();
	});
	$("a#n2").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(this).closest(".fitScreen").hide();
		$(readingNotesLesson1).show();
	});


	//could allow for changing between options, but not now. Pick once bruv
	//thus the "l1_q1_picked bool"
	var l1_q1_picked = false;
	var l1_q1_letter = null;
	var level1_ans = "pictures/level1/level1_ans/level1_ans_";
	var selectedStr = "_select.png"
	$("li.lessonsMultChoiceOpt").click(function(){
		if(!l1_q1_picked){
			l1_q1_letter = $(this).children().attr('alt');
			var newSrc = level1_ans  + l1_q1_letter + selectedStr;
			$(this).children().attr('src', newSrc);
			$(this).addClass("selected");
			l1_q1_picked = true;
		}
		
	});

	var answerQ1 = "c";
	var answerQ2 = "d";
	var answerQ3 = "a";

	//onclick of next btn in lessons, show if correct modal
	$("a#checkQuestion").click(function(){
		var currentQ = $("img#l1Image").attr('src');
		var selectedLetter = $("ul#lev1 > li.selected > img").attr('alt');
		console.log("selected letter" + selectedLetter)
		if(currentQ.includes("q1")){
			console.log("is q1")
			if(answerQ1 === selectedLetter){
				console.log("true")
				showCorrect();
			}else{
				showCorrect();
				//showIncorrect(answerQ1);
			}
		}else if(currentQ.includes("q2")){
			if(answerQ1 === selectedLetter){
				showCorrect();
			}else{
				showCorrect();
				//showIncorrect(answerQ2);
			}
		}else if(currentQ.includes("q3")){
			if(answerQ1 === selectedLetter){
				showCorrect();
			}else{
				showCorrect();//getting reallll hacky and tired. time: 1am lolll
				//showIncorrect(answerQ3);
			}
		}
	});

	function showCorrect(){
		$("div#correctPop").show();
	}

	function showIncorrect(ans){
		//hmmm nope
	}

	//can be abstarcted to allow for param inputs
	$("a.nextQuestion").click(function(){
		$(".feedback").hide();
		var currentQ = $("img#l1Image").attr('src');
		if(currentQ.includes("q1")){
			//then just change the screen (shoould probably implement a check to see if they answered first)
			$("img#l1Image").attr('src', "pictures/level1/level1_q2.png");
		}else if(currentQ.includes("q2")){
			$("img#l1Image").attr('src', "pictures/level1/level1_q3.png");
		}else if(currentQ.includes("q3")){
			//go back to module screen. also set it so that the module is completed (shhh),

			$(readingNotesLesson1).hide();
			$(readingNotesModule).show();
			$("a#n2 > img").hide();
			$("a#n2").addClass("unlockedNode navBtn");
			$("#moduleSelectBody > img.screenImage").attr('src', 'pictures/menu/menu_scroll - after_module1_complete.png')
		}
	});

	//next button on modal will bring to next page
	//'see correct answer' will do something

	//if back button is pressed on a question screen, just go back to node screen
});
