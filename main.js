	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"

var readingNotesModule = "div#readingNotesModule"

var readingNotesLesson1 = "div#readingNotesLesson1"
	
var fromSettings = null;
var previousScreen = null;

var currentModule = 3;//for croll to functionality

$(document).ready(function(){
	$(".screen").hide();//super hacky
	$(".popupContainer").hide();
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

	$("#closeSettings").click(function(){
		$("#popup").hide();
		$("#settingsPop").hide();
	});

	$(".settingsBtn").click(function(){
		$("#settingsPop").show();
		$("#popup").show();
	});

	$(".toggleOption").click(function(){
		var elem = $(this).find("i")
		if(elem.hasClass("fa-circle")){
			elem.removeClass("fa-circle")
			elem.addClass("fa-check-circle")
		}else{
			elem.addClass("fa-circle")
			elem.removeClass("fa-check-circle")
		}
	});

	$(".navBtn").click(function(){
		if(allowEnter){
			$(this).closest(".screen").hide();
		}
	});

	$("a#registerBtn").click(function(){
		if(allowEnter){
			$(moduleSelectScreen).show();
		}
	});
	$("#readingNotesModuleBtn").click(function(){
		$(readingNotesModule).show();
	});

	
	//back button nav controllers
	$("a#backToLoginBtn").click(function(){
		$(loginScreen).show();
	});
	$("a#backToModuleSelectBtn").click(function(){
		$(moduleSelectScreen).show();
	});
	$("a#backToModuleBtn").click(function(){
		$(readingNotesModule).show();
	});
	

	//scroll to module on title click
	$('a#scrollToModule').click(function() {
		$('html, body').animate({
		  scrollTop: $("ul#moduleList > li:nth-child("+(currentModule-1)+")").offset().top
		});
	  });


	$("a#n1").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(readingNotesLesson1).show();
	});
	$("a#n2").click(function(){
		//go to the first lesson., start saving the sequence vars
		$(this).closest(".screen").hide();
		$(readingNotesLesson1).show();
	});



////////
///				LESSONS LOGIC
/////

	//would never be able to see hardcoded answers on a mobile device
	//should suck this in via json
	var correct_m1 = [
		["c","d","a"],
		["b","c","c"],
		["b","d","b"],
		["c","d","a"],
		["b","a","a"]
	]

	//find way to create answers array dynamically.
	var answers_m1 = [
		[],
		[],
		[],
		[],
		[]
	]
	/*
	//dynamic in prep for json slurp (not working)
	var answers_m1 = new Array(correct_m1.length);
	for(var i = 0; i < correct_m1.length; i++){
		answers_m1[i].push([]);
	}


	*/
	//will be overwritten many times
	var lessonIndex = 0;
	var questionIndex = 0;
	var selectedAnswer = "";


	$("div.answerWrapper").click(function(){
		$(this).siblings().css("background-color", "#e7d687");
		$(this).css("background-color", "#ffc90e");
		selectedAnswer = $(this).find("option").attr("value");
		console.log("Selected:" + selectedAnswer);
	});

	$("#checkQuestion").click(function(){
		if(selectedAnswer == ""){
			//do nothing right? 
			console.log("User did not select an answer")
			$("answerForm").css("border", "1px solid red");

		}else{
			answers_m1[lessonIndex].push(selectedAnswer);//save in the users answer bank
			console.log("answer:" + correct_m1[lessonIndex][questionIndex]);
			console.log("selected:" + answers_m1[lessonIndex][questionIndex]);
			if(answers_m1[lessonIndex][questionIndex] === correct_m1[lessonIndex][questionIndex]){
				console.log("User got this answer correct");
				$("#correctPop").show();
				$("#popup").show();
			}else{
				console.log("User got this answer incorrect");
			}
	
			if(answers_m1[lessonIndex].length == correct_m1[lessonIndex].length){
				//clear vars and set up for next lesson
				console.log("finished this lesson (node)");
				//handle the evaluation of the student, 1 star per correct answer I guess
				questionIndex = 0;
				lessonIndex++;
			}
			selectedAnswer = ""; //set this back to nothing
		}
	});

	$("#correctPop").click(function(){
		questionIndex++;
		$(".answerWrapper").css("background-color", "#e7d687");
		$("#popup").hide();
		$(this).hide();
		//change the question background image
		//$("#questionImage").attr("src", "pictures/level1/level1_q2.png");
		//dynamic
		var srcStr = "pictures/level" + (lessonIndex+1) + "/level" + (lessonIndex+1) + "_q" + (questionIndex+1) + ".png";
		$("#questionImage").attr("src", srcStr);
	
	});




	//next button on modal will bring to next page
	//'see correct answer' will do something

	//if back button is pressed on a question screen, just go back to node screen
});
