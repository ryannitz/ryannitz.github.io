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
  function removeUrlParam(paramKey) {
    const url = window.location.href
    var r = new URL(url)
    r.searchParams.delete(paramKey)
    const newUrl = r.href
    window.history.pushState({ path: newUrl }, '', newUrl)
  }