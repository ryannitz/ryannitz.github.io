const PATH_URL_PARAM = "path";
const CONTEXT_URL_PARAM = "context";
const CONTEXT_HEIGHT_URL_PARAM = "contextHeight";

var elementStack = [];
elementStack.push("#rnitz");

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

function displayContext(contextId) {
    updatePreviewPath(contextId.replace("#", ""));
    $(".preview").removeClass("d-block");
    $(contextId).addClass("d-block");
  }

function setContextHeight(newContextHeight) {
    contextHeight = Number(newContextHeight).toFixed(2);
    var newTerminalHeight = 100- newContextHeight;
    $("#mainTerminal").css("height", newTerminalHeight + "%");
    $("#contextScreen").css("height", newContextHeight + "%");
}

function updateUrlPath(contextId) {
    if(elementStack.length > 1) {
      var searchPath = "";
      elementStack.forEach(element => {
        searchPath += element.replace("#", "") + "/";
      })
      insertUrlParam(PATH_URL_PARAM, searchPath)
    }else {
      removeUrlParam(PATH_URL_PARAM);
    }
    if(contextId) {
      insertUrlParam(CONTEXT_URL_PARAM, contextId)
    }
  }

  function decodeUrlPath() {
    if(window.location.href == "https://ryannitz.github.io/#resume"){ //backwards compatible with old links 
      window.location.href = "https://ryannitz.github.io/?context=%23resume&contextHeight=72.99"
    }
    let searchParams = new URLSearchParams(window.location.search);
    //handle terminal path and stack
    var pathFromUrl = searchParams.get(PATH_URL_PARAM);
    if(pathFromUrl) {
      elementStack = pathFromUrl.split("/")
      elementStack.pop()
      elementStack = elementStack.map(element => ("#"+element));
      evaluateState();
    }
    var contextHeightFromUrl = searchParams.get(CONTEXT_HEIGHT_URL_PARAM) || contextHeight;
    setContextHeight(contextHeightFromUrl)

    //handle context view
    var contextFromUrl = searchParams.get(CONTEXT_URL_PARAM);
    if(contextFromUrl) {
      displayContext(searchParams.get(CONTEXT_URL_PARAM))
    }
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