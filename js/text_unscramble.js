

// Example showing how to initialize with vanilla js

var largeExample = document.getElementById("largeExample");
largeExample.addEventListener("click", function() {
    unscramble(1000, 25, this, this);
});

//Without jQuery, you would need to loop through each element provided by getElementsByClass
$(document).ready(function(){
    $(".list-example").mouseenter(function() {
        unscramble(1000, 25, this, this);
    });

    $("#textToScramble").on("input", function() {
        //need to move input value to a text-holding element.
        $("#scrambleTestResult").text($(this).val());
    });
    //Example showing how to use the trigger from a different event/element.
    $("#scrambleTestSubmit").click(function() {
        var element = document.getElementById("scrambleTestResult");
        unscramble($("#unscrambleSpeed").val(), $("#randomizerSpeed").val(), element, element);
    })

    $("#targetSourceSubmit").click(function() {
        var sourceElement = document.getElementById("sourceExample");
        var targetElement = document.getElementById("targetExample");
        unscramble(2000, 25, sourceElement, targetElement);
    })
});


function unscramble(unscrambleSpeed, randomizerSpeed, sourceElement, targetElement) {
    if(targetElement.classList.contains("unscrambling")) {
        return;
    }else{
        targetElement.classList.add("unscrambling");
    
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
        var charactersLength = characters.length;

        var textsrc = sourceElement
        var text = sourceElement.innerText;

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
                        targetElement.innerText = resolvedText + unresolved;
                    }, randomizerSpeed)
                    print();
                    setTimeout(function() {
                        clearInterval(innerInterval);
                    }, charResolveSpeed);
                }else {
                    targetElement.classList.remove("unscrambling");
                }
                unresolvedCharCount--;
            }, charResolveSpeed);
        }
        print();
    }
}
