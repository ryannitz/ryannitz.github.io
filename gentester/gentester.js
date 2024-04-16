var app = new Vue({
    el: "#app",


    data : {
        onTestPage: true,
        onCreatorPage: false,

        devQuestions : {
            'Planes are: \n a. Cool \n b. Not Cool \n c. IDK \n d. TEST?': 'a',
            'Clouds are: \n a. Made of evaporated tears \n b. Fake \n c. Water I guess \n d. CLOUDS!': 'd',
        },

        questions: {},
        currentQuestionIndex: 0,
        correctAnswerCount: 0,

        incorrectlyAnsweredQuestions: {},
        testPercentage: 0
    },


    methods: {
        initTest(){
            this.correctAnswerCount = 0
            this.currentQuestionIndex = 0
            this.scrambleQuestions();
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
                this.questions[randomQuestion] = answer
                delete tempQuestions[randomQuestion]
            }
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
                var userAnswer = $(`input[name="${i}"]:checked`).val()
                //just show the correct answer always
                $(`input[name="${i}"][value="${correctAnswer}"]`).parent().addClass('correct')

                if(userAnswer === correctAnswer){
                    this.correctAnswerCount++;
                }else{
                    $(`input[name="${i}"]:checked`).parent().addClass('incorrect')
                }
            }
            this.testPercentage = ((this.correctAnswerCount/Object.keys(this.questions).length)*100).toFixed(2)
            $("#submitTest").hide()
            $("#restartTest").show()
            $("#results").show()
        },

        restartTest(){
            $("#restartTest").hide()
            $("#submitTest").show()
            $("#results").hide()

            $("input").parent().removeClass('correct incorrect')
            $(`input:checked`).prop('checked', false);
            

            this.initTest()
        },
        
        loadExampleGen(){
            this.questions = this.devQuestions
            this.restartTest()
            $(".test-footer").hide()
            $("#startTest").show()
           
        },

        loadTextGen(){
            var text = $("#textfield").val()
            if(text){
                text = text.replaceAll("\'", "\"")
                if(text.charAt(text.length-1) === ","){
                    text = "{" + text.slice(0, -1) + "}"
                    this.questions = JSON.parse(text)
                    this.initTest();
                }
            }
        }

    },


    beforeMount() {

    },

    mounted() {

    },

    updated() {

    },

    created() {
        //$(".question").hide()
    },

    computed: {

    
    }
});

$(document).ready(function(){
    $("form").submit(function (e) { 
        e.preventDefault();
    });

    // $("#loadExampleGen").click(function(){
    //     $("#notest").hide()
    //     $("#test").show()
    // });

    //$("#textfield").val("'Planes are: \n a. Cool \n b. Not Cool \n c. IDK \n d. TEST?': 'a','Clouds are: \n a. Made of evaporated tears \n b. Fake \n c. Water I guess \n d. CLOUDS!': 'd',")
});

$(document)
.on("mouseenter", "", function(){

}).on("mouseleave", "", function(){

})
