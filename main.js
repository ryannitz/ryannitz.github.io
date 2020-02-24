	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"
var beatsModuleScreen = "div#beatsModuleScreen"
	
var fromSettings = null;

$(document).ready(function(){
	$(".fitScreen").hide();//super hacky
	$(loginScreen).show();


	//general controller for nav buttons
	$(".navBtn").click(function(){
		$(this).parent().hide();
	});
	
	
	$("a#registerBtn").click(function(){
		$(moduleSelectScreen).show();
	});
	$("a#backToLoginBtn").click(function(){
		$(loginScreen).show();
	});
	
	$("a#beatsModuleBtn").click(function(){
		$(beatsModuleScreen).show();
	});
	$(".moduleBtn").click(function(){
		$(this).parent().parent().parent().hide();
	});
	$("a#backToModulesBtn").click(function(){
		$(moduleSelectScreen).show();
	});
	
	
	$("a#settingsBtn").click(function(){
		fromSettings = $(this).parent().attr('id');
		$(settingsScreen).show();
	});
	//dynamic controller for returning to correct screen 
	$("a#backFromSettingsBtn").click(function(){
		$("div#"+fromSettings).show();
	});
});
