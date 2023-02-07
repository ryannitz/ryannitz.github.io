const alertType = {
    success: "success",
    info: "info",
    warning: "warning",
    danger: "danger",
    primary: "primary",
    secondary: "secondary",
    dark: "dark",
    light: "light"
}

const alertLocation = {
    top: "top",
    bottom: "bottom"
}

//currently only functional for BS5
function createAlert(type, location, duration, text) {
    // not perfect but I never suspect more than 1-2 alerts at a time
    var id = "alert-" + Math.floor((Math.random() * 1000) + 1);
    var alert_html = '<div id="'+id+'" class="alert alert-'+type+' fixed-' + location + ' alert-dismissible text-center w-75 mx-auto m-5 shadow">' +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
                    '<strong><i class="fa-solid fa-info-circle me-1"></i></strong> '+
                    text+
                '</div>'
    $("body").append(alert_html);
    if(duration > 0) {
        setTimeout(function(){
            $(id).fadeOut(500, function(){
                $(id).remove();
            });
        }, duration)
    }
    return id;
}