function ajaxGet(url, callback) //execute an asynchronous HTTP request
{
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur rÃ©seau avec l'URL " + url);
    });
    req.send(null);
};




   