

var app = new Vue({
    el: "#app",

  //------- data --------
    // data: {

    //     imageObj : {
    //           src: ""gallery/media/images/aviation/art/20221225_155027.jpg",
    //         name: "",
    //         desc: "",
    //         date: "", //can be pulled from filename
    //         rotate: "",
    //     }
    //         },

    data : {
      selectedImage : null,
      aviation: {
        art : [
            {
              src: "gallery/media/images/aviation/art/20221225_155027.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/art/20221227_200507.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/art/20221227_200547.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/art/20221227_200557.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_200714.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: "-90deg"
            },
        ],
        artifacts : [
          {
              src: "gallery/media/images/aviation/artifacts/20210907_121140.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20220622_013930.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_200628.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_202104.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_202137.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_202156.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/artifacts/20221227_202205.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            }
        ],
        civilian: [
          {
              src: "gallery/media/images/aviation/civilian/20180321_104815.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20180321_122208.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20180321_122212.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20180321_145134_001.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_115659.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_125123.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_125138.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_125145.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_125156.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_181148.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_181202.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_181206.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_184313.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_200932.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_204421.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_204455.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_205011.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_205020.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212325.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212532.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212536.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212600.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212641.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_212643.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_213127.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_213130.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190527_213135.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223143.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223150.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223258.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223306.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223345.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223349.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223411.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223421.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223424.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223438.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20190603_223441.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20220809_163622.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/20220811_083442.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/IMG_20210731_184345_213.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/civilian/IMG_20210731_184345_217.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            }
        ],
        ottawa: [
          {
              src: "gallery/media/images/aviation/ottawa/20220429_155920.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160401.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160404.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160424.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160859.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160944.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_160949.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_164837.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_164846.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_164855.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_165238.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_165239.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_165507.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_165513.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_170004.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220429_171012.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220501_154942.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/ottawa/20220501_163000.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
                src: "gallery/media/images/aviation/ottawa/received_1607212872996735.jpeg",
                name: "",
                desc: "",
                date: "",
                rotate: ""
              }
        ],
        trenton: [
          {
              src: "gallery/media/images/aviation/trenton/20220413_155347.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155353.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155457.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155608.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155613.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155626.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155643.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155726.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155817.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155819.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155822.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_155949.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_160752.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_160807.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_160813.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_160825.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_160853.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_161828.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_161830.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_161833.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_164358.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_164605.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            },
            {
              src: "gallery/media/images/aviation/trenton/20220413_164937.jpg",
              name: "",
              desc: "",
              date: "",
              rotate: ""
            }
        ]
      }
    },
  

  //------- methods --------
    methods: {
      previewImage(image) {
        this.selectedImage = image;
        $('#previewImageModal').modal('show')
      },

      toggleGallery(gallerySet) {
        $(".gallery-set").hide();
        $("#"+gallerySet).show();
      },

      rotate(deg) {
        return {
          'transform' : 'rotate('+deg+')',
        }
      }
    },

    beforeMount(){
    },

    created() {
    },

    computed: {

    }
});


$(document).ready(function(){
  $("a.navlink").click(function(){
    $("a.navlink").removeClass("active");
    $(this).addClass("active");
  });

  $(".nav-link").click(function(){
      $('#calculatorMenu').collapse('hide')
  });

  $('#calculatorMenu').on('hidden.bs.collapse', function () {
      $("#layout-nav").addClass("shadow-sm")
  }).on('show.bs.collapse', function(){
      $("#layout-nav").removeClass("shadow-sm")
  });

  $('#calculatorMenu > div > button.close').click(function () {
      $("#calculatorMenu").collapse('hide');
  });

  $(".calcMenuItem").click(function(){
      $("#calculatorMenu").collapse('hide');
  });

});


