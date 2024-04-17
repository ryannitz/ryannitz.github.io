

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
        testPercentage: 0
    },


    methods: {

        uploadGenData() {
            const fileElem = $("#uploadedFile")
            if (fileElem) {
              fileElem.click();
            }
        },


        initTest(){
            this.correctAnswerCount = 0
            this.currentQuestionIndex = 0
            this.incorrectlyAnsweredQuestions = []
            this.multiAnswerQuestions = []
            this.scrambleQuestions();

            $("#restartTest").hide()
            $("#submitTest").show()
            $("#results").hide()

            $(".form-check-input").prop('disabled', false);
            $("input").parent().removeClass('correct incorrect')
            $(`input:checked`).prop('checked', false);

            $("#notest").hide()
            $(".question").hide()
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
            console.log(this.multiAnswerQuestions)
        },

        startTest() { //so dumb but the only way to trigger the render
            this.nextQuestion();
            this.previousQuestion();
            $("#startTest").hide()
            $(".test-footer").show()
        },

        previousQuestion(){
            var index = this.currentQuestionIndex;
            if(index == 0){
                return
            }
            
            $(".question").hide()
            $("#"+(index-1)).show()
            this.currentQuestionIndex--;
            console.log(index)
        },

        nextQuestion(){
            var index = this.currentQuestionIndex;
            if(index == Object.keys(this.questions).length-1){
                return
            }
            
            $(".question").hide()
            $("#"+(index+1)).show()
            this.currentQuestionIndex++;
            console.log(index)
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
        },

        restartTest(){
            // $("#restartTest").hide()
            // $("#submitTest").show()
            // $("#results").hide()

            // $(".form-check-input").prop('disabled', false);
            // $("input").parent().removeClass('correct incorrect')
            // $(`input:checked`).prop('checked', false);
            

            this.initTest()
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
                text = text.replaceAll("\'", "\"")

                //remove python comment lines
                var regex = new RegExp('#.*', 'g');
                text = text.replaceAll(regex, "")

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
            //console.log(text)
            //generate the test
            this.questions = JSON.parse(text)
            this.initTest();
        },

        clearGenText(){
            $("#textfield").val("")
        }

    },


    beforeMount() {

    },

    mounted() {

    },

    updated() {

    },

    created() {

    },

    computed: {

    }
});

$(document).ready(function(){
    $("form").submit(function (e) { 
        e.preventDefault();
    });

    $("#uploadedFile").change( async function(){
        const uploadedFile = $(this).prop('files')[0];
        const fileContents = await uploadedFile.text();
        $("#textfield").val(fileContents)
    })
});
