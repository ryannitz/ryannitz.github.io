function unscramble(unscrambleSpeed, randomizerSpeed, sourceElement, targetElement) {
    if(targetElement.classList.contains("unscrambling")) {
        return;
    }else{
        targetElement.classList.add("unscrambling");
    
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
        var charactersLength = characters.length;

        var textsrc = sourceElement
        var text = sourceElement.textContent;

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
                        targetElement.textContent = resolvedText + unresolved;
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
