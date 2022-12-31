

var app = new Vue({
    el: "#app",

  //------- data --------
  //add royal canadian mint coins to artifacts
  //add plane texts from my collection of books.

    data : {
      galleries : {
        aviation : {
          art : [
              {
                src: "gallery/media/images/aviation/art/20221225_155027.jpg",
                name: "Two RCAF Snowbirds",
                desc: "Two RCAF Snowbird planes flying with the western rockies in the background. This acrylic on canvas print is 2/300 and has been signed by both pilots pictured in the painting. Artist is Emil Oucharek. A simple internet search for this artist will show that he was very giving and kind person, which is nice to see. Purchased as gift in B.C.",
                related : [
                  "https://en.wikipedia.org/wiki/Snowbirds",
                  "https://vancouversunandprovince.remembering.ca/obituary/emil-oucharek-1066379880"
                ]
              },
              {
                src: "gallery/media/images/aviation/art/20221227_200507.jpg",
                name: "Lockheed Electra L-188",
                desc: "Lithographic print. Black and white watercolor painting of a Pacific Western Lockheed Electra L-188 in flight. Artist is Warren McCallister. Purchased as gift in B.C.",
                related : [
                  "https://projectswordtoys.blogspot.com/2013/09/birthday-5-warren-mcallister-update.html",
                  "https://en.wikipedia.org/wiki/Lockheed_L-188_Electra",
                  "https://en.wikipedia.org/wiki/Pacific_Western_Airlines"
                ]
              },
              {
                src: "gallery/media/images/aviation/art/20221227_200547.jpg",
                name: "Lockheed Hercules 382",
                desc: "Lithographic print. Black and white watercolor painting of a Pacific Western Lockheed Hercules 382 being marshalled on the ground. Artist is Warren McCallister. Purchased as gift in B.C.",
                related : [
                  "https://projectswordtoys.blogspot.com/2013/09/birthday-5-warren-mcallister-update.html",
                  "https://en.wikipedia.org/wiki/Lockheed_L-100_Hercules",
                  "https://en.wikipedia.org/wiki/Pacific_Western_Airlines"
                ]
              },
              {
                src: "gallery/media/images/aviation/art/20221227_200557.jpg",
                name: "Boeing 707",
                desc: "Lithographic print. Black and white watercolor painting of a Pacific Western Boeing 707 in flight. Artist is Warren McCallister. Purchased as gift in B.C.",
                related : [
                  "https://projectswordtoys.blogspot.com/2013/09/birthday-5-warren-mcallister-update.html",
                  "https://en.wikipedia.org/wiki/Boeing_707",
                  "https://en.wikipedia.org/wiki/Pacific_Western_Airlines"
                ]
              },
              {
                src: "gallery/media/images/aviation/art/20221227_200714.jpg",
                name: "Consolidated Vultee Canso - Banks",
                desc: "Watercolor painting of a Canadian Pacific Consolidated Vultee Canso in white, red, and blue. Artist is 'BANKS'. The tail number is CF-CRV, this allows us to determine its lifespan and eventual fate. Purchased as gift in B.C.",
                related : [
                  "https://aviation-safety.net/database/record.php?id=19530511-1",
                  "https://en.wikipedia.org/wiki/Consolidated_PBY_Catalina",
                  "https://en.wikipedia.org/wiki/Canadian_Pacific_Air_Lines"
                ]
              },
          ],
          artifacts : [
            {
                src: "gallery/media/images/aviation/artifacts/20210907_121140.jpg",
                name: "New ThrustMaster H.O.T.A.S.",
                desc: "New hands-on stick and throttle (HOTAS) for flight sim gaming. Purchased specifically for Microsoft Flight Simulator 2020.",
                related : [
                  "https://www.thrustmaster.com/en-us/products/t-16000m-fcs-hotas/"
                ]
              },
              {
                src: "gallery/media/images/aviation/artifacts/20220622_013930.jpg",
                name: "Custom original Ray-Ban 3025 aviators",
                desc: "Custom aviators with black frames and classic green lenses. Custom print on the inside of both earpieces. Can't go wrong with aviators."
              },
              {
                src: "gallery/media/images/aviation/artifacts/20221227_200628.jpg",
                name: "Mini propeller with metal cowling",
                desc: "Mini 3-bladed propeller attached to a small cutaway piece of metal cowling. The piece measures 2ft across. Was gifted as a Christmas present."
              },
              {
                src: "gallery/media/images/aviation/artifacts/20221227_202104.jpg",
                name: "RCAF roundel fabric patch",
                desc: "RCAF roundel fabric patch in standard color and older maple leaf design. Purchased at the Canada Aviation and Space Museum.",
                related : [
                  "https://en.wikipedia.org/wiki/Canada_Aviation_and_Space_Museum",
                  "https://ingeniumcanada.org/aviation"
                ]
              },
              {
                src: "gallery/media/images/aviation/artifacts/20221227_202137.jpg",
                name: "Metal Helicopter Pin",
                desc: "Metal Helicopter pin that was given to me as a gift, also purchased at the Canada Aviation and Space Museum.",
                related : [
                  "https://en.wikipedia.org/wiki/Canada_Aviation_and_Space_Museum",
                  "https://ingeniumcanada.org/aviation"
                ]
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_171012.jpg",
                name: "Grayscale RCAF jacket",
                desc: "Grayscale RCAF jacket that was purchased at the Canada Aviation and Space Museum. Also shows a portion of the museum guide/pamphlet.",
                related : [
                  "https://en.wikipedia.org/wiki/Canada_Aviation_and_Space_Museum",
                  "https://ingeniumcanada.org/aviation"
                ]
              },
              {
                src: "gallery/media/images/aviation/artifacts/20221227_202156.jpg",
                name: "RCAF wings",
                desc: "One of my most prized pieces. 2 tone RCAF wings patch for flight suit. Given to me by a Captain, I keep these wings in my wallet at all times."
              },
              {
                src: "gallery/media/images/aviation/artifacts/20221227_202205.jpg",
                name: "Buffalo Airways Magnet",
                desc: "A Buffalo Airways Magnet that I received during a gift exchange with the N.W.T. contingent at a Youth Bowl Canada nation championship. Pictured on the magnet is a DC-3, an iconic aircraft in the Buffalo Airways fleet, and commonly shown in the TV series 'Ice Pilots NWT'",
                related : [
                  "https://en.wikipedia.org/wiki/Buffalo_Airways",
                  "https://en.wikipedia.org/wiki/Douglas_DC-3",
                  "https://en.wikipedia.org/wiki/Ice_Pilots_NWT"
                ]
              }
          ],
          civilian: [
            {
                src: "gallery/media/images/aviation/civilian/20180321_104815.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20180321_122208.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20180321_122212.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20180321_145134_001.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_115659.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_125123.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_125138.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_125145.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_125156.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_181148.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_181202.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_181206.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_184313.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_200932.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_204421.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_204455.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_205011.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_205020.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212325.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212532.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212536.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212600.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212641.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_212643.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_213127.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_213130.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190527_213135.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223143.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223150.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223258.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223306.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223345.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223349.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223411.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223421.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223424.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223438.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20190603_223441.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20220809_163622.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/20220811_083442.jpg",
                name: "Air Canada A330-343",
                desc: "",
                date: "Tail# C-GEFA. A330 is one of my favorite planes."
              },
              {
                src: "gallery/media/images/aviation/civilian/IMG_20210731_184345_213.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/civilian/IMG_20210731_184345_217.jpg",
                name: "",
                desc: ""
              }
          ],
          ottawa: [
            {
                src: "gallery/media/images/aviation/ottawa/20220429_155920.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160401.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160404.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160424.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160859.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160944.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_160949.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_164837.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_164846.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_164855.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_165238.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_165239.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_165507.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_165513.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_170004.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220429_171012.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220501_154942.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/ottawa/20220501_163000.jpg",
                name: "",
                desc: ""
              },
              {
                  src: "gallery/media/images/aviation/ottawa/received_1607212872996735.jpeg",
                  name: "",
                  desc: "",
                    rotate: ""
                }
          ],
          trenton: [
            {
                src: "gallery/media/images/aviation/trenton/20220413_155347.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155353.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155457.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155608.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155613.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155626.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155643.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155726.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155817.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155819.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155822.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_155949.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_160752.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_160807.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_160813.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_160825.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_160853.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_161828.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_161830.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_161833.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_164358.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_164605.jpg",
                name: "",
                desc: ""
              },
              {
                src: "gallery/media/images/aviation/trenton/20220413_164937.jpg",
                name: "",
                desc: ""
              }
          ]
        },
        lego : {
          nasa : [

          ],
          city : [

          ],
          martian : [

          ],
          spongebob : [

          ]
        },
        military : {
          miscellaneous : [

          ]
        }
      },
      
      selectedGallery :  [],
      selectedImage : {
        src: "",
        name: "",
        desc: "",
        date: "",
        rotate: ""
      },
      selectedImageIndex : 0,
    },
  

  //------- methods --------
    methods: {
      previewImage(image, index) {
        this.selectedImageIndex = index;
        this.selectedImage = image;
        $('#previewImageModal').modal('show')
      },

      previousImage(imageObj) {
        this.selectedImageIndex--
        if(this.selectedImageIndex < 0) {
          this.selectedImageIndex = this.selectedGallery.length-1;
        }
        this.selectedImage = this.selectedGallery[this.selectedImageIndex];
      },

      nextImage(imageObj) {
        //get parent of the image
        this.selectedImageIndex++
        if(this.selectedImageIndex >= this.selectedGallery.length) {
          this.selectedImageIndex = 0;
        }
        this.selectedImage = this.selectedGallery[this.selectedImageIndex];
      },

      toggleGallery(gallerySet) {
        $(".gallery-set").hide();
        console.log(gallerySet)
        $("#"+gallerySet).show();
      },

      getImageDate(imageObj) {
        var date = "Could not extract the date dynamically";
        if(imageObj.hasOwnProperty('date') && imageObj.date){
          date = imageObj.date
        }else {
          //20221225_155027.jpg
          //received_1607212872996735
          //IMG_20210731_184345_217
          date = "Could not extract the date dynamically";
          var line = imageObj.src
          var filename = line.substring(line.lastIndexOf("/")+1, line.lastIndexOf("."));
          var dateStart = filename.search("([0-9]{8})(_+)");
          if(dateStart >= 0) {
            var dateString = filename.substring(dateStart, filename.lastIndexOf("_"));
            var dateStringISO = dateString.slice(0,4) + "-" + dateString.slice(4,6) + "-" + dateString.slice(6,8)
            date = dateStringISO
          }
        }
        return date;
      }

    },

    beforeMount(){
    },

    created() {
      this.selectedGallery = this.galleries.aviation.art
    },

    computed: {

    }
});
$(document).ready(function(){
  $("#menuToggle").click(function(){
    if($(this).hasClass("collapsed")) {
      $("#menuIcon").addClass("fa-bars")
      $("#menuIcon").removeClass("fa-xmark")
    }else {
      $("#menuIcon").removeClass("fa-bars")
      $("#menuIcon").addClass("fa-xmark")
    }
  })
  $("#galleryMenu > button").click(function(){
    $("#menuIcon").removeClass("fa-xmark")
    $("#menuIcon").addClass("fa-bars")
  })
});



