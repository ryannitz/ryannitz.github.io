var app = new Vue({
    el: "#app",

  //------- data --------
    data: {
        API_BASE_URL: "https://api.github.com/users/ryannitz",
        api_base_object : {
          "login": "ryannitz",
          "id": 46801728,
          "node_id": "MDQ6VXNlcjQ2ODAxNzI4",
          "avatar_url": "https://avatars.githubusercontent.com/u/46801728?v=4",
          "gravatar_id": "",
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
          "type": "User",
          "site_admin": false,
          "name": null,
          "company": null,
          "blog": "",
          "location": null,
          "email": null,
          "hireable": null,
          "bio": null,
          "twitter_username": null,
          "public_repos": 17,
          "public_gists": 0,
          "followers": 4,
          "following": 2,
          "created_at": "2019-01-18T01:29:44Z",
          "updated_at": "2022-08-26T14:13:54Z"
        },

        repos: null,

         //test data:
        siteTree: [{"path":"digits.html","mode":"100644","type":"blob","sha":"7317f565bb1de2637f38af81d7d5c3b2ac4d9841","size":554,"url":"https://api.github.com/repos/ryannitz/ryannitz.github.io/git/blobs/7317f565bb1de2637f38af81d7d5c3b2ac4d9841"},{"path":"mersenne.html","mode":"100644","type":"blob","sha":"76114e4f29573dc3b1bce3a10fe18308f69e4b16","size":52999,"url":"https://api.github.com/repos/ryannitz/ryannitz.github.io/git/blobs/76114e4f29573dc3b1bce3a10fe18308f69e4b16"},{"path":"sleep.html","mode":"100644","type":"blob","sha":"435535357f62628d6a7e1c910e6f95ea0b02c589","size":21585,"url":"https://api.github.com/repos/ryannitz/ryannitz.github.io/git/blobs/435535357f62628d6a7e1c910e6f95ea0b02c589"},{"path":"wine2020.html","mode":"100644","type":"blob","sha":"4facdb1c2ce6900c8461ab36215327915350ced0","size":3815,"url":"https://api.github.com/repos/ryannitz/ryannitz.github.io/git/blobs/4facdb1c2ce6900c8461ab36215327915350ced0"}],
        //*/
        /*
        siteTree: [],
        //*/
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

        //we need to hit this URL with the most recent SHA: https://api.github.com/repos/ryannitz/ryannitz.github.io/git/trees/8601819f53fe222a42c0ea1188bac4f332d94c76
        loadSiteTree() {
          axios
          .get("https://api.github.com/repos/ryannitz/ryannitz.github.io/git/trees/main")
          .then(response => {
              this.siteTree = this.filteredSiteTree(response.data);
              console.log("This:::::" + JSON.stringify(this.siteTree));
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
    },




    beforeMount(){
        this.init();

    },

    computed: {

      
      // filteredSiteTree(){
      //   console.log("computerd")
      //   if(this.siteTree.length > 0) {
      //     return this.siteTree.tree.filter(treeBranch => {
      //       return treeBranch.path.includes(".html") && !treeBranch.path.includes("index.html");
      //     })
      //   }
      // },
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


  $(".nav").hover(function(){
    $(".nav").removeClass("focused");
    $(this).addClass("focused");
  });


  //this can be made dynamic with element attributes or naming conventions
  $("#dirWebsites").click(function(){
    $(this).parent().hide();
    $(".level1").show();
    $("#websites").show();
    $(".back").show();
  });

  $(".back").click(function(){
    $(this).parent().hide();
    $(".level1").show();
    $("#websites").show();
    $(".back").show();
  });

});

