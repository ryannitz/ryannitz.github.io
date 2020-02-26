	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"


var readingNotesModule = "div#readingNotesModule"

var readingNotesLesson1 = "div#readingNotesLesson1"
	
var fromSettings = null;
var previousScreen = null;

var currentModule = 3;

$(document).ready(function(){
	$(".fitScreen").hide();//super hacky
	$(loginScreen).show();
	previousScreen = "loginScreen"



	$("a.backBtn").click(function(){
		console.log("Back to: " + previousScreen)
		$(this).closest(".fitScreen").hide();
		if(previousScreen != null){
			$("div#"+previousScreen).show();
		}else{
			console.log("Do something");
		}
	});
	//general controller for nav buttons
	$(".navBtn").click(function(){
		previousScreen = $(this).closest(".fitScreen").attr('id');
		console.log("setting previous:" + previousScreen)
		$(this).closest(".fitScreen").hide();
		
	});
	
	$("a#registerBtn").click(function(){
		$(moduleSelectScreen).show();
	});

	$("a#readingNotesModuleBtn").click(function(){
		$(readingNotesModule).show();
	});

	$("a#settingsBtn").click(function(){
		fromSettings = $(this).closest(".fitScreen").attr('id');
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

	var unlocked = "pictures/module1/module1_level_unlocked.png"
	$("a.nodeBtn").click(function(){//use this for when a lesson is completed
		$(this).children().attr('src', unlocked)
	});

	$("a#n1").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(readingNotesLesson1).show();
	});


	//could allow for changing between options, but not now. Pick once bruv
	//thus the "l1_q1_picked bool"
	var l1_q1_picked = false;
	var l1_q1_letter = null;
	var level1_ans = "pictures/level1/level1_ans/level1_ans_";
	var selectedStr = "_select.png"
	$("li.lessonsMultChoiceOpt").click(function(){
		if(!level1_picked){
			l1_q1_letter = $(this).children().attr('alt');
			var newSrc = level1_ans  + l1_q1_letter + selectedStr;
			$(this).children().attr('src', newSrc);
			level1_picked = true;
		}
		
	});

	//onclick of next btn in lessons, show if correct modal

	//next button on modal will bring to next page
	//see correct answer will do something
});
