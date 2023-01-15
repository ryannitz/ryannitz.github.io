var app = new Vue({
    el: "#app",

  //------- data --------
  //add plane texts from my collection of books.

    data : {
      galleries : {},
      
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

      loadImages() {
        var relativeURL = window.location.href;
        relativeURL = relativeURL.substring(0, relativeURL.lastIndexOf("/")+1);
        var dataURL = relativeURL + "gallery/images.json";
        if(dataURL.startsWith("file")) {//for localhost
          dataURL = 'https://ryannitz.github.io/gallery/images.json'
        }
        axios
        .get(dataURL)
        .then(response => {
            this.galleries = response.data;
            this.selectedGallery = this.galleries.aviation.art
        })
        .catch(e => {
            //change this to be perma message banner
            if(e.response){
                console.log(e);
                //createAlert("danger", "Could not load image data", 3000);
            }
        });
      },

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
        this.selectedImageIndex++
        if(this.selectedImageIndex >= this.selectedGallery.length) {
          this.selectedImageIndex = 0;
        }
        this.selectedImage = this.selectedGallery[this.selectedImageIndex];
      },

      toggleGallery(gallerySet) {
        $(".gallery-set").hide();
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

    beforeMount() {
      this.loadImages();
    },

    mounted() {

    },

    created() {

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
});

$(document).on("click", ".category-list > li", function() {
  $("#menuIcon").removeClass("fa-xmark")
  $("#menuIcon").addClass("fa-bars")
})



