	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"


var readingNotesModule = "div#readingNotesModule"

var readingNotesLesson1 = "div#readingNotesLesson1"
	
var fromSettings = null;

var currentModule = 3;

$(document).ready(function(){
	$(".fitScreen").hide();//super hacky
	$(loginScreen).show();


	//general controller for nav buttons
	$(".navBtn").click(function(){
		$(this).closest(".fitScreen").hide();
	});
	
	
	$("a#registerBtn").click(function(){
		$(moduleSelectScreen).show();
	});
	$("a#backToLoginBtn").click(function(){
		$(loginScreen).show();
	});
	
	$("a#readingNotesModuleBtn").click(function(){
		$(readingNotesModule).show();
	});
	$("a#backToModulesBtn").click(function(){
		$(moduleSelectScreen).show();
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
	$("a.nodeBtn").click(function(){
		(this).children().attr('src', unlocked)
		(this).addClass("unlockedNode");
	});

	$("a.#n1").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(readingNotesLesson1).show();
	});

});
