
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width/2;
const centerY = canvas.width/2;
const radius = canvas.width/2;

var app = new Vue({
    el: "#app",


    data : {

        ehsi:{
            pointsDrawn: false,
        },

        dmeMax: 50,
        dmeStep: 5,
        radialStep: 10,
        headingInput: 360,

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

        generateRandomRadial(){
            return Math.floor(Math.random() * (360/this.radialStep)+1)*this.radialStep;
        },

        generateRandomDME(){
            return Math.floor(Math.random() * (this.dmeMax/this.dmeStep)+1)*this.dmeStep;
        },

        initPoints(){
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

        generatePtP(){
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            $(".answer").hide();
            this.initPoints();

            $("#origPoint").text(`${this.orig.radial}/${this.orig.dme}`);
            $("#destPoint").text(`${this.dest.radial}/${this.dest.dme}`);

            $("#initialHeading").text(`${this.getAngle(this.orig, this.dest)}`);
            $("#distance").text(`${this.getDistance(this.orig, this.dest)}`);
            this.drawEHSI()
        },

        showAnswer(event){
            $(event.target).siblings().find("span").show();
        },

        getPtPscale(){
            return Math.max(this.orig.dme, this.dest.dme);
        },

        drawPoints(){
            if(this.ehsi.pointsDrawn){
                return;
            }
            var scale = this.getPtPscale();
            if(this.orig.dme == scale){
                this.orig.coords = this.drawPoint(this.orig.radial, 1, "orig");
                this.dest.coords = this.drawPoint(this.dest.radial, this.dest.dme/this.orig.dme, "dest");
            }else{
                this.orig.coords = this.drawPoint(this.orig.radial, this.orig.dme/this.dest.dme, "orig");
                this.dest.coords = this.drawPoint(this.dest.radial, 1, "dest");
            }
            this.ehsi.pointsDrawn = true;
        },

        drawPoint(radial,ratio,label){
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();
            var pointWidth = radius*0.025;
            var x = centerX + radius*Math.cos((radial-90)*Math.PI/180)*ratio;
            var y = centerY + radius*Math.sin((radial-90)*Math.PI/180)*ratio;
        
            ctx.beginPath();
            ctx.arc(x, y, pointWidth, 0, 2*Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        
            ctx.font = radius*0.05 + "px arial";
            ctx.fillText(label,x+radius*0.1,y);

            return [x,y];
        },

        drawPtPLine(){
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.resetTransform();

            ctx.beginPath();
            ctx.strokeStyle = "green"
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.moveTo(this.orig.coords[0],this.orig.coords[1]);
            ctx.lineTo(this.dest.coords[0],this.dest.coords[1]);
            ctx.stroke();
        },

        drawRoughHeading(){
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            ctx.resetTransform();
            ctx.translate(radius, radius);
            var radianForDraw = this.getAngle(this.orig, this.dest)*Math.PI/180;
            this.drawline(ctx, radianForDraw, radius, radius, 2, "white")
            this.rotateCanvas(this.getAngle(this.orig, this.dest))
        },

        rotateCanvas(angle){
            $("#canvas").css({'transform' : 'rotate('+ -angle +'deg)'});
        },

        drawEHSI(){
            this.ehsi.pointsDrawn = false;

            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
            ctx.fillStyle = 'black';
            ctx.fill();

            //draw numbers
            ctx.translate(radius, radius);
            ctx.font = radius*0.1 + "px arial";
            ctx.fillStyle = "white";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for(let num = 1; num < 13; num++){
              let angle = num * Math.PI/6;
              ctx.rotate(angle);
              ctx.translate(0, -radius*0.66);
              ctx.rotate(-angle);
              ctx.fillText((num*3).toString(), 0, 0);
              ctx.rotate(angle);
              ctx.translate(0, radius*0.66);
              ctx.rotate(-angle);
            }

            //draw the 5 increments
            for(let num = 1; num < 37; num++){
                let angle = (num+.5)*Math.PI/18;
                this.drawline(ctx, angle, radius, radius*.125, 2, "white")
            }
            
            //draw the 10 increments
            for(let num = 1; num < 37; num++){
                let angle = num*Math.PI/18;
                this.drawline(ctx, angle, radius, radius*.25, 2, "white")
            }

            //draw the center
            ctx.resetTransform();
            ctx.fillStyle = "white";
            ctx.fillRect(centerX-15,centerY-2, 30,4);
            ctx.fillRect(centerX-2,centerY-15, 4,30);

            this.rotateCanvas(0)
            $("#ehsiControls").show()
        },

        drawline(ctx, angle, radius, length, width, color) {
            ctx.beginPath();
            ctx.strokeStyle = color
            ctx.lineWidth = width;
            ctx.lineCap = "round";

            ctx.rotate(angle);
            ctx.moveTo(0,-radius);
            ctx.lineTo(0, -radius+length);
            ctx.stroke();
            ctx.rotate(-angle);
          }
    },


    beforeMount() {

    },

    mounted() {
        
    },

    updated() {

    },

    created() {
        window.addEventListener('keydown', function(e) { 

        })
    },

    computed: {

    }

});

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

});

$(document)
    .on("click", "", function() {

    })



