mersenneE = [2, 3, 5, 7, 13, 17, 19, 31, 61, 89, 107, 127, 521, 607, 1279, 2203, 2281, 3217, 4253, 4423, 9689, 9941, 11213, 19937, 21701, 23209, 44497, 86243, 110503, 132049, 216091, 756839, 859433, 1257787, 1398269, 2976221, 3021377, 6972593, 13466917, 20996011, 24036583, 25964951, 30402457, 32582657, 37156667, 42643801, 43112609];
mersenneN = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647, 4294967295];
mersenneP = [3, 7, 31, 127, 8191, 131071, 524287, 2147483647, 2305843009213693951, 618970019642690137449562111, 162259276829213363391578010288127, 170141183460469231731687303715884105727];
primeN = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271];

var reg = "reg";
var mer = "mer";
var primesCalculated = false;
var primes = [];

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    showAlert("#headerAlert", 
    "For best experience, please use chromium browser. These include: Chrome, Firefox, Brave, Edge, etc.",
    true, "info", null, "75", null);

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


    $("#maxPrime").change(function(){
        var exp = $("#maxPrime").val()
        $(".maxPrimeExp").html(exp);
        var result = 2**exp;
        $("#primeUpperBound").html(result)
        var num = (result*8)/1000000000
        $("#primesSize").html((Math.round(num * 100) / 100).toFixed(2));
        $("#estimatedPrimeCount").html(parseInt(result/Math.log(result)))
    })

    $(".calcPrimeRange").click(function(){
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

            //render output
            primesCalculated = true;
            $("#primeCount").html(primes.length);
            $("#primeN").attr("max", primes.length);
            $("#loading").modal("hide");
            showAlert("body", (primes.length + " primes found"), false, "success", "top","50", 3000);
        }, 500);
    });

    function showAlert(parent, text, keepAlive, alertType, fixedPos, width, millis){
        var id = Math.floor((Math.random() * 1000) + 1);
        html = '<div id="alert-'+id+'" class="alert alert-'+alertType+' alert-dismissible '+(fixedPos!=null?('fixed-'+fixedPos):'')+' text-center w-'+(width!=null?(width):'50')+' mx-auto mt-5">'+
                    '<button type="button" class="close" data-dismiss="alert">×</button>' +
                    text +
                '</div>';
        $(parent).append(html);
        if(!keepAlive){
            setTimeout(function(){
                $('#alert-'+id).fadeOut(500);
                $('#alert-'+id).alert("dispose");
            }, millis)
        }
    }

    $("#mersenneCalc").submit(function(event){
        var n = BigInt($("#mersenneN").val());
        var calcLLPrime = $("#checkLL").prop("checked");

        if(isPrime(n)){
            var val = calcMersenne(n)
            if(calcLLPrime){
                if(lucasLehmerPrime(BigInt(n))){
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
        if(n == 2n){
            return true;
        }else{
            for(i = 2n; i <= n/2n; i++){
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
        if (p == 2n) {
            return true;
        } else {
            var mersenneVal = (1n << p) - 1n;
            var nextVal = 4n;
            for (var i = 2n; i < p; i++) {
                nextVal = (nextVal*nextVal-2n) % mersenneVal;
            }
            return nextVal === 0n;
        }
    }

    var regPrimeSelected = true;
    $("#primeType").change(function(){
        $("#primeType > option:selected").each(function(){
            if($(this).val() == mer){
                regPrimeSelected = false;
                $(".prime-index").html("e");
                $(".prime-set").html("M");
                $("#primeN").attr("max", mersenneE.length);
            }else if($(this).val() == reg){
                regPrimeSelected = true;
                $(".prime-index").html("n");
                $(".prime-set").html("P");
                $("#primeN").attr("max", primesCalculated? primes.length:primeN.length);
            }
            $("#primeNOut").html(getPrime());
        });
    });

    $("#primeNCalc").submit(function(event){
        $("#primeNOut").html(getPrime());
        event.preventDefault();
    });

    function getPrime(){
        var inputVal = parseInt($("#primeN").val());
        return regPrimeSelected? getRegPrimeAt(inputVal):getMerExpAt(inputVal)
    }

    function getMerExpAt(n){
        if(n <= mersenneE.length){
            return mersenneE[n-1];
        }
    }

    function getRegPrimeAt(n){
        if(n <= primeN.length){
            return primeN[n-1];
        }else{
            return primes[n-1];
        }
    }


    $("#binaryMersenneCalc").submit(function(event){
        $("#binMersenneN").change();
        event.preventDefault();
    });

    var curDigitCount = 3n;
    var binDecimalVal = 7n;
    $("#binMersenneN").change(function(){
        var newDigitCount = BigInt($(this).val());
        var diff = newDigitCount - curDigitCount;
        if(diff > 0)
            for(var i = curDigitCount; i < newDigitCount; i++)
                binDecimalVal += 2n**i;
        else
            for(var i = newDigitCount; i < curDigitCount; i++)
                binDecimalVal -= 2n**i;

        var conversionTerms = "";
        if(newDigitCount <= 50){
            for(var i = newDigitCount-1n; i > 0; i--)
                conversionTerms += "(2<sup>"+i+"</sup>)+";
        }else{
            conversionTerms = "(2<sup>"+(newDigitCount-1n).toString()+"</sup>)"
            + "+(2<sup>"+(newDigitCount-2n).toString()+"</sup>)"
            + "+(2<sup>"+(newDigitCount-3n).toString()+"</sup>)"
            + "+ . . . +(2<sup>1</sup>)+"
        }
        //check for prime number of digits before large calculation
        var displayMersenne = isPrime(newDigitCount) && lucasLehmerPrime(newDigitCount);
        //render outputs
        $("#binaryMersenne").html(displayMersenne?"(A mersenne prime!)":"")
        $("#conversionTerms").html(conversionTerms);
        $("#decimalVal").html(binDecimalVal);
        $(".binaryValue").html(newDigitCount>100n?"(\"1\" x "+newDigitCount+")":"1".repeat(Number(newDigitCount)));
        curDigitCount = newDigitCount;
    });


});