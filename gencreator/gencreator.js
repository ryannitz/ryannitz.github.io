
/*
    Behold the actual worst code to do this... Only using vue to hack the question bindings.
    Yes I could've parsed the questions and answers and stored them in an array as proper objects... did I... ha? 
    Using actual component architecture? Couldn't be me
*/
var app = new Vue({
    el: "#app",


    data : {

        newQuestion:"",
        newAnswerA:"",
        newAnswerB:"",
        newAnswerC:"",
        newAnswerD:"",
        newCorrectAnswer: 'a',

        creatorQuestions : {},

        creatorQuestionsMyWay : [],

        creatorQuestionMyWay : {
            oldGenQuestion: "",
            question: "",
            answers:[

            ],
            correctAnswer: ""
        },

    },


    methods: {

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
                console.log(text)
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
            var text = $("#plainTextGen").val()
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
                this.creatorQuestions = JSON.parse(text)
                console.log(this.creatorQuestions)
            } catch (error) {
                createAlert(alertType.danger, alertLocation.top, -1, "Could not parse the input. Standar format rule was broken")
                console.log(error)
            }
        },

        reloadGenTextField(){
            var genTextField = ""
            for(var i = 0; i < Object.keys(this.creatorQuestions).length; i++){
                var key = Object.keys(this.creatorQuestions)[i]
                var val = this.creatorQuestions[key];

                key = key.substring(1,key.length-1)
                console.log(key)
                key = key.replaceAll(`\'`, `\\\'`)
                val = val.replaceAll(`\"`, `\'`)
                key = key.replaceAll(`\n`, `\\n`)
            
                var questionText = `'${key}':'${val}', \n`;
                console.log(questionText)
                genTextField += questionText
                
            }
            $("#plainTextGen").val(genTextField)
            this.$forceUpdate();
        },

        addNewQuestion() {

            var keyString = `${this.newQuestion} \\n a. ${this.newAnswerA} \\n b. ${this.newAnswerB} \\n c. ${this.newAnswerC} \\n d. ${this.newAnswerD}`
            keyString = keyString.replaceAll(`\"`, "\'")
            var objKey = `"${keyString}"`

            var objVal = `${this.newCorrectAnswer}`
            if(objKey in this.creatorQuestions){
                return
            }

            // this.creatorQuestionMyWay.question = this.newQuestion.replaceAll(`\"`, "\'"),
            // this.creatorQuestionMyWay.oldGenQuestion = objKey,
            // this.creatorQuestionMyWay.answers = [
            //     this.newAnswerA.replaceAll(`\"`, "\'"),
            //     this.newAnswerB.replaceAll(`\"`, "\'"),
            //     this.newAnswerC.replaceAll(`\"`, "\'"),
            //     this.newAnswerD.replaceAll(`\"`, "\'"),
            // ]
            // this.creatorQuestionMyWay.correctAnswer = ""//idk, we will fix this later to use this instead of one string containing the question and all the answers.
            // this.creatorQuestionsMyWay.push(this.creatorQuestionMyWay)

            this.creatorQuestions[objKey] = objVal
            console.log(this.creatorQuestions)

            this.reloadGenTextField()
        },

        removeQuestion(question){
            delete this.creatorQuestions[question]
            this.creatorQuestionsMyWay = this.creatorQuestionsMyWay.filter(function( creatorQuestionMyWay ) {
                return creatorQuestionMyWay.oldGenQuestion !== question;
            });
            this.reloadGenTextField()
        },

        populateUIfromQuestion(question){
            this.newQuestion = question.substring(1, question.indexOf(` \\n a. `))
            this.newAnswerA = question.substring(question.indexOf(` \\n a. `)+7, question.indexOf(` \\n b. `))
            this.newAnswerB = question.substring(question.indexOf(` \\n b. `)+7, question.indexOf(` \\n c. `))
            this.newAnswerC = question.substring(question.indexOf(` \\n c. `)+7, question.indexOf(` \\n d. `))
            this.newAnswerD = question.substring(question.indexOf(` \\n d. `)+7, question.length-1)
            console.log(this.newQuestion)
            console.log(this.newAnswerA)
            console.log(this.newAnswerB)
            console.log(this.newAnswerC)
            console.log(this.newAnswerD)
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
        newQuestionPrompt: function() {
            var val = ` ${this.newQuestion} \n a. ${this.newAnswerA} \n b. ${this.newAnswerB} \n c. ${this.newAnswerC} \n d. ${this.newAnswerD} `
            return val.replaceAll(`\"`, `\'`)
        },
    }

});

$(document).ready(function(){
    //window.onbeforeunload = function(){return "Leaving?"}
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

    $(".newAnswer").change(function(){
        var val = $('input[name="newCorrectAnswer"]:checked').val()
        $(`input[name="exampleAnswer"]`).parent().removeClass("correct")
        $(`input[name="exampleAnswer"][value="${val}"]`).parent().addClass("correct")
    })
});

$(document)



