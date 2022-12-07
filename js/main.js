var app = new Vue({
    el: "#app",

  //------- data --------
    data: {
        API_BASE_URL: "https://api.github.com/users/ryannitz",
        api_base_object : {
          "login": "ryannitz",
          "url": "https://api.github.com/users/ryannitz",
          "html_url": "https://github.com/ryannitz",
          "followers_url": "https://api.github.com/users/ryannitz/followers",
          "following_url": "https://api.github.com/users/ryannitz/following{/other_user}",
          "gists_url": "https://api.github.com/users/ryannitz/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/ryannitz/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/ryannitz/subscriptions",
          "organizations_url": "https://api.github.com/users/ryannitz/orgs",
          "repos_url": "https://api.github.com/users/ryannitz/repos",
          "events_url": "https://api.github.com/users/ryannitz/events{/privacy}",
          "received_events_url": "https://api.github.com/users/ryannitz/received_events",
        },

        repos: [],

        siteTree: [],
    },

  //------- methods --------
    methods: {

        init() {
          //this.loadAPIBase();
          //this.loadSiteTree();
        },

        loadAPIBase() {
            axios
            .get(this.API_BASE_URL)
            .then(response => {
                this.api_base_object = response.data;
                console.log(this.api_base_object);
            })
            .catch(e => {
                //change this to be perma message banner
                if(e.response){
                    console.log(e);
                    createAlert("danger", "Could not intialize API base", 3000);
                }
            });
        },

        loadSiteTree() {
          axios
          .get("https://api.github.com/repos/ryannitz/ryannitz.github.io/git/trees/main")
          .then(response => {
              this.siteTree = this.filteredSiteTree(response.data);
          })
          .catch(e => {
              //change this to be perma message banner
              if(e.response){
                  console.log(e);
                  createAlert("danger", "Could not fetch site tree", 3000);
              }
          });
        },

        loadRepos() {
            if(this.api_base_object != null) {
                axios
                .get(this.api_base_object.repos_url)
                .then(response => {
                    this.repos = response.data;
                    console.log(this.repos);
                })
                .catch(e => {
                    //change this to be perma message banner
                    if(e.response){
                        console.log(e);
                        createAlert("danger", "Could not fetch repos", 3000);
                    }
                });
            }
        },

        filteredSiteTree(siteObj) {
          return siteObj.tree.filter(treeBranch => {
            return treeBranch.path.includes(".html") && !treeBranch.path.includes("index.html");
          })
        },

        toggleFocused(event) {
          document.querySelectorAll('.item').forEach(function(element, index) {
            element.classList.remove("focused");
          });
          event.target.classList.add("focused");
        }
    },

    beforeMount(){
        this.init();
    },

    computed: {

    }
});


$(document).ready(function(){

  function createAlert(type, text, millis) {
      var id = Math.floor((Math.random() * 1000) + 1);
      var alerthtml = '<div id="alert-'+id+'" class="alert alert-'+type+' alert-dismissible text-center fixed-bottom w-75 mx-auto mb-5">' +
                      '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                      '<strong><i class="fas fa-info-circle"></i></strong> '+
                      text+
                  '</div>'
      $("body").append(alerthtml);
      setTimeout(function(){
          $('#alert-'+id).fadeOut(500, function(){
              $('#alert-'+id).remove();
          });
      }, millis)
  }

  var elementStack = [];
  elementStack.push("#rnitz");
  
  var focusIcon = '<i class="fa-solid fa-angle-left navarrow"></i>';
  $(".item").append(focusIcon);
  var linkIcon = '<i class="fa-solid fa-link"></i> ';
  $(".link").prepend(linkIcon);
  var dirIcon = '<i class="fa-solid fa-folder"></i> ';
  $(".dir").prepend(dirIcon);
  var writeupIcon = '<i class="fa-solid fa-file"></i> ';
  $(".writeup").prepend(writeupIcon);


  $(".item").hover(function(){
    $(".item").removeClass("focused");
    $(this).addClass("focused");
    
  });


  $(".navigable").click(function(){
    $("#back").addClass("d-block");
    var toHide = elementStack[elementStack.length-1];
    $(toHide).removeClass("d-block");
    var toShow = $(this).attr("page");
    $(toShow).addClass("d-block");
    elementStack.push(toShow);

    updateTerminalPath();
  });

  function updateTerminalPath() {
    var path = 'C:\\Users';
    elementStack.forEach(element => {
      path += "\\" + element.replace("#", "");
    });
    path += ">";

    $("#terminalPath").html(path);
  }

  function updatePreviewPath(content) {
    var path = 'C:\\Users';
    elementStack.forEach(element => {
      path += "\\" + element.replace("#", "");
    });
    path += "> " + content;

    $("#previewPath").html(path);
  }

  $("#back").click(function(){
    var toHide = elementStack.pop();
    $(toHide).removeClass("d-block");
    if(elementStack.length == 1) {//we have return to root
      $(this).removeClass("d-block");
    }
    $(elementStack[elementStack.length-1]).addClass("d-block");
    updateTerminalPath();
  });



  //This is REALLY bad code because I'm using half vue, half vanilla. Will need to transition everything to vue.
  $(document)
  .on("click", ".link", function() {
    return false;
  })
  .on("dblclick", ".link", function(){
    window.open(this.href,'_blank');
    return false;
  })
  .on("click", ".item", function() {
    var toShow = $(this).attr("preview");
    if(toShow){
      updatePreviewPath(toShow.replace("#", ""));
      $(".preview").removeClass("d-block");
      $(toShow).addClass("d-block");
    }
  })
  .on("mouseenter", ".item > span", function() {
    unscramble(750, 25, this, this)
  })


});


