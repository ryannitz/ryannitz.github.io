	
var loginScreen = "div#loginScreen"
var moduleSelectScreen = "div#moduleSelectScreen"
var settingsScreen = "div#settingsScreen"

var readingNotesModule = "div#readingNotesModule"

var readingNotesLesson1 = "div#readingNotesLesson1"
	
var fromSettings = null;
var previousScreen = null;

var currentModule = 3;//for scroll to functionality

var lessonIndex = 0;
var questionIndex = 0;

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

	$(".nodeBtn").click(function(){
		var nodeIndex = $(this).index();
		if($(this).hasClass("unlockedNode")){
			lessonIndex = nodeIndex;
			questionIndex = 0;
			populateAnswers(lessonIndex, questionIndex);
			$(readingNotesLesson1).show();
			changeQuestionImage(lessonIndex, questionIndex);
		}else{
			//highlight the previous node for completion maybe??
			//complete nodeIndex-1
		}

		if(answers_m1[nodeIndex].length > 0){
			answers_m1[nodeIndex] = [];
		}
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


	//console.log(vals_m1[0][3].length);
	/*
	//dynamic in prep for json slurp (not working)
	var answers_m1 = new Array(correct_m1.length);
	for(var i = 0; i < correct_m1.length; i++){
		answers_m1[i].push([]);
	}
	*/

	//will be overwritten many times
	var selectedAnswer = "";

	function populateAnswers(lessonIndex, questionIndex){
		$("#answerForm").html("");
		log("lessonIndex: " + lessonIndex);
		log("questionIndex: " + questionIndex);
		log("Num of choices on vals_m1["+lessonIndex+"]["+questionIndex+"]: "+vals_m1[lessonIndex][questionIndex].length);
		for(var i = 0; i < vals_m1[lessonIndex][questionIndex].length; i++){
			var opt = opts[i];
			var val = vals_m1[lessonIndex][questionIndex][i];
			log("option: "+opt+" has value: "+val);
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
		log("Selected:" + selectedAnswer);
		$("#checkQuestion").show();
	});

	$("#checkQuestion").click(function(){
		if(selectedAnswer == ""){
			//do nothing right? //will never hit here because we are hiding the button
			log("User did not select an answer")

		}else{
			answers_m1[lessonIndex].push(selectedAnswer);//save in the users answer bank
			log("selected:" + answers_m1[lessonIndex][questionIndex]);
			log("correct with [" +lessonIndex+ "][" +questionIndex+ "] ==" +correct_m1[lessonIndex][questionIndex]);
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
		log("User got this answer: " + result);
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
			log("Resetting the question index to 0");
			questionIndex = 0;
			lessonIndex++;//will remove this because the user will be clicking to set the lessonIndex

			var correctCount = $(".indCorrect").length;
			$(".feedbackInd").removeClass("indWrong");
			$(".feedbackInd").removeClass("indCorrect");
			log("Finished lesson " +lessonIndex+ " with " + correctCount + " correct answers");
		
			//if passed, increase the lessonIndex (index may need to be set depending on which node they click )
			//bring to module screen 
			//show congrats message
			//award appropriate stars
			//unlock the next node, 
			if(correctCount > 1){
				log("User can proceed to next lesson");
				showLessonResult("pass");
				awardStars(correctCount, lessonIndex);
				unlockNextLesson(lessonIndex);
			}else{
			//not passed
			//bring to module screen,
			//show not good message
			//do not unlock the next node,
			//give no stars. 
			//cry
				log("User cannot proceed to next lesson");
				showLessonResult("fail");
			}
			$(readingNotesLesson1).hide();
			$(readingNotesModule).show();
			$(".feedback").hide();
		}else{
			//if all lessons/boss is complete
			if(lessonIndex == correct_m1.length){
				log("Module complete, trigger the congrats message if they passed")

			}else{//else, set up the next screen image etc..
				if(lessonIndex == correct_m1.length-1){//boss level
					$("#l1q1").css('right', '25%');
				}
				changeQuestionImage(lessonIndex, questionIndex);
				populateAnswers(lessonIndex, questionIndex);
				$(".feedback").hide();
			}

			//do these regardless
			$(".answerWrapper").css("background-color", "#e7d687");
			$("#popup").hide();
		}
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
		log("Correct answer was: " + correct);

		answerIndex = opts.indexOf(correct);
		$(".answerWrapper:nth-child("+(answerIndex+1)+")").css('background-color', 'green');
	});

	injectStars();
	function injectStars(){
		var html = '<div><img class="nodeStar lockedStar" src="pictures/module1/module_level_comp2.png" alt="star 2"/>';
		html += '<img class="nodeStar lockedStar middleStar" src="pictures/module1/module_level_comp1.png" alt="star 1"/>';
		html += '<img class="nodeStar lockedStar" src="pictures/module1/module_level_comp3.png" alt="star 3"/></div>';
		$(".nodeBtn").prepend(html);
	}

	function awardStars(starCount, nodeIndex){
		log("Awarding stars: "+ starCount);
		$(".nodeBtn:nth-child("+(nodeIndex)+") > div > img").removeClass("lockedStar");
		if(starCount == 2){
			$(".nodeBtn:nth-child("+(nodeIndex)+") > div > img:nth-child(3)").addClass("lockedStar");
		}
	}

	function changeQuestionImage(lessonNum, questionNum){
		if(lessonNum == correct_m1.length-1){//boss level
			var srcStr = "pictures/levelBoss/boss_q" + (questionNum+1) + ".png";
		}else{
			var srcStr = "pictures/level" + (lessonNum+1) + "/level" + (lessonNum+1) + "_q" + (questionNum+1) + ".png";
		}
		$("#questionImage").attr("src", srcStr);
	}

	function showLessonResult(result){
		if(result == "pass"){
			log("showing passed popup");
			var imgSrc = "pictures/level_objects/completing_level_all_answer_correct.png";
		}else{
			console.log("showing lost popup");
			var imgSrc = "pictures/level_objects/completing_level_incorrect_answers.png";
		}
		log("showing....");
		$("#lessonResultPop > img").attr("src", imgSrc);
		$("#popup").show();
		$("#lessonResultPop").removeClass("hide").show();
		$("#popup").show();
	}

	$("#lessonResultPop").click(function(){
		$("#popup").hide();
		$(this).hide();
	});

	function unlockNextLesson(lessonIndex){
		if($(".nodeBtn").length > lessonIndex){
			var nextNode = $(".nodeBtn:nth-child("+(lessonIndex+1)+")");
			nextNode.addClass("unlockedModule").addClass("navBtn");
			$(".nodeBtn:nth-child("+(lessonIndex+1)+") > img").remove();
			$(".nodeBtn:nth-child("+(lessonIndex+1)+") > div > img").removeClass()
		}
	}



	var debug = true;
	function log(message){
		if(debug == true){
			console.log(message);
		}
	}
});
