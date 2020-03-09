	
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


	opts = ["a", "b", "c", "d", "e"]//could do this dynamically with charCodes but meh

	vals_m1 = [
		[//lesson 1
			["A","B","C","D"],//q1 = vals_m1[0][0][2] == "C"
			["A","B","C","D"],
			["A","B","C","D"]
		],
		[//lesson 2
			["2","4","8","10"],//q1
			["2","4","8","10"],
			["2 quarter notes","2 half notes","1 whole note","2 whole notes"]
		],
		[//lesson 3
			["1","2","3","4"],//q1
			["1","2","3","4"],
			["half","one and half","two and half","not allowed"]
		],
		[//lesson 4
			["1","2","3","4"],//q1
			["1","2","3","4"],
			["whole rest","half rest"]
		],
		[//boss level
			["A","B","C","D"],//q1
			["4","6","8","10"],
			["whole rest","half rest"]
		]
	];

	//would never be able to see hardcoded answers on a mobile device
	//should suck this in via json
	var correct_m1 = [
		["c","d","a"],
		["b","c","c"],
		["b","d","b"],
		["a","c","b"],
		["b","a","a"]
	];

	//find way to create answers array dynamically.
	var answers_m1 = [
		[],
		[],
		[],
		[],
		[]
	];
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

	function populateAnswers(lessonIndex, questionIndex){
		$("#answerForm").html("");
		console.log("Num of choices: "+vals_m1[lessonIndex][questionIndex].length);
		for(var i = 0; i < vals_m1[lessonIndex][questionIndex].length; i++){
			var opt = opts[i];
			var val = vals_m1[lessonIndex][questionIndex][i];
			console.log("option: "+opt+" has value: "+val);
			injectMCOption(opt, val);
		}
	}

	function injectMCOption(opt, opt_val){
		var html = '<div class="answerWrapper">';
		html += '<label for="">'+opt+'.</label> &nbsp;';
		html += '<option class="answer" value="'+opt+'">'+opt_val+'</option>';
		html += '</div>';
		$("#answerForm").append(html);
	}

	$("#answerForm").on('click', 'div.answerWrapper',  function(){
		$(this).siblings().css("background-color", "#e7d687");
		$(this).css("background-color", "#ffc90e");
		selectedAnswer = $(this).find("option").attr("value");
		console.log("Selected:" + selectedAnswer);
		$("#checkQuestion").show();

		/*
		console.log($("#answerForm").css('border'));
		console.log($("#answerForm").css('border') == '1px solid rgb(255, 0, 0)');
		if($("#answerForm").css('border') == '1px solid rgb(255, 0, 0)'){
			console.log("Red Border is on");
			$("#answerForm").css("border", "0px solid red")
		}*/
	});

	$("#checkQuestion").click(function(){
		if(selectedAnswer == ""){
			//do nothing right? //will never hit here because we are hiding the button
			console.log("User did not select an answer")
			//$("#answerForm").css("border", "1px solid red");

		}else{
			answers_m1[lessonIndex].push(selectedAnswer);//save in the users answer bank
			console.log("selected:" + answers_m1[lessonIndex][questionIndex]);
			console.log("correct with [" +lessonIndex+ "][" +questionIndex+ "] ==" +correct_m1[lessonIndex][questionIndex]);
			if(answers_m1[lessonIndex][questionIndex] === correct_m1[lessonIndex][questionIndex]){
				showFeedBack("correct");
			}else{
				showFeedBack("wrong")
			}
			selectedAnswer = ""; //set this back to nothing
			$("#checkQuestion").hide();
		}
	});

	function showFeedBack(result){
		console.log("User got this answer: " + result);
		$("#"+result+"Pop").show();
		$("#popup").show();

		if(result == "correct"){
			$("ul#feedbackIndicators > li.feedbackInd:nth-child("+(questionIndex+1)+")")
			.addClass("indCorrect");
		}else{
			$("ul#feedbackIndicators > li.feedbackInd:nth-child("+(questionIndex+1)+")")
			.addClass("indWrong");
		}
	}

	function nextQuestion(){
		questionIndex++;
		if(answers_m1[lessonIndex].length == correct_m1[lessonIndex].length){
			questionIndex = 0;
			lessonIndex++;

			var correctCount = $(".indCorrect").length;
			$(".feedbackInd").removeClass("indWrong");
			$(".feedbackInd").removeClass("indCorrect");
			console.log("Finished lesson " +lessonIndex+ " with " + correctCount + " correct answers");
		}

		//if all lessons/boss is complete
		if(lessonIndex == correct_m1.length){
			console.log("Module complete, trigger the congrats message if they passed")

		}else{//else, set up the next screen image etc..
			if(lessonIndex == correct_m1.length-1){//boss level
				$("#l1q1").css('right', '25%');
				var srcStr = "pictures/levelBoss/boss_q" + (questionIndex+1) + ".png";
			}else{
				var srcStr = "pictures/level" + (lessonIndex+1) + "/level" + (lessonIndex+1) + "_q" + (questionIndex+1) + ".png";
			}
			$("#questionImage").attr("src", srcStr);
			populateAnswers(lessonIndex, questionIndex);
		}


		$(".answerWrapper").css("background-color", "#e7d687");
		$("#popup").hide();
		$(".feedback").hide();
	}

	$("#correctPop").click(function(){
		nextQuestion();
	});

	$("#nextQuestion").click(function(){
		nextQuestion();
		$("div.popupContainer").css("background-color", "rgba(0, 0, 0, 0.7)");
	});

	$("#showCorrect").click(function(){
		$("div.popupContainer").css("background-color", "rgba(0, 0, 0, 0.0)");
		var correct = correct_m1[lessonIndex][questionIndex];
		console.log("Correct answer was: " + correct);

		answerIndex = opts.indexOf(correct);
		$(".answerWrapper:nth-child("+(answerIndex+1)+")").css('background-color', 'green');
	});

	function injectStars(){

		if(lessonIndex != 0){

		}

		html += '<div><img class="nodeStar" src="pictures/module1/module_level_comp2.png" alt="star 2"/>';
		html += '<img class="nodeStar middleStar" src="pictures/module1/module_level_comp1.png" alt="star 1"/>';
		html += '<img class="nodeStar" src="pictures/module1/module_level_comp3.png" alt="star 3"/></div>';
		var lessonLength = $(".nodeBtn").length;
		for(var i = 0; i < lessonLength; i++){
			$(".nodeBtn").prepend(html);
		}
		
	}
});
