

/**
 * Wanna see spaghet code? Scroll down.
 * TODO:
 *      Extract known scaling values
 *      Extract methods throughout
 *      Extract classes/components
 *      Optimize redraws (to/from indicator doesn't need a redraw every update)
 *      Add MIN DME perhaps??
 *      Make top UI row more compact.
 *      Rebind enter to submit new PTPs. Mouse clicking is lame.
 *      Research nicer solution for CDI/HEADING sliders. A nice knob mayhaps
 */

var headingKnob
var courseKnob

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var centerX = canvas.width/2;
var centerY = canvas.width/2;
var radius = canvas.width/2;

var diameter = canvas.width;

var app = new Vue({
    el: "#app",


    data : {

        //EHSI
        canvasHeightPercentage: 55,
        
        scalesShown: false,
        cdiShown: true,
        pointsShown: false,
        ptpLineShown: false,
        roughHeadingShown: false,

        dmeMax: 50,
        dmeStep: 5,
        radialStep: 10,

        headingInput: 0,
        courseInput: 0,


        //PTP
        heading: 0,
        distance: 0,
        orig: {
            radial:360,
            dme:10,
            getRadian(){
                return this.radial*Math.PI/180
            },
            coords: [],
        },
        dest: {
            radial:180,
            dme:10,
            getRadian(){
                return this.radial*Math.PI/180
            },
            coords: [],
        }

    },


    methods: {

        initCanvasLayers(){
            this.resizeCanvasLayers();
        },

        resizeCanvasLayers(){
            var windowHeight = window.innerHeight-$("#navbar").height()-20;
            var diameter = windowHeight * this.canvasHeightPercentage/100;

            var ehsiContainerWidth = $("#ehsi").width();
            if(diameter > ehsiContainerWidth-20){
                diameter = ehsiContainerWidth-20
            }

            var canvas = document.getElementById('canvas')
            canvas.height = diameter
            canvas.width = diameter

            var scaleCanvas = document.getElementById('scaleCanvas')
            scaleCanvas.height = diameter
            scaleCanvas.width = diameter
            scaleCanvas.style.marginLeft = (-diameter + "px")

            var cdiCanvas = document.getElementById('cdiCanvas')
            cdiCanvas.height = diameter
            cdiCanvas.width = diameter
            cdiCanvas.style.marginLeft = (-diameter + "px")

            centerX = canvas.width/2;
            centerY = canvas.width/2;
            radius = canvas.width/2;

            this.drawEHSI()
            this.drawBearingPointer(this.orig.radial)
            this.drawCDI(this.orig.radial)
        },

        getCanvasContext(){
            const canvas = document.getElementById('canvas');
            return canvas.getContext('2d');
        },

        generateRandomRadial(){
            return Math.floor(Math.random() * (360/this.radialStep)+1)*this.radialStep;
        },

        generateRandomDME(){
            return Math.floor(Math.random() * (this.dmeMax/this.dmeStep)+1)*this.dmeStep;
        },

        initPoints(){
            //this.orig.radial = $("#customOriginRadial").val()
            //this.orig.dme = $("#customOriginDME").val()
            this.dest.radial = $("#customDestinationRadial").val()
            this.dest.dme = $("#customDestinationDME").val()
        },

        generatePoints(){
            this.orig.radial = this.generateRandomRadial()
            this.orig.dme = this.generateRandomDME()
            this.dest.radial = this.generateRandomRadial()
            this.dest.dme = this.generateRandomDME();
        },

        getDistance(p1, p2){
            var rawDistance = Math.sqrt((p1.dme**2)+(p2.dme**2)-(2*p1.dme*p2.dme)*Math.cos((p2.radial-p1.radial)*Math.PI/180))
            return Math.round(rawDistance);
        },

        getAngle(p1, p2){
            var angle = Math.atan2((p1.dme*Math.sin(p1.getRadian())-(p2.dme*Math.sin(p2.getRadian()))),(p1.dme*Math.cos(p1.getRadian())-(p2.dme*Math.cos(p2.getRadian())))) * 180 / Math.PI
            return Math.round(angle + 180)
        },

        createCustomPtP(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.clearRect(0-10, 0-10, canvas.width+20, canvas.height+20);

            //$(".answer").hide();
            this.initPoints();

            $("#origPoint").text(`${this.orig.radial}/${this.orig.dme}`);
            $("#destPoint").text(`${this.dest.radial}/${this.dest.dme}`);

            this.heading = this.getAngle(this.orig, this.dest)
            this.distance = this.getDistance(this.orig, this.dest)

            this.drawEHSI()
            this.drawBearingPointer(this.orig.radial)
            this.drawCDI(this.orig.radial)
            this.drawPoints();
            this.drawPtPLine();
            this.drawRoughHeading()
        },

        generatePtP(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.clearRect(0-10, 0-10, canvas.width+20, canvas.height+20);

            //$(".answer").hide();
            this.generatePoints();

            $("#origPoint").text(`${this.orig.radial}/${this.orig.dme}`);
            $("#destPoint").text(`${this.dest.radial}/${this.dest.dme}`);
            this.heading = this.getAngle(this.orig, this.dest)
            this.distance = this.getDistance(this.orig, this.dest)
        

            this.drawEHSI()
            this.drawBearingPointer(this.orig.radial)
            this.drawCDI(this.orig.radial)
            this.drawPoints();
            this.drawPtPLine();
            this.drawRoughHeading()
        },

        showAnswer(event){//make a toggle
            if($(event.target).html() == "Show"){
                $(event.target).siblings().find("span").show();
                $(event.target).html('Hide')
            }else{
                $(event.target).siblings().find("span").hide();
                $(event.target).html('Show')
            }
            
        },

        getPtPscale(){
            return Math.max(this.orig.dme, this.dest.dme);
        },

        drawPoints(){
            var scale = this.getPtPscale();
            if(this.orig.dme == scale){
                this.orig.coords = this.drawPoint(this.orig.radial, 1, "A");
                this.dest.coords = this.drawPoint(this.dest.radial, this.dest.dme/this.orig.dme, "B");
            }else{
                this.orig.coords = this.drawPoint(this.orig.radial, this.orig.dme/this.dest.dme, "A");
                this.dest.coords = this.drawPoint(this.dest.radial, 1, "B");
            }
        },

        drawPoint(radial,ratio,label){
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            var pointWidth = radius*0.025;
            var x = centerX + radius*Math.cos((radial-90)*Math.PI/180)*ratio;
            var y = centerY + radius*Math.sin((radial-90)*Math.PI/180)*ratio;
        
            if(this.pointsShown){
                ctx.beginPath();
                ctx.arc(x, y, pointWidth, 0, 2*Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
        
                ctx.font = radius*0.05 + "px arial";
                ctx.fillText(label,x+radius*0.1,y);
            }
            
            return [x,y];
        },

        drawPtPLine(){
            if(!this.ptpLineShown){
                return;
            }
            this.drawPoints();
            const ctx = this.getCanvasContext();
            ctx.resetTransform();

            ctx.beginPath();
            ctx.strokeStyle = "blue"
            ctx.lineWidth = radius*2/100;
            ctx.lineCap = "round";
            ctx.moveTo(this.orig.coords[0],this.orig.coords[1]);
            ctx.lineTo(this.dest.coords[0],this.dest.coords[1]);
            ctx.stroke();
        },

        drawRoughHeading(){
            if(!this.roughHeadingShown){
                return;
            }
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.translate(radius, radius);

            var radianForDraw = this.getAngle(this.orig, this.dest)*Math.PI/180;
            this.drawline(ctx, radianForDraw, radius,0, radius, radius/100, "magenta")
            //this.rotateCanvas(this.getAngle(this.orig, this.dest))
        },

        rotateCanvas(newAngle){
            var transformValues = ctx.getTransform();
            var radians = Math.atan2(transformValues.b, transformValues.a);

            var currentAngle = radians*180/Math.PI

            if(currentAngle == newAngle) return;

            var direction =  (currentAngle - newAngle) % 360;
            if(direction <= 0){
                newAngle = -newAngle
            }

            $("#canvas").css({
                //'transition': "transform 1s",
                'transform' : 'rotate('+ newAngle +'deg)'
            });

            this.drawCDI()
        },

        drawEHSI(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform()
            ctx.translate(radius, radius);

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2*Math.PI, false);
            ctx.fillStyle = 'black';
            ctx.fill();

            this.drawEHSInumbers()
            this.drawEHSIincrements()
            this.drawEHSIcenter()
            this.drawScales()

            $("#ehsiControls").show()
        },

        drawEHSIcenter(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform()
            ctx.translate(radius, radius);
            //draw the center
            ctx.resetTransform();
            ctx.fillStyle = "white";
            ctx.fillRect(centerX-15,centerY-2, 30,4);
            ctx.fillRect(centerX-2,centerY-15, 4,30);
        },

        drawEHSIincrements(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform()
            ctx.translate(radius, radius);

            //draw the 5 increments
            for(let num = 1; num < 37; num++){
                let angle = (num+.5)*Math.PI/18;
                this.drawline(ctx, angle, radius,0, radius*1/12, 2, "white")
            }
            
            //draw the 10 increments
            for(let num = 1; num < 37; num++){
                let angle = num*Math.PI/18;
                this.drawline(ctx, angle, radius,0, radius*1/6, 2, "white")
            }
        },

        drawEHSInumbers(){
            const ctx = this.getCanvasContext();
            //draw numbers
            ctx.resetTransform()
            ctx.translate(radius, radius);

            ctx.font = radius*1/6 + "px arial";
            ctx.fillStyle = "white";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for(let num = 1; num < 13; num++){
              var angle = num * Math.PI/6;
              ctx.rotate(angle);
              ctx.translate(0, -radius*8.5/12);
              ctx.rotate(-angle);

              var hdgVal = num*3
              switch(hdgVal){
                case 9:
                    hdgVal = 'E'
                    break;
                case 18:
                    hdgVal = 'S'
                    break;
                case 27:
                    hdgVal = 'W'
                    break;
                case 36:
                    hdgVal = 'N'
                    break;
              }

              ctx.save()
              ctx.rotate(angle);
              ctx.fillText((hdgVal).toString(), 0, 0);
              ctx.restore()

              ctx.rotate(angle);
              ctx.translate(0, radius*8.5/12);
              ctx.rotate(-angle);
            }
        },

        toggleScales(){
            if(!this.scalesShown){
                $("#scaleCanvas").show()
                this.scalesShown = true
            }else{
                $("#scaleCanvas").hide()
                this.scalesShown = false
            }
        },

        drawScales(){
            this.drawQuarterScale()
            this.drawThirdScale()
        },

        drawQuarterScale(){
            const canvas = document.getElementById('scaleCanvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();

            ctx.lineWidth = radius*1/100;
            for(var i = 1; i <= 4; i++){
                ctx.beginPath();
                ctx.strokeStyle = "red"
                ctx.arc(centerX, centerY, radius*i/4, 0, 2*Math.PI, false);
                ctx.stroke();
            }
        },

        drawThirdScale(){
            const canvas = document.getElementById('scaleCanvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();

            ctx.lineWidth = radius*1/100;
            ctx.beginPath();
            ctx.strokeStyle = "blue"
            ctx.arc(centerX, centerY, radius*2/3, 0, 2*Math.PI, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "blue"
            ctx.arc(centerX, centerY, radius*1/3, 0, 2*Math.PI, false);
            ctx.stroke();
        },

        drawBearingPointer(radial){
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.translate(radius, radius);
            ctx.rotate(0);
            this.rotateCanvas(0)

            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 0;

            var radialRadian = (radial)*Math.PI/180;
            //tail
            this.drawline(ctx, radialRadian, radius,0, radius*1/3, radius*2/100, "white")
            //triangle
            var tipOfLine = radius*2/3
            var leftBase = -radius*5/100
            var rightBase = radius*5/100
            var triangleHeight = (radius*2/3 - radius*2/4)
            ctx.rotate(radialRadian-Math.PI/2);
            ctx.beginPath();
            ctx.lineWidth = radius*2/100;
            ctx.lineCap = "round";
            ctx.moveTo(tipOfLine,leftBase);//leftbase
            ctx.lineTo(tipOfLine,rightBase);//rightbase
            ctx.lineTo(tipOfLine-triangleHeight,0);
            ctx.lineTo(tipOfLine,leftBase);//leftbase
            ctx.stroke();
            ctx.rotate(-(radialRadian-Math.PI/2));


            //head
            radialRadian = (radial-180)*Math.PI/180;
            this.drawline(ctx, radialRadian, radius, radius*2/4, radius*1/4, radius*2/100, "white")
            //triangle
            var tipOfTriangle = radius //edge of ehsi
            var leftBase = -radius*6/100
            var rightBase = radius*6/100
            var triangleHeight = (radius*1/4)
            ctx.rotate(radialRadian-Math.PI/2);
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.lineWidth = radius*2/100;
            ctx.lineCap = "round";
            ctx.moveTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
            ctx.lineTo(tipOfTriangle-triangleHeight,rightBase);//rightbase
            ctx.lineTo(tipOfTriangle,0); //tip of triangle
            ctx.lineTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
            ctx.closePath();
            ctx.fill();
            ctx.rotate(-(radialRadian-Math.PI/2));
        },

        //draws a line from the outside edge of the circle inwards.
        //startpoint is the distance from the edge to start the line
        drawline(ctx, angle, radius, startpoint, length, width, color) {
            ctx.resetTransform();
            ctx.translate(radius, radius);
            ctx.beginPath();
            ctx.strokeStyle = color
            ctx.lineWidth = width;
            ctx.lineCap = "round";

            ctx.rotate(angle);
            ctx.moveTo(0,-radius+startpoint);
            ctx.lineTo(0, -radius+length);
            ctx.stroke();
            ctx.rotate(-angle);
        },

        drawCDI(){
            const canvas = document.getElementById('cdiCanvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();
            ctx.clearRect(0-10, 0-10, canvas.width+20, canvas.height+20);
            ctx.translate(radius, radius);
            ctx.rotate(0);
            this.rotateCanvas(0)

            //get cdi canvas offset to ehsi canvas offset
            var cdiDrawOffset = 360 - this.headingInput;

            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetY = 0;
            ctx.shadowOffsetX = 0;


            //tail
            var radialRadian = (parseInt(this.courseInput)-180+parseInt(cdiDrawOffset))*Math.PI/180;
            this.drawline(ctx, radialRadian, radius, radius*1/4, radius-(radius*1/3), radius*2/100, "lime")
            //head
            radialRadian = (parseInt(this.courseInput)+parseInt(cdiDrawOffset))*Math.PI/180;
            this.drawline(ctx, radialRadian, radius, radius*1/3, radius-(radius*1/3), radius*2/100, "lime")
            //head triangle
            var tipOfTriangle = radius-(radius*4/18) //edge of ehsi
            var leftBase = -radius*5/100
            var rightBase = radius*5/100
            var triangleHeight = (radius*1/4)*3/4
            ctx.rotate(radialRadian-Math.PI/2);
            ctx.beginPath();
            ctx.fillStyle = 'lime';
            ctx.lineWidth = radius*2/100;
            ctx.lineCap = "square";
            ctx.moveTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
            ctx.lineTo(tipOfTriangle-triangleHeight,rightBase);//rightbase
            ctx.lineTo(tipOfTriangle,0); //tip of triangle
            ctx.lineTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
            ctx.closePath();
            ctx.fill();



            //scale circles
            var circleRadius = radius*1/12/2.5;
            ctx.lineWidth = radius*1/100;
            ctx.strokeStyle = "white"

            ctx.beginPath();
            ctx.arc(0, radius*1/3-(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(0, radius*2/4+(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()

            ctx.beginPath();
            ctx.arc(0, -radius*1/3+(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(0, -radius*2/4-(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()

            //deflection bar
            var deflectionUnit = (-radius*2/4-(radius*1/12))/10; //full deflection is 10radials
            var course = parseInt(this.courseInput)%360;
            var radial = parseInt(this.orig.radial)

            currentRadialDeflection = 0

            var angleDiff = this.getAngleDiff(course, this.getWrappedRadial(radial, 0))
            if(Math.abs(angleDiff) >= 90){
                //console.log("to")
                var toDiff = this.getAngleDiff(course, this.getWrappedRadial(radial, 180))
                currentRadialDeflection = toDiff
                if(toDiff < -10){
                    currentRadialDeflection = -10
                }
                if(toDiff > 10){
                    currentRadialDeflection = 10
                }
                var tipOfTriangle = radius*1/4
                var leftBase = -radius*7/100
                var rightBase = radius*7/100
                var triangleHeight = (radius*1/9)
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.lineWidth = radius*2/100;
                ctx.lineCap = "round";
                ctx.moveTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
                ctx.lineTo(tipOfTriangle-triangleHeight,rightBase);//rightbase
                ctx.lineTo(tipOfTriangle,0); //tip of triangle
                ctx.lineTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
                ctx.closePath();
                ctx.fill();
            }else{
                //console.log("from")
                var fromDiff = this.getAngleDiff(course, this.getWrappedRadial(radial, 0))
                currentRadialDeflection = -fromDiff
                if(fromDiff < -10){
                    currentRadialDeflection = 10
                }
                if(fromDiff > 10){
                    currentRadialDeflection = -10
                }
                var tipOfTriangle = -radius*1/4
                var leftBase = -radius*7/100
                var rightBase = radius*7/100
                var triangleHeight = -(radius*1/9)
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.lineWidth = radius*2/100;
                ctx.lineCap = "round";
                ctx.moveTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
                ctx.lineTo(tipOfTriangle-triangleHeight,rightBase);//rightbase
                ctx.lineTo(tipOfTriangle,0); //tip of triangle
                ctx.lineTo(tipOfTriangle-triangleHeight,leftBase);//leftbase
                ctx.closePath();
                ctx.fill();
            }

            ctx.resetTransform();
            ctx.translate(radius, radius);
            ctx.strokeStyle = "lime"
            ctx.lineCap = "butt";//lol
            ctx.lineWidth = radius*2/100;
            ctx.beginPath();
           
            ctx.rotate(radialRadian);
            ctx.moveTo(deflectionUnit*currentRadialDeflection,-radius+radius*2/3 + radius*1/50);
            ctx.lineTo(deflectionUnit*currentRadialDeflection, radius*1/3 - radius*1/50);
            ctx.stroke();
            ctx.rotate(-radialRadian);
            

            ctx.rotate(-(radialRadian-Math.PI/2));
        },

        getWrappedRadial(radial, addition){
            var newRadial = radial + addition
            if(newRadial > 360){
                newRadial -= 360
            }
            if(newRadial < -360){
                newRadial += 360
            }
            if(newRadial == 0){
                newRadial = 360
            }

            return newRadial;
        },

        getAngleDiff(a, b){
            var diff = a - b
            diff += (diff>180)? -360 : (diff<-180)? 360 : 0
            return diff;
        },

        rotateCDI(){
            this.drawCDI()
        },

        toggleCDI(){
            if(!this.cdiShown){
                $("#cdiCanvas").show()
                this.cdiShown = true
            }else{
                $("#cdiCanvas").hide()
                this.cdiShown = false
            }
        }
    },

    mounted() {
        this.initCanvasLayers();
        this.drawScales()
        this.createCustomPtP()
        this.heading = this.getAngle(this.orig, this.dest)
        this.distance = this.getDistance(this.orig, this.dest)
    },

    created() {
        window.addEventListener('resize', function(e){
            var ehsiContainerWidth = $("#ehsi").width();
            if(diameter > ehsiContainerWidth-20){
                app.resizeCanvasLayers();
            }
        });

        window.addEventListener('keydown', function(e) { 

        })
    },

    computed: {

    }

});


$(document).on("scroll", function(){
    var scrollY = window.scrollY
    var triggerY = $("#generatePtP").position().top + $("#generatePtP").height()
    if(scrollY > triggerY){
        $("#navbar").slideDown();
    }else{
        $("#navbar").slideUp();
    }
})

$(document).ready(function(){


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

    $("input").focus(function (e) { 
        (this).select()
    });


    // $("#courseKnob").on("change", function(){
    //     var newCourseVal = $("#courseKnob").val()
    //     var curCourseInputVal = $("#courseInput").val()

    //     $("#courseInput").val(newCourseVal)
    //     app.courseInput = newCourseVal;
    //     app.rotateCDI()
    // })

    // $("#courseInput").on("change", function(){
    //     console.log("tryingto update the thing..." + $(this).val())
    //     courseKnob.val($(this).val())
    //     $("#courseKnob").val($(this).val())
    // })

    // $("#headingKnob").on("change", function(){
    //     var newHeadingVal = $("#headingKnob").val()
    //     var curHeadingInputVal = $("#headingInput").val()

    //     $("#headingInput").val(newHeadingVal)
    //     app.headingInput = newHeadingVal;
    //     app.rotateCanvas(newHeadingVal)
    // })

    // $("#headingInput").on("change", function(){
    //     $("#headingKnob").val($(this).val())
    //     headingKnob.val($(this).val())
    // })

});
