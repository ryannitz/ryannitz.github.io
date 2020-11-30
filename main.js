mersenneE = {};
mersenneN = {};
mersenneP = {};
primeN = {};


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $("#mersenneCalc").submit(function(event){
        var n = $("#mersenneN").val();
        var calcLLPrime = $("#checkLL").prop("checked");

        if(isPrime(n)){
            var mersenneN = calcMersenne(n)
            if(calcLLPrime){
                if(lucasLehmerPrime(n)){
                    $("#mersenneOut").html(mersenneN);
                    $("#mersenneIn").html(n);
                    $("#mersennePrimeOut").html(" (a Mersenne prime!)");
                }else{
                    $("#mersennePrimeOut").html(" (not a Mersenne prime.)");
                }
            }else{
                $("#mersennePrimeOut").html("");
            }
        }else{
            alert(n + " is not prime");
        }
        event.preventDefault();
    });

    function isPrime(n){
        flag = true;
        if(n == 2){
            return true;
        }else{
            for(i = 2; i <= n/2; i++){
                if (n % i == 0) { 
                    flag = false; 
                    break; 
                } 
            }
        }
        return flag;        
    }

    //calculate the mersenne number
    function calcMersenne(n){
        return (2**n)-1
    }

    //calculate if mersenne number is prime
    function lucasLehmerPrime(p){
        var mersenneVal = (2**p)-1;
        var nextVal = 4 % mersenneVal;
        for(var i = 1; i < p-1; i++){
            nextVal = (nextVal*nextVal-2) % mersenneVal;
            console.log(nextVal)
        }
        return nextVal==0;
    }
});