mersenneE = [2, 3, 5, 7, 13, 17, 19, 31, 61, 89, 107, 127, 521, 607, 1279, 2203, 2281, 3217, 4253, 4423, 9689, 9941, 11213, 19937, 21701, 23209, 44497, 86243, 110503, 132049, 216091, 756839, 859433, 1257787, 1398269, 2976221, 3021377, 6972593, 13466917, 20996011, 24036583, 25964951, 30402457, 32582657, 37156667, 42643801, 43112609];
mersenneN = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647, 4294967295];
mersenneP = [3, 7, 31, 127, 8191, 131071, 524287, 2147483647, 2305843009213693951, 618970019642690137449562111, 162259276829213363391578010288127, 170141183460469231731687303715884105727];
primeN = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271];

var reg = "reg";
var mer = "mer";

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    //load primes modal

    $("#maxPrime").change(function(){
        var exp = $("#maxPrime").val()
        $("#maxPrimeExp").html(exp);
        var num = ((2**exp)*8)/1000000000
        $("#primesSize").html((Math.round(num * 100) / 100).toFixed(2));
    })
    var primes = [];
    $("#calcPrimeRange").click(function(){
        var max = Math.pow(2, parseInt($("#maxPrime").val()));
        $("#loading").modal("show");
        setTimeout(function(){
            array = new Array(max);
            for(var i = 0; i < array.length; i++){
               array[i] = true;
            }
            for(var p = 2; p*p < max; p++){
                if(array[p] == true){
                    for(var i = p*p; i < max; i+=p){
                        array[i] = false;
                    }
                }
            }
            for(var p = 2; p < max; p++){
                if(array[p] == true){
                    primes.push(p);
                }
            }
            console.log(primes[primes.length-1])
            $("#loading").modal("hide");
        }, 500);
    });

    console.log(primeN.length);
    for(var i = 0; i < mersenneE.length; i++)
        $("#mersenneExponents").append(mersenneE[i]+", ");
    $("#mersenneExponents").append("...");
    for(var i = 0; i < mersenneN.length; i++)
        $("#mersenneNumbers").append(mersenneN[i]+", ");
    $("#mersenneNumbers").append("...");
    for(var i = 0; i < mersenneP.length; i++)
        $("#mersennePrimes").append(mersenneP[i]+", ");
    $("#mersennePrimes").append("...");
    for(var i = 0; i < primeN.length; i++)
        $("#primeNumbers").append(primeN[i]+", ");
    $("#primeNumbers").append("...");

    $("#mersenneCalc").submit(function(event){
        var n = $("#mersenneN").val();
        var calcLLPrime = $("#checkLL").prop("checked");

        if(isPrime(n)){
            var val = calcMersenne(n)
            if(calcLLPrime){
                if(lucasLehmerPrime(n)){
                    $("#mersennePrimeOut").html(" (a Mersenne prime!)");
                }else{
                    $("#mersennePrimeOut").html(" (not a Mersenne prime.)");
                }
            }else{
                $("#mersennePrimeOut").html("");
            }
            $("#mersenneIn").html(n);
            $("#mersenneOut").html(val);
        }else{
            alert(n + " is not a prime number.");
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
        return (2**n)-1;
    }

    //calculate if mersenne number is prime
    function lucasLehmerPrime(p){
        var mersenneVal = (2**p)-1;
        var nextVal = 4 % mersenneVal;
        for(var i = 1; i < p-1; i++){
            nextVal = (nextVal*nextVal-2) % mersenneVal;
        }
        return nextVal==0;
    }

    var regPrimeSelected = true;
    $("#primeType").change(function(){
        $("#primeType > option:selected").each(function(){
            if($(this).val() == mer){
                regPrimeSelected = false;
                $(".prime-index").html("e");
                $(".prime-set").html("M");
                
            }else if($(this).val() == reg){
                regPrimeSelected = false;
                $(".prime-index").html("n");
                $(".prime-set").html("P");
            }
        });
    });

    $("#primeNCalc").submit(function(event){
        var inputVal = parseInt($("#primeN").val());
        $("#primeNOut").html(regPrimeSelected? getPrimeAt(inputVal):getMerExpAt(inputVal));

        event.preventDefault();
    });

    function getMerExpAt(n){
        if(n <= mersenneE.length){
            return mersenneE[n-1];
        }else{
            
        }
    }

    function getPrimeAt(n){
        if(n <= primeN.length){
            return primeN[n-1];
        }else{
            return primes[n];
        }
    }

});