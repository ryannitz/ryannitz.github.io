

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
            duration: "Feb. 2022 - Jul. 2022 (6 month)",
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
            duration: "May 2021 - Dec. 2021 (8 month)",
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
            duration: "Feb 2021 - Mar. 2021 (3 month)",
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
            duration: "Apr. 2020 - Aug. 2020 (4 month)",
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
            duration: "Sep. 2019 - Dec. 2019 (4 month)",
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
            title : "Quality Assurance Engineer Intern",
            duration: "Sep. 2018 - Dec. 2018 (4 month)",
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
        ],

        resumeJobs : [
          {
            title: "Software Development Engineer in Test (Contract)",
            company: "Cvent",
            location: "Fredericton, NB",
            duration: "February 2022 to July 2022",
            highlights: [
              "Project contract to update a Cucumber testing framework to be compatible with a new UI framework that was being adopted.",
              "Reported directly to the Lead SDET as one of two contractors working on the refactor.",
              "Developed great 1-1-1 communication skills while working in parallel on a monolithic project. Task assignments and coordination were key while making large scale changes across multiple linked repositories.",
              "Gained a much deeper understanding of enterprise custom built automation frameworks.",
              "Monitored nightly builds to gauge progress and stability.",
              "Worked with multiple teams, leads, architects, and deployments to validate tests, and acceptance criteria.",
              "Guided and assisted my colleague when blocked.",
              "Participated in regular meetings with stakeholders to align ongoing goals and expectations.",
              "Saw the project to completion before the scheduled deadline and had additional time to validate and ensure the project was stable to merge into production."
            ],
            employer_review_files: [
              
            ]
          },
          {
            title: "Software Development Engineer in Test Intern",
            company: "Cvent",
            location: "Fredericton, NB",
            duration: "May 2021 to December 2021",
            highlights: [
              "Worked on internet scale applications, where performance, reliability and scalability, were critical design goals.",
              "Tested and supported mobile applications on a wide range of platforms including iOS, Android, and web.",
              "Was a member of the main SDET team. A team that was comprised entirely of SDETs that would onboard company-wide initiatives, support other teams when needed, and took on SDET projects that were not team specific.",
              "Excelled rapidly and was trusted to ramp up new frameworks and convert old frameworks to implement technologies congruent with industry standards.",
              "Lead, taught, and assisted a small group of peers to increase code coverage on a backend repository using Mockito unit testing.",
              "Took lead on an initiatives that saw our supported teams adopt a nightly error dashboards which implemented log queries, error scrubbing, and one-on-one meetings with team leads.",
              "Developed, modified, and reviewed test automation/backend code written with multiple languages, frameworks, and tools, increasing my effectiveness in the QE and development space."
            ],
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
            title: "Software Developer (Contract)",
            company: "LuminUltra Technologies Ltd",
            location: "Fredericton, NB",
            duration: "February 2021 to March 2021",
            highlights: [
              "Two month contract as a Java backend developer.",
              "Tasked with clearing out the bug backlog which was encroaching critical levels.",
              "Used my previous framework and systems knowledge at the company to quickly and effectively eliminate over 19 bugs for the development team. This allowed the main development team to continue implementing features and achieve intended goals within their deadlines.",
              "Increased my experience working alone as a separate, individual entity. Maintaining my own tasks, timelines, builds, deployments, and QA requests."
            ],
            employer_review_files: [

            ]
          },
          {
            title: "Software Developer / Quality Assurance Engineer Intern",
            company: "IBM Canada",
            location: "Fredericton, NB",
            duration: "April 2020 to August 2020",
            highlights: [
              "Executed test cases and recorded the test results using test case management tools.",
              "Reported and verified defects using defect tracking tools.",
              "Wrote and updated test cases for specific areas, based on functional specifications. Including both manual and automated test cases.",
              "Reviewed customer documentation and requests.",
              "Participated in reviews of design and test documents.",
              "Set up, configured, and maintained test lab configurations to support various test scenarios and environments.",
              "Gained my first professional experience using individually deployed test environments and Jenkins builds at an enterprise level (CI/CD)."
            ],
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-ibm1.pdf"
              }
            ]
          },
          {
            title: "Software Developer Intern",
            company: "LuminUltra Technologies Ltd",
            location: "Fredericton, NB",
            duration: "September 2019 to December 2019",
            highlights: [
              "Wrote effective Unit Tests for new and existing logic on backend systems.",
              "Created backend services and integrated changes effectively with existing code.",
              "Contributed to the development, maintenance, and deployment of Software applications.",
              "Wrote efficient code following best practices and code reviews.",
              "Troubleshot and debugged applications running on the entire development stack.",
              "Participated in SCRUM to provide updates to all the stakeholders and communicate with teams.",
              "Aided in architect design for new backend implementations."
            ],
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-LU2.pdf"
              }
            ]
          },
          {
            title: "Quality Assurance Engineer Intern",
            company: "LuminUltra Technologies Ltd",
            location: "Fredericton, NB",
            duration: "September 2019 to December 2019",
            highlights: [
              "Wrote and executed functional/automated testing on mobile, web, and web data services products.",
              "Executed and evaluated manual or automated test cases and reported test results.",
              "Isolated, replicated, and reported defects and verified defect fixes.",
              "Developed, documented, and maintained automated test scripts and other artifacts like test data and functional test cases.",
              "Reviewed functional and design specifications to ensure full understanding of individual deliverables.",
              "Identified test requirements from specifications, mapped test case requirements and managed test coverage plan.",
              "Identified any potential quality issues per defined processes and escalated potential quality issues immediately to management.",
              "Ensured that validated deliverables met functional and design specifications and requirements.",
              "Trained and helped onboarding of new team members regarding related projects and software workflows, freeing the time and resources of the experienced leads."
            ],
            employer_review_files: [
              {
                name: "Employer Review 1",
                url: "documents/main/ryannitz-final-evaluation-LU1.pdf"
              }
            ]
          }
        ],

        resumeSkills : {
          languages : [
            "Java",
            "C",
            "C#",
            "Python",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "JSON",
            "XMLs",
            "Bash",
            "jQuery",
            "JSX",
            "MatLab",
            "Racket",
            "Groovy",
            "TypeScript"
          ],
          frameworks : [
            "Selenium",
            "Cucumber",
            "GEB",
            "Hibernate",
            "Spring",
            "Mockito",
            "Gradle",
            "Maven",
            "JWT",
            "RESTful webservices",
            "FitBit Studio",
            "Spock",
            "JUnit",
            "pytest",
            "WebdriverIO",
            "Jasmine",
            "jest",
            "Bootstrap5",
            "npm",
            "yarn",
            "WebDriver"
          ],
          tools : [
            "Jira",
            "Postman",
            "Microsoft SQL Server Management",
            "Oracle RDBMS",
            "Appium",
            "XCode",
            "Unity",
            "Android Studio",
            "IntelliJ",
            "Eclipse",
            "SVN",
            "Git",
            "GitHub",
            "GitLab",
            "BitBucket",
            "vSphere",
            "Jenkins",
            "DataDog",
            "Splunk"
          ],
          platforms : [
            "Windows",
            "MacOS",
            "Linux",
            "Android",
            "iOS",
            "FitBit"
          ]
        },

        resumeTech : [
          "Web debugging and analysis.",
          "Manual and automated performance/stress testing.",
          "Writing test cases for web and mobile applications.",
          "Writing effective and efficient automation scripts.",
          "Writing effective and efficient backend code with appropriate unit tests.",
          "Manual and automated testing for web and mobile applications, including applications that interface with custom hardware/software.",
          "Deploying builds to local and remote servers.",
          "Manual testing for vulnerabilities and exploitations, both for discovery and fix assurance.",
          "Front-end development interfacing standardized UI/UX elements with external data/databases/systems.",
          "Data tracking via Excel and data piping/analysis tools.",
          "Data mining and web scraping."
        ],

        resumeSoft : [
          "Friendly and personable in both communication and work style.",
          "Ability to manage independent and externally assigned tasks.",
          "Ability to manage priorities on multiple levels and time frames.",
          "Accountable, honest, and trustworthy with work tasks, data, company assets, and people.",
          "Adaptable to different types of work with interchanging roles and responsibilities.",
          "Coaching, training, and supporting of new or existing team members."
        ]
    },

  //------- methods --------
    methods: {

        init() {
          //this.loadAPIBase();
          this.loadSiteTree();
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

        sortList(list) {
          return list.sort();
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
      // window.addEventListener('keydown', (e) => {
      //   var static_websites_focused = document.getElementById("vueStaticWebpageTrigger").classList.contains('focused');
      //   if (e.key == 'Enter' && static_websites_focused) {
      //     this.loadSiteTree();
      //   }
      // });
    },

    computed: {

    }
});


$(document).ready(function(){

  const PATH_URL_PARAM = "path";
  const CONTEXT_URL_PARAM = "context";
  const CONTEXT_HEIGHT_URL_PARAM = "contextHeight";

  $(".settings-icon.fa-square").toggle();

  $("#content").find("a").append(' <sup><i class="fa-solid fa-arrow-up-right-from-square sup-link"></i></sup>')

  //resizing code used loosely from: https://stackoverflow.com/questions/6219031/how-can-i-resize-a-div-by-dragging-just-one-side-of-it
  var resizing = false;
  var contextHeight = 50.0;
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
      var newContextHeight = 100 - percentagePosY;
      setContextHeight(newContextHeight);
    }
  })
  $(document).mouseup(function(e) {
    if (resizing) {
      insertUrlParam(CONTEXT_HEIGHT_URL_PARAM, contextHeight);
      $("body").css("cursor", "inherit");
    }
    resizing = false;
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
  });

  function updateUrlPath(contextId) {
    if(elementStack.length > 1) {
      var searchPath = "";
      elementStack.forEach(element => {
        searchPath += element.replace("#", "") + "/";
      })
      insertUrlParam(PATH_URL_PARAM, searchPath)
    }else {
      removeUrlParameter(PATH_URL_PARAM);
    }
    if(contextId) {
      insertUrlParam(CONTEXT_URL_PARAM, contextId)
    }
  }

  function setContextHeight(newContextHeight) {
      contextHeight = Number(newContextHeight).toFixed(2);
      var newTerminalHeight = 100- newContextHeight;
      $("#mainTerminal").css("height", newTerminalHeight + "%");
      $("#contextScreen").css("height", newContextHeight + "%");
  }

  function evaluateState() {
    //we are not on the root page
    if(elementStack.length > 1) {
      for (var i = 0; i < elementStack.length; i++) {
        $(elementStack[i]).removeClass("d-block");
      }
      $(elementStack[elementStack.length-1]).addClass("d-block");
      $("#back").addClass("d-block");
    }
    updateTerminalPath();
  }

  function decodeUrlPath() {
    let searchParams = new URLSearchParams(window.location.search);
    //handle terminal path and stack
    var pathFromUrl = searchParams.get(PATH_URL_PARAM);
    if(pathFromUrl) {
      elementStack = pathFromUrl.split("/")
      elementStack.pop()
      elementStack = elementStack.map(element => ("#"+element));
      evaluateState();
    }
    
    //handle context height
    var contextHeightFromUrl = searchParams.get(CONTEXT_HEIGHT_URL_PARAM) || contextHeight;
    setContextHeight(contextHeightFromUrl)

    //handle context view
    var contextFromUrl = searchParams.get(CONTEXT_URL_PARAM);
    if(contextFromUrl) {
      displayContext(searchParams.get(CONTEXT_URL_PARAM))
    }
  }

  //stolen from: https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page
  function insertUrlParam(key, value) {
    if (history.pushState) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState({path: newurl}, '', newurl);
    }
  }
  // to remove the specific key
  function removeUrlParameter(paramKey) {
    const url = window.location.href
    var r = new URL(url)
    r.searchParams.delete(paramKey)
    const newUrl = r.href
    window.history.pushState({ path: newUrl }, '', newUrl)
  }


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
    updateUrlPath()
  });

  var unscramble_on = true;
  $("#scrambleToggle").click(function(){
    $(this).find("i").toggle();
    $(this).toggleClass("setting-disabled");
    unscramble_on = !unscramble_on;
  })

  function displayContext(contextId) {
    updatePreviewPath(contextId.replace("#", ""));
    $(".preview").removeClass("d-block");
    $(contextId).addClass("d-block");
  }



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
      displayContext(toShow);
    }
    updateTerminalPath();
    updateUrlPath(toShow)
  })
  .on("mouseenter", ".item > span", function() {
    if(unscramble_on) {
      unscramble(750, 25, this, this)
    }
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


  decodeUrlPath()

  //ensure that any dynamic content does not overlap the titleBar
  $("#contentScreenTitleBar").css("z-index","999");
});


