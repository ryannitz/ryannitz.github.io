// var scramble = document.getElementById("scramble");
// scramble.addEventListener("click", function() {
//     unscramble(1000, 25, this);
// });

var largeExample = document.getElementById("largeExample");
largeExample.addEventListener("click", function() {
    unscramble(1000, 25, this);
});

//used jquery to avoid looping through class elements.
$(document).ready(function(){
    $(".list-example").mouseenter(function() {
        unscramble(1000, 25, this);
    });

    $("#textToScramble").on("input", function(){
        $("#scrambleTestResult").text($(this).val());
    });

    $("#scrambleTestSubmit").click(function() {
        var element = document.getElementById("scrambleTestResult");
        unscramble($("#unscrambleSpeed").val(),$("#randomizerSpeed").val(),element);
    })
});


function unscramble(unscrambleSpeed, randomizerSpeed, element) {
    if(element.classList.contains("unscrambling")) {
        return;
    }else{
        element.classList.add("unscrambling");
    
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
        var charactersLength = characters.length;

        var textsrc = element
        var text = element.innerText;

        var resolvedText = "";
        var unresolvedCharCount = text.length;
        
        var charResolveSpeed =  unscrambleSpeed/text.length;
        if(charResolveSpeed <= randomizerSpeed) {
            randomizerSpeed = charResolveSpeed/1.01;
        }

        var print = function() {
            setTimeout(function() {
                if(unresolvedCharCount > 0) {
                    resolvedText = resolvedText + text.charAt(resolvedText.length);
                    var innerInterval = setInterval(function() {
                        var unresolved = '';
                        for ( var i = 0; i < unresolvedCharCount; i++ ) {
                            /*
                            if the text is longer than a line, we will need to add logic to handle approximate sizing bins for chars.
                            This will stop large sections of text from randomly expanding and collapsing 
                            */
                            unresolved += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        textsrc.innerText = resolvedText + unresolved;
                        console.log("AHHH");
                    }, randomizerSpeed)
                    print();
                    setTimeout(function() {
                        clearInterval(innerInterval);
                    }, charResolveSpeed);

                }else {
                    console.log("Done");
                    element.classList.remove("unscrambling");
                }
                unresolvedCharCount--;

            }, charResolveSpeed);
        }
        print();
    }
}
