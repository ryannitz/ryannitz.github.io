

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

        itJobs : [
          {
            company : "Cvent",
            title : "Software Development Engineer in Test Contract",
            duration: "",
            summary: "My most recent work with Cvent was a contract to update a UI testing framework to be compatible with a newly implemented UI framework that was being adopted across the frontend stack. "
                      + "I worked alongside one other contractor who was also a previous intern, and the project lead who was a lead SDET. "
                      + "The goal was to take the team's folder in a large cucumber repo and update its steps, logic, selector dependencies, and environments so that the tests suites could be used again.",
            takeaways : [
              "Very profound understanding of enterprise level automation frameworks using in-house dependencies for pulling up-to-date environments/properties/components/etc.",
              "Extensive use of git. At the end of the project, the team branch and master branch couldn't be merged due to unrelated conflicting changes. This was an issue because the teams expected the entire branch to easily be accepted into master, but it was very very far from acceptance. The last few days I conjured up a bash script to pull all of our commits into a separate branch which could be accepted into master. I made sure this branch containing only our work would not create a diff with our dev branch, ensuring that if the dev branch would ever merge into master there would be no conflicts.",
              "How to work independently and/or with one other person on a shared project.",
              "How to balance work hours and priority when working across different timezones."
            ],
            stack : [
              {name: "Cucumber", desc: "Java/Groovy/GEB/Selenium"},
              {name: "DataDog", desc: ""},
              {name: "Git/BitBucket", desc: " See point 2 in Takeaways"},
              {name: "JIRA", desc: ""},
              {name: "JSON", desc: ""},
              {name: "Jenkins", desc: " Running our private branches for validation. Running nightlies linked to the team slack with our dev branch to share visibility and progress with our stakeholders. "},
              {name: "MacOS", desc: " My work environment"},
              {name: "RDBMS", desc: " Validating test environments/data/flags"},
              {name: "Agile", desc: ""},
              {name: "Slack", desc: ""},
              {name: "Splunk", desc: ""},
              {name: "Trello", desc: ""},
              {name: "IntelliJ", desc: ""},
              {name: "VSCode", desc: ""},
              {name: "AWS nodes", desc: ""}
            ],
            reflection: "This contract felt almost like an extension of my internship, only this time the entire duration was concentrated on one project rather than multiple concurrent projects/tasks. "
                         + "Admittedly, I enjoyed working in an isolated team on my own hours. Working independently on a project using tools/languages/frameworks that I'm familiar with is very zen and rewarding. "
                         + "Being able to sit down and pump out work and results is satisfying and felt like I had purpose and impact while working. "
                         + "The team leads kept re-iterating how awesome it was to have the test suites up and running so that they could actively test and monitor their area of responsibility. "
                         + "While working to fix the test suites, we actually discovered and even fixed a few bugs, proving the importance of having automated tests. This drove home the feeling of doing good and meaningful work. "
                         + "Overall I loved working at Cvent. They have an amazing culture and work atmosphere. The people I worked with were some of the coolest people I have been able to meet.",
            employer_review_files: [

            ]
          },
          {
            company: "Cvent",
            title : "Software Development Engineer in Test Intern",
            duration: "",
            summary: "",
            takeaways : [

            ],
            stack : [
              {name: "Cucumber", desc: " Java/Groovy/GEB/Selenium"},
              {name: "DataDog", desc: ""},
              {name: "Git/BitBucket", desc: ""},
              {name: "Gradle", desc: ""},
              {name: "JIRA", desc: ""},
              {name: "JSON", desc: ""},
              {name: "JUnit", desc: ""},
              {name: "Jasmine", desc: ""},
              {name: "JavaScript", desc: ""},
              {name: "Jenkins", desc: ""},
              {name: "MacOS", desc: " My work environment"},
              {name: "Maven", desc: ""},
              {name: "Mockito", desc: ""},
              {name: "Postman", desc: ""},
              {name: "RDBMS", desc: ""},
              {name: "SCRUM/Agile", desc: ""},
              {name: "Slack", desc: ""},
              {name: "Splunk", desc: ""},
              {name: "Trello", desc: ""},
              {name: "TypeScript", desc: ""},
              {name: "npm", desc: ""},
              {name: "wdio", desc: ""},
              {name: "yarn", desc: ""},
              {name: "IntelliJ", desc: ""},
              {name: "VSCode", desc: ""},
              {name: "AWS nodes", desc: ""}
            ],
            reflection: "",
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-cvent1.pdf"
              },
              {
                name: "Employer Review 2",
                url: "documents/main/ryannitz-final-evaluation-cvent2.pdf"
              }
            ]
          },
          {
            company: "LuminUltra",
            title : "Software Developer Contract",
            duration: "",
            summary: "",
            takeaways : [

            ],
            stack : [
              {name: "Android", desc: ""},
              {name: "Eclipse EE", desc: ""},
              {name: "Hibernate", desc: ""},
              {name: "Highcharts.js", desc: ""},
              {name: "JSON", desc: ""},
              {name: "JUnit", desc: ""},
              {name: "JWT", desc: ""},
              {name: "Java/Java EE", desc: ""},
              {name: "Jira", desc: ""},
              {name: "Linux", desc: ", Server environments"},
              {name: "MagicDraw", desc: ""},
              {name: "Maven", desc: ""},
              {name: "Microsoft SQL Server/Workbench", desc: ""},
              {name: "Mockito", desc: ""},
              {name: "Postman", desc: ""},
              {name: "RDBMS", desc: ""},
              {name: "REST Api/Architecture", desc: ""},
              {name: "SVN/Tortoise SVN", desc: ""},
              {name: "Scrum/Agile", desc: ""},
              {name: "Sharepoint", desc: ""},
              {name: "Spring/SpringBoot", desc: ""},
              {name: "Tomcat", desc: ""},
              {name: "Windows", desc: ", My work environment"},
              {name: "iOS", desc: ""}
            ],
            reflection: "",
            employer_review_files: [
              
            ]
          },
          {
            company: "IBM",
            title : "Software Developer / Quality Assurance Engineer Intern",
            duration: "",
            summary: "",
            takeaways : [

            ],
            stack : [
              {name: "Docker", desc:""},
              {name: "Git/GitLab", desc:""},
              {name: "Gradle", desc:""},
              {name: "Groovy", desc:""},
              {name: "IntelliJ", desc:""},
              {name: "JSON", desc:""},
              {name: "JUnit", desc:""},
              {name: "JavaScript", desc:""},
              {name: "Java", desc:""},
              {name: "Jenkins", desc:""},
              {name: "Jira", desc:""},
              {name: "Linux", desc:" Product shipped with linux distro"},
              {name: "Lua", desc:""},
              {name: "MacOS", desc:" My work environment"},
              {name: "Maven", desc:""},
              {name: "Rust", desc:""},
              {name: "Scrum/Agile", desc:""},
              {name: "Spock", desc:""},
              {name: "VSCode", desc:""},
              {name: "VSphere", desc:""},
              {name: "bash", desc:""},
              {name: "python", desc:""}
            ],
            reflection: "",
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-ibm1.pdf"
              }
              
            ]
          },
          {
            company: "LuminUltra",
            title : "Software Developer Intern",
            duration: "",
            summary: "",
            takeaways : [

            ],
            stack : [
              {name: "Android", desc: ""},
              {name: "Eclipse EE", desc: ""},
              {name: "Hibernate", desc: ""},
              {name: "Highcharts.js", desc: ""},
              {name: "JSON", desc: ""},
              {name: "JUnit", desc: ""},
              {name: "JWT", desc: ""},
              {name: "Java/Java EE", desc: ""},
              {name: "Jira", desc: ""},
              {name: "Linux", desc: " Server environments"},
              {name: "MagicDraw", desc: ""},
              {name: "Maven", desc: ""},
              {name: "Microsoft SQL Server/Workbench", desc: ""},
              {name: "Mockito", desc: ""},
              {name: "Postman", desc: ""},
              {name: "RDBMS", desc: ""},
              {name: "REST Api/Architecture", desc: ""},
              {name: "SVN/Tortoise SVN", desc: ""},
              {name: "Scrum/Agile", desc: ""},
              {name: "Sharepoint", desc: ""},
              {name: "Spring/SpringBoot", desc: ""},
              {name: "Tomcat", desc: ""},
              {name: "Windows", desc: " My work environment"},
              {name: "iOS", desc: ""}
            ],
            reflection: "",
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-LU2.pdf"
              }
            ]
          },
          {
            company: "LuminUltra",
            title : "Quality Assurance Intern",
            duration: "",
            summary: "",
            takeaways : [

            ],
            stack : [
              {name: "Android", desc: ""},
              {name: "Appium", desc: ""},
              {name: "Cucumber", desc: " Java/Groovy/GEB/Selenium"},
              {name: "IntelliJ", desc: ""},
              {name: "Jira", desc: ""},
              {name: "Linux", desc: ""},
              {name: "MacOS", desc: ""},
              {name: "Microsoft SQL Server/Workbench", desc: ""},
              {name: "Scrum/Agile", desc: ""},
              {name: "Windows", desc: ""},
              {name: "iOS", desc: ""}
            ],
            reflection: "",
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-LU1.pdf"
              }
            ]
          }
        ]
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
          if(this.siteTree.length == 0) {
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
          }
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

    created() {
      window.addEventListener('keydown', (e) => {
        var static_websites_focused = document.getElementById("vueStaticWebpageTrigger").classList.contains('focused');
        if (e.key == 'Enter' && static_websites_focused) {
          this.loadSiteTree();
        }
      });
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


  //resizing code used loosely from: https://stackoverflow.com/questions/6219031/how-can-i-resize-a-div-by-dragging-just-one-side-of-it
  var resizing = false;
  $("#contentScreenTitleBar").mousedown(function(e) {
    resizing = true;
  });
  $(document).mousemove(function(e) {
    if(resizing) {
      $("body").css("cursor", "row-resize");
      var releasePosY = e.pageY;

      var upperBound = $("#mainTerminalTitleBar").height();
      if(releasePosY < upperBound) {
        releasePosY = upperBound;
      }
      var lowerBound = window.innerHeight - $("#contentScreenTitleBar").height();
      if(releasePosY > lowerBound) {
        releasePosY = lowerBound;
      }
      var percentagePosY = (releasePosY / window.innerHeight) * 100;
      var newTerminalHeight = percentagePosY;
      var newContextHeight = 100 - percentagePosY;

      $("#mainTerminal").css("height", newTerminalHeight + "%");
      $("#contextScreen").css("height", newContextHeight + "%");
    }
  })
  $(document).mouseup(function(e) {
    resizing = false;
    $("body").css("cursor", "inherit");
  })



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

  $(".back").click(function(){
    var toHide = elementStack.pop();
    $(toHide).removeClass("d-block");
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
  .on('keydown', function(e) { 
    var keyCode = e.keyCode || e.which; 
  
    if(keyCode == 40 || keyCode == 38) {
      var focused = $(".page.d-block > .focused");
      if (keyCode == 40) { 
        var nextFocus = focused.next();
        if(nextFocus.length == 0) {
          nextFocus = $(".page.d-block > .item").first();
        }
      } 
      if (keyCode == 38) {
        var nextFocus = focused.prev();
        if(nextFocus.length == 0) {
          nextFocus = $(".page.d-block > .item").last();
        }
      }
      $(".item").removeClass("focused");
      nextFocus.addClass("focused");
      nextFocus.find("span").trigger("mouseenter")
    }

    if(keyCode == 13) {
      $(".focused").trigger("click");
      if($(".focused").hasClass("link")) {
        $(".focused").trigger("dblclick");
      }
    }
    
    //return false;
  });


});


