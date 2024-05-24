
/*
    Behold the actual worst code to do this... Only using vue to hack the question bindings.
    Yes I could've parsed the questions and answers and stored them in an array as proper objects... did I... ha? 
*/
var app = new Vue({
    el: "#app",


    data : {
        onTestPage: true,
        onCreatorPage: false,

        devQuestions : {
            'Planes are: \n a. Cool \n b. Not Cool \n c. IDK \n d. TEST?': 'a',
            'Clouds are: \n a. Made of evaporated tears \n b. Fake \n c. Water I guess \n d. CLOUDS!': 'd',
        },

        devQuestionsText : `'Planes are: \\n a. Cool \\n b. Not Cool \\n c. IDK \\n d. TEST?': 'a', \n'Clouds are: \\n a. Made of evaporated tears \\n b. Fake \\n c. Water I guess \\n d. CLOUDS!': 'd',`,

        questions: {},
        currentQuestionIndex: 0,
        correctAnswerCount: 0,

        multiAnswerQuestions : [],

        incorrectlyAnsweredQuestions: [],
        testPercentage: 0,

        unAnsweredQuestionCount: 0
    },


    methods: {

        uploadGenData() {
            const fileElem = $("#uploadedFile")
            if (fileElem) {
              fileElem.click();
            }
        },

        restartTest(){
            this.initTest()
        },

        initTest(){
            this.correctAnswerCount = 0
            this.currentQuestionIndex = 0
            this.incorrectlyAnsweredQuestions = []
            this.scrambleQuestions();

            $("#restartTest").hide()
            $("#submitTest").show()
            $("#results").hide()

            $(".form-check-input").prop('disabled', false);
            $("input").parent().removeClass('correct incorrect')
            $(".form-check").removeClass('disabled-answer');
            $(`input:checked`).prop('checked', false);

            $("#notest").hide()
            $(".question").hide()
            $(".maqa").hide()
            $("#test").show()
            $("#0").show()
        },

        scrambleQuestions(){
            var tempQuestions = this.questions;
            this.questions = {}
            while(Object.keys(tempQuestions).length > 0){
                var randomIndex = Math.floor(Math.random()*Object.keys(tempQuestions).length);
                var randomQuestion = Object.keys(tempQuestions)[randomIndex]
                var answer = tempQuestions[randomQuestion]
                if(answer.length==1){
                    this.questions[randomQuestion] = answer
                }else{
                    var multiAnswerQuestion = {
                        q: randomQuestion,
                        a: answer
                    }
                    this.multiAnswerQuestions.push(multiAnswerQuestion)
                }
                
                delete tempQuestions[randomQuestion]
            }
            this.unAnsweredQuestionCount = Object.keys(this.questions).length
            console.log(this.multiAnswerQuestions)
        },

        startTest() { //so dumb but the only way to trigger the render
            this.nextQuestion();
            this.previousQuestion();
            $("#startTest").hide()
            $(".test-hidden").show()
            $("#gen").collapse()
        },

        revealAnswer(questionIndex) {
            var correctAnswer = this.questions[Object.keys(this.questions)[questionIndex]]
            $(`input[name="${questionIndex}"][value="${correctAnswer}"]`).parent().addClass('correct')
            $("#"+questionIndex).find(".revealAnswer").hide()
            $("#"+questionIndex).find(".hideAnswer").show()
        },

        hideAnswer(questionIndex) {
            var correctAnswer = this.questions[Object.keys(this.questions)[questionIndex]]
            $(`input[name="${questionIndex}"][value="${correctAnswer}"]`).parent().removeClass('correct')
            $("#"+questionIndex).find(".hideAnswer").hide()
            $("#"+questionIndex).find(".revealAnswer").show()
        },

        previousQuestion(){
            if(this.currentQuestionIndex == 0){
                return
            }
            this.currentQuestionIndex--;
            $(".question").hide()
            $("#"+(this.currentQuestionIndex)).show()
            console.log(this.currentQuestionIndex)
        },

        nextQuestion(){
            if(this.currentQuestionIndex == Object.keys(this.questions).length-1){
                return
            }
            this.currentQuestionIndex++;
            $(".question").hide()
            $("#"+(this.currentQuestionIndex)).show()
            console.log(this.currentQuestionIndex)
        },

        manualQuestionDisplay(){
            var requestedQuestion = parseInt($("#questionNumber").val())
            if(!requestedQuestion){
                requestedQuestion = 1
            }
            this.currentQuestionIndex = requestedQuestion-1;
            if(this.currentQuestionIndex > Object.keys(this.questions).length-1){
                this.currentQuestionIndex = Object.keys(this.questions).length-1
            }
            if(this.currentQuestionIndex < 0){
                this.currentQuestionIndex = 0
            }

            $(".question").hide()
            $("#"+(this.currentQuestionIndex)).show()
            $("#questionNumber").val(this.currentQuestionIndex+1)
            console.log(this.currentQuestionIndex)
            
        },


        submitTest(){
            for(var i = 0; i < Object.keys(this.questions).length; i++){
                var correctAnswer = this.questions[Object.keys(this.questions)[i]]
                var userA = $(`input[name="${i}"]:checked`).val()
                //just show the correct answer always
                $(`input[name="${i}"][value="${correctAnswer}"]`).parent().addClass('correct')

                if(userA === correctAnswer){
                    this.correctAnswerCount++;
                }else{
                    $(`input[name="${i}"]:checked`).parent().addClass('incorrect')
                    incorrectQA = {
                        question: Object.keys(this.questions)[i],
                        answer: correctAnswer,
                        userAnswer: userA
                    }
                    this.incorrectlyAnsweredQuestions.push(incorrectQA);
                }
            }
            
            this.testPercentage = ((this.correctAnswerCount/Object.keys(this.questions).length)*100).toFixed(2)
            $("#submitTest").hide()
            $("#restartTest").show()
            $("#results").show()
            $(".form-check-input").prop('disabled', true);
            $(".form-check").addClass('disabled-answer');
        },
        
        insertExampleGen(){
            $("#textfield").val(this.devQuestionsText)
        },

        cleanInput(text){

            //find the two encapsulating curly braces
            if(text.includes("{") && text.includes("}")){
                if(text.includes("{}")){//removing orig comment
                    text = text.replace("{}", "")
                }
                text = text.substring(text.indexOf("{")+1, text.indexOf("}"))
            }
            return text
        },

        parseQuestions(text){
            if(text){
                //cannot parse json with ' symbols
                text = text.replaceAll("\\'", "APOST")
                text = text.replaceAll("\'", "\"")
                text = text.replaceAll("APOST", "\\'")

                //remove python comment lines
                var regex = new RegExp('#.*', 'g');
                text = text.replaceAll(regex, "")

                text = text.replaceAll('\\\n', "")
                text = text.replaceAll('\\n', "NEWLINE")
                text = text.replaceAll("\\", "")
                text = text.replaceAll("NEWLINE", "\\n")

                //finally remove the last comma
                text = text.substring(0, text.lastIndexOf(","))
            
                //wrap everything in json curly brackets to parse as an obj
                text = "{" + text + "}"
                return text
            }
            return null
        },


        loadGenText(){
            var text = $("#textfield").val()
            if(!text){
                console.log("No value in text field")
                createAlert(alertType.danger, alertLocation.top, 5000, "No valid value provided in text field. Reference the instructions prompt for more...")
                return
            }
            text = this.cleanInput(text);
            text = this.parseQuestions(text);
            if(!text){
                console.log("Could not parse input")
                createAlert(alertType.danger, alertLocation.top, 5000, "Could not parse the input. Reference the instructions prompt for more...")
                return
            }
            console.log(text)
            try {
                this.questions = JSON.parse(text)
                this.multiAnswerQuestions = []
                this.initTest();
            } catch (error) {
                createAlert(alertType.danger, alertLocation.top, -1, "Could not parse the input. Standar format rule was broken")
                console.log(error)
            }
        },

        clearGenText(){
            $("#textfield").val("")
        },

        clickAnswer(){
            console.log("Answer Clicked")
            this.unAnsweredQuestionCount = Object.keys(this.questions).length - $('.form-check-input:checked').length
        }

    },


    beforeMount() {

    },

    mounted() {

    },

    updated() {

    },

    created() {
        window.addEventListener('keydown', function(e) { 
            var keyCode = e.keyCode || e.which; 
            if (keyCode == 37) {
                app.previousQuestion()
            } 
            if (keyCode == 39) {
                app.nextQuestion()
            } 
        })
    },

    computed: {

    }
});

$(document).ready(function(){
    window.onbeforeunload = function(){return "Leaving?"}
    $("form").submit(function (e) { 
        e.preventDefault();
    });

    $("#toggleDarkMode").click(function(){
        var currentTheme = document.documentElement.getAttribute('data-bs-theme')
        if(currentTheme == 'dark'){
            document.documentElement.setAttribute('data-bs-theme', "light")
        }else{
            document.documentElement.setAttribute('data-bs-theme', "dark")
        }
        
    })


    $("#uploadedFile").change( async function(){
        const uploadedFile = $(this).prop('files')[0];
        const fileContents = await uploadedFile.text();
        $("#textfield").val(fileContents)
    })
});

$(document)
    .on("click", ".form-check", function() {
        if(!$(this).hasClass('disabled-answer')){
            $(this).find("input").prop("checked", true);   
        }
    })
    .on("click", ".show-maqa", function() {
        $(this).siblings().show()  
    })


