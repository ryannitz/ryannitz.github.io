var app = new Vue({
    el: "#app",

  //------- data --------
  //add plane texts from my collection of books.

    data : {
      GALLERY_URL_PARAM : "gallery",
      CATEGORY_URL_PARAM : "category",
      IMAGE_URL_PARAM : "image",
      selectedGalleryName : "aviation",
      selectedCategoryName : "art",

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
            this.$nextTick(function() {
              this.loadStateFromUrl();
            })
        })
        .catch(e => {
            //change this to be perma message banner
            if(e.response){
                console.log(e);
                //createAlert("danger", "Could not load image data", 3000);
            }
        });
      },

      /**
       * Update this so that is category isn't specified, it will automatically select the first cat
       */
      loadStateFromUrl() {
        let searchParams = new URLSearchParams(window.location.search);
        
        var galleryFromUrl = searchParams.get(this.GALLERY_URL_PARAM);
        var categoryFromUrl = searchParams.get(this.CATEGORY_URL_PARAM);
        var imageIndexFromUrl = searchParams.get(this.IMAGE_URL_PARAM);

        if(galleryFromUrl && categoryFromUrl) {
          this.selectedGalleryName = galleryFromUrl;
          this.selectedCategoryName = categoryFromUrl;
          this.selectedGallery = this.galleries[galleryFromUrl][categoryFromUrl]
        }else {
          this.selectedGallery = this.galleries.aviation.art
        }
        this.toggleGallery();

        if(imageIndexFromUrl && imageIndexFromUrl < this.selectedGallery.length) {
          this.previewImage(this.selectedGallery[imageIndexFromUrl], parseInt(imageIndexFromUrl));
        }
      },

      toggleGallery() {
        $(".gallery-set").hide();
        $("#"+this.selectedCategoryName).show();
        insertUrlParam(this.GALLERY_URL_PARAM, this.selectedGalleryName);
        insertUrlParam(this.CATEGORY_URL_PARAM, this.selectedCategoryName);
      },

      removeImageUrlParam() {
        removeUrlParam(this.IMAGE_URL_PARAM);
      },

      previewImage(image, index) {
        this.selectedImageIndex = index;
        this.selectedImage = image;
        $('#previewImageModal').modal('show');
        insertUrlParam(this.IMAGE_URL_PARAM, this.selectedImageIndex);
      },

      previousImage(imageObj) {
        this.selectedImageIndex--;
        if(this.selectedImageIndex < 0) {
          this.selectedImageIndex = this.selectedGallery.length-1;
        }
        this.selectedImage = this.selectedGallery[this.selectedImageIndex];
        insertUrlParam(this.IMAGE_URL_PARAM, this.selectedImageIndex);
      },

      nextImage(imageObj) {
        this.selectedImageIndex++
        if(this.selectedImageIndex >= this.selectedGallery.length) {
          this.selectedImageIndex = 0;
        }
        this.selectedImage = this.selectedGallery[this.selectedImageIndex];
        insertUrlParam(this.IMAGE_URL_PARAM, this.selectedImageIndex);
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

    updated() {
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

$(document)
  .on("click", ".category-list > li", function() {
    $("#menuIcon").removeClass("fa-xmark")
    $("#menuIcon").addClass("fa-bars")
  })

  .on("click", "img", function() {
    var category = $(this).closest(".gallery-set");
    var categoryId = category.attr("id");
    var gallery = category.parent();
    var galleryId = gallery.attr("id");
  })



