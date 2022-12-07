

// Example showing how to initialize with vanilla js

var largeExample = document.getElementById("largeExample");
largeExample.addEventListener("click", function() {
    unscramble(1000, 25, this);
});

//Without jQuery, you would need to loop through each element provided by getElementsByClass
$(document).ready(function(){
    $(".list-example").mouseenter(function() {
        unscramble(1000, 25, this);
    });

    $("#textToScramble").on("input", function() {
        //need to move input to text-holding element.
        //may consider implementing a source/target for the algorithm
        $("#scrambleTestResult").text($(this).val());
    });

    //Example showing how to use the trigger from a different event/element.
    $("#scrambleTestSubmit").click(function() {
        var element = document.getElementById("scrambleTestResult");
        unscramble($("#unscrambleSpeed").val(), $("#randomizerSpeed").val(), element);
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
                    element.classList.remove("unscrambling");
                }
                unresolvedCharCount--;
            }, charResolveSpeed);
        }
        print();
    }
}
