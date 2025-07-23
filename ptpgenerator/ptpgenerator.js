

/**
 * Wanna see spaghet code? Scroll down.
 * TODO:
 *      Extract known scaling values
 *      Extract methods throughout
 *      Extract classes/components
 *      Optimize redraws (to/from indicator doesn't need a redraw every update)
 *      Refactor to actual good coding standards
 */

var headingKnob
var courseKnob
var radialKnob

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var centerX = canvas.width/2;
var centerY = canvas.width/2;
var radius = canvas.width/2;

var diameter = canvas.width;

var simulationLoop

var app = new Vue({
    el: "#app",


    data : {

        screenSizeWarningAccepted: false,

        //EHSI
        canvasHeightPercentage: 75,
        
        scalesShown: false,
        cdiShown: true,
        bearingPointerShown:true,
        windShown:false,

        pointsShown: false,
        ptpLineShown: false,
        roughHeadingShown: false,

        dmeMin: 20,
        dmeMax: 40,
        dmeStep: 5,
        radialStep: 10,
        radialStart: 0,
        radialEnd: 360,
        airspeed: 240,
        windBearing: 290,
        windspeed: 10,
        maxDrift: 0,

        headingInput: 0,
        courseInput: 180,
        

        //Simulation
        simulationRunning: false,


        //PTP
        heading: 0,
        distance: 0,
        orig: {
            radial:360,
            dme:20,
            getRadian(){
                return this.radial*Math.PI/180
            },
            coords: [],
        },
        dest: {
            radial:360,
            dme:30,
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

            this.draw();
        },

        getCanvasContext(){
            const canvas = document.getElementById('canvas');
            return canvas.getContext('2d');
        },

        setPtpGenerationValues(
            dmeMinIn = this.dmeMin,
            dmeMaxIn = this.dmeMax,
            dmeStepIn = this.dmeStep,
            radialStartIn = this.radialStart, 
            radialEndIn = this.radialEnd,
            radialStepIn = this.radialStep
        ){
            this.dmeMin = dmeMinIn;
            this.dmeMax = dmeMaxIn;
            this.dmeStep = dmeStepIn;
            this.radialStart = radialStartIn;
            this.radialEnd = radialEndIn;
            this.radialStep = radialStepIn;
        },

        generateRandomRadial(){
            var diff, generatedRadial;
            var radialStart = parseInt(this.radialStart)
            var radialEnd = parseInt(this.radialEnd)
            
            if(radialStart > radialEnd){
                diff = 360 - radialStart + radialEnd
                generatedRadial = (Math.round(Math.random() * (diff/this.radialStep))*this.radialStep + radialStart)%360;
            }else{
                diff = radialEnd - radialStart;
                generatedRadial = (Math.round(Math.random() * (diff/this.radialStep))*this.radialStep + radialStart)
            }
            return generatedRadial;
        },

        generateRandomDME(){
            return Math.round(Math.random()*((this.dmeMax-this.dmeMin)/this.dmeStep))*this.dmeStep + this.dmeMin
        },

        initPoints(){
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

            this.initPoints();

            this.heading = this.getAngle(this.orig, this.dest)
            this.distance = this.getDistance(this.orig, this.dest)

            this.draw();
        },

        generatePtP(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.clearRect(0-10, 0-10, canvas.width+20, canvas.height+20);

            this.generatePoints();

            this.heading = this.getAngle(this.orig, this.dest)
            this.distance = this.getDistance(this.orig, this.dest)
        
            this.draw();
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

        draw(){
            this.drawEHSI()
            this.drawBearingPointer(this.orig.radial)
            this.drawCDI(this.orig.radial)
            this.drawPoints();
            this.drawPtPLine();
            this.drawRoughHeading()
            this.drawWind();
        },

        getPtPscale(){
            return Math.max(this.orig.dme, this.dest.dme);
        },

        drawPoints(){
            var scale = this.getPtPscale();
            if(this.orig.dme == scale){
                this.orig.coords = this.drawPoint(this.orig.radial, 1, "");
                this.dest.coords = this.drawPoint(this.dest.radial, this.dest.dme/this.orig.dme, "");
            }else{
                this.orig.coords = this.drawPoint(this.orig.radial, this.orig.dme/this.dest.dme, "");
                this.dest.coords = this.drawPoint(this.dest.radial, 1, "");
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
            ctx.strokeStyle = "magenta"
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
            this.drawline(ctx, radianForDraw, radius,0, radius, radius/100, "yellow")
        },

        rotateCanvas(newAngle){
            $("#canvas").css({
                'transform' : 'rotate('+ -newAngle +'deg)'
            });
            this.draw()
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
        
        },

        drawEHSIcenter(){
            var offset = (this.headingInput)*Math.PI/180
            const ctx = this.getCanvasContext();
            ctx.fillStyle = "yellow";
            ctx.resetTransform()
            ctx.translate(radius, radius);
            ctx.rotate(offset)
            //need to scale these based on ratio
                          // x, y, w, h
            ctx.fillRect(-20, -4, 40,8); // Wing
            ctx.fillRect(-12, 16, 24,4); // Stab
            ctx.fillRect(-3, -30, 6,60); // Body
            ctx.resetTransform();
            
            
        },

        drawEHSIincrements(){
            const ctx = this.getCanvasContext();
            ctx.resetTransform()
            ctx.translate(radius, radius);

            //draw the 5 increments
            for(let num = 1; num < 37; num++){
                let angle = (num+.5)*Math.PI/18;
                this.drawline(ctx, angle, radius,0, radius*1/14, 2, "white")
            }
            
            //draw the 10 increments
            for(let num = 1; num < 37; num++){
                let angle = num*Math.PI/18;
                this.drawline(ctx, angle, radius,0, radius*1/7, 2, "white")
            }
        },

        drawEHSInumbers(){
            const ctx = this.getCanvasContext();
            //draw numbers
            ctx.resetTransform()
            ctx.translate(radius, radius);

            ctx.font = radius*1/6.5 + "px arial";// font selection issue
            ctx.fillStyle = "white";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for(let num = 1; num < 13; num++){
              var angle = num * Math.PI/6;
              ctx.rotate(angle);
              ctx.translate(0, -radius*8.75/12); //font selection issue
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
              ctx.translate(0, radius*8.75/12); //font selection issue
              ctx.rotate(-angle);
            }
        },

        toggleScales(){
            $("#scaleCanvas").toggle()
            this.scalesShown = !this.scalesShown
            this.draw()
        },

        drawScales(){
            if(!this.scalesShown){
                return;
            }
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

        toggleBearingPointer(){
            this.bearingPointerShown = !this.bearingPointerShown;
            this.draw()
        },

        drawBearingPointer(radial){
            if(!this.bearingPointerShown){
                return;
            }
            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.translate(radius, radius);
            ctx.rotate(0);

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

        drawWind(){
            if(!this.windShown){
                return;
            }

            const ctx = this.getCanvasContext();
            ctx.resetTransform();
            ctx.translate(radius, radius);

            this.drawline(ctx, this.windBearing*Math.PI/180, radius,0, radius, radius/200, "cyan")
            
            var crosswindComponent = this.crosswindComponent
            var maxDrift = (this.windspeed/(this.airspeed/60))
            if(crosswindComponent < 0){
                this.drawline(ctx, (this.headingInput+90)*Math.PI/180, radius, (radius-radius*Math.abs(crosswindComponent)/maxDrift), radius, radius/50, "cyan")
            }else{
                this.drawline(ctx, (this.headingInput-90)*Math.PI/180, radius, (radius-radius*Math.abs(crosswindComponent)/maxDrift), radius, radius/50, "cyan")
            }
        },

        toggleCDI(){
            $("#cdiCanvas").toggle()
            this.cdiShown = !this.cdiShown;
            this.draw();
        },

        drawCDI(){
            if(!this.cdiShown){
                return;
            }
            const canvas = document.getElementById('cdiCanvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();
            ctx.clearRect(0-10, 0-10, canvas.width+20, canvas.height+20);
            ctx.translate(radius, radius);
            ctx.rotate(0);

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
            ctx.arc(0, radius*1/3.5-(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(0, radius*2/4+(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()

            ctx.beginPath();
            ctx.arc(0, -radius*1/3.5+(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()
            ctx.beginPath();
            ctx.arc(0, -radius*2/4-(circleRadius), circleRadius, 0, 2*Math.PI, false);
            ctx.stroke()

            //deflection bar and to/from
            var deflectionUnit = (-radius/2-(radius/10))/10; //full deflection is 10radials
            var course = parseInt(this.courseInput)%360;
            var radial = parseFloat(this.orig.radial)

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
                var triangleHeight = (radius*1/9)
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
                var triangleHeight = -(radius*1/9)

            }
            //to/from triangle
            var leftBase = -radius*7/100
            var rightBase = radius*7/100
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

            //cdi deflection
            ctx.resetTransform();
            ctx.translate(radius, radius);
            ctx.strokeStyle = "lime"
            ctx.lineCap = "butt";//lol
            ctx.lineWidth = radius*2/100;
            ctx.beginPath();
           
            ctx.rotate(radialRadian);
            ctx.moveTo(deflectionUnit*currentRadialDeflection,-radius+radius*2/3 + radius*2/50);
            ctx.lineTo(deflectionUnit*currentRadialDeflection, radius*1/3 - radius*2/50);
            ctx.stroke();
            ctx.rotate(-radialRadian);
            

            ctx.rotate(-(radialRadian-Math.PI/2));
        },

        getWrappedRadial(radial, addition){
            var newRadial = parseFloat(radial) + parseFloat(addition)
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

        showSidebar(){
            $("#showSidebar").css({
                'display': 'none'
            })
            $("#sidebar").show()
            $("#navbar").slideUp();

        },

        hideSidebar(){
            $("#showSidebar").css({
                'display': 'flex'
            })
            $("#sidebar").hide()
            $("#navbar").slideDown();
        },






        simulate(fps){
            
        },

        //always swapping radial increase/decrease when passing through 180/360. Need to offset the current radial from windKilled heading perhaps??
        startSimulation(){
            if(this.simulationRunning){
                clearInterval(simulationLoop)
            }else{
                var fps = 30;
                var frametime = 1/fps; //used for setInterval()
                simulationLoop = setInterval(function(){
                    var windBearing = app.getWrappedRadial(app.windBearing, -180)// the direction you're being pushed
                    var planeXSpeed = app.airspeed * Math.cos(app.headingInput*Math.PI/180)
                    var planeYSpeed = app.airspeed * Math.sin(app.headingInput*Math.PI/180)
                    var windXSpeed = app.windspeed * Math.cos(windBearing*Math.PI/180)
                    var windYSpeed = app.windspeed * Math.sin(windBearing*Math.PI/180)
                    var xSpeed = planeXSpeed + windXSpeed
                    var ySpeed = planeYSpeed + windYSpeed
                    var windKilledSpeed = Math.sqrt(xSpeed*xSpeed + ySpeed*ySpeed)
                    var windKilledHeading = (Math.atan2(ySpeed, xSpeed)/Math.PI*180);
                    windKilledHeading = app.getWrappedRadial(windKilledHeading, 360)-90

                    var distancePerSecond = windKilledSpeed/60/60;
                    var distancePerFrame = distancePerSecond/fps; // in miles
                    var pixelsPerMile = radius/app.getPtPscale()
                    var pixelsTraveledPerFrame = distancePerFrame * pixelsPerMile


                    var moveY = distancePerFrame * Math.sin((app.getAngleDiff(windKilledHeading, 360))*Math.PI/180);//good
                    var moveX = distancePerFrame * Math.cos((app.getAngleDiff(windKilledHeading, 360))*Math.PI/180);//good
                    //windKilledHeading = app.getWrappedRadial(windKilledHeading, -90)
                    //console.log(windKilledHeading)

                    console.log(moveX)
                    console.log(moveY)

                    //need to add the move y/x to the existing point, or we need to update sign based on radial quadrant AND heading
                    //need to account for ehsi scale when using the coords
                    var scale = app.getPtPscale();
                    var origX, origY
                    if(app.orig.dme == scale){
                        origX = centerX + radius*Math.cos((app.orig.radial-90)*Math.PI/180)
                        origY = centerY + radius*Math.sin((app.orig.radial-90)*Math.PI/180)
                    }else{
                        var ratio = app.orig.dme/app.dest.dme
                        origX = centerX + (radius*Math.cos((app.orig.radial-90)*Math.PI/180))
                        origY = centerY + (radius*Math.sin((app.orig.radial-90)*Math.PI/180))
                        origX = origX*parseFloat(ratio)
                        origY = origY*parseFloat(ratio)
                    }

                    //we need to always move "up" inside the compass. 
                        //we need to calculate our move Y, then do more trig to get the offest between to heading and the actual canvas rotation
                        //that way our lil dot will move directly up towards the top of the computer screen. 





                    var newX = parseFloat(origX)+parseFloat(moveX);
                    var newY = parseFloat(origY)+parseFloat(moveY);

                    var newRadial = Math.atan2(newY,newX)*Math.PI/180;
                    newRadial = app.getWrappedRadial(app.orig.radial, newRadial)
                    app.orig.radial = newRadial;

                    var newDme = Math.sqrt(Math.pow(newX,2) + Math.pow(newY,2)); //broken
                    app.orig.dme = parseFloat(newDme/pixelsPerMile) //broken
                    app.draw()


                    //clearInterval(simulationLoop)
                }, 1/30*1000) 
            }
            this.simulationRunning = !this.simulationRunning
        }

    },

    mounted() {
        this.initCanvasLayers();
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

            if(window.innerWidth <= 600){
                if(!this.screenSizeWarningAccepted && !$("#screenSizeWarning").hasClass("show")){
                    $("#screenSizeWarning").modal("show")
                }
            }
            
        });

        window.addEventListener('keydown', function(e) { 

        })
    },

    computed: {

        crosswindComponent: function(){
           return (this.windspeed/(this.airspeed/60) * Math.sin(this.getAngleDiff(this.headingInput, this.windBearing)*Math.PI/180)).toFixed(2);

        }
    }

});

$(document).ready(function(){

    if(window.innerWidth <= 600){
        $("#screenSizeWarning").modal("show")
    }


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


    $("#courseKnob").on("change", function(){
        var newCourseVal = $("#courseKnob").val() % 360
        if(newCourseVal < 0){
            newCourseVal += 360
        }

        app.courseInput = newCourseVal;
        app.drawCDI()
    })
    $("#courseInput, #courseSlider").on("input", function(){
        $("#courseKnob").val(parseInt($(this).val()))
        courseKnob.val(parseInt($(this).val()))
    })


    $("#headingKnob").on("change", function(){
        var newHeadingVal = $("#headingKnob").val() % 360
        if(newHeadingVal < 0){
            newHeadingVal += 360
        }
        app.headingInput = newHeadingVal;
        app.rotateCanvas(newHeadingVal)
    })
    $("#headingInput, #headingSlider").on("input", function(){
        $("#headingKnob").val(parseInt($(this).val()))
        headingKnob.val(parseInt($(this).val()))
    })


    $("#radialKnob").on("change", function(){
        var newRadialVal = $("#radialKnob").val() % 360
        if(newRadialVal < 0){
            newRadialVal += 360
        }
        app.orig.radial = newRadialVal;
    })
    $("#radialInput, #customOriginRadial").on("input", function(){
        $("#radialKnob").val(parseInt($(this).val()))
        radialKnob.val(parseInt($(this).val()))
    })

});
