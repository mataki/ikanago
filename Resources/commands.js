var heroku = require("heroku");

var win = Ti.UI.currentWindow;
var appName = win.title;

var l = Ti.UI.createLabel(
  {
    color: "#fff",
    text: appName,
    top: 10,
    left: 30
  }
);

win.add(l);

var restartButton = Ti.UI.createButton(
  {
    title: "Restart",
    top: 60,
    left: 30,
    height: 50,
    width: 150
  }
);

win.add(restartButton);
restartButton.addEventListener('click', function(){
                                 heroku.restart(Ti.App.login, appName, function(result){
                                                  alert(result);
                                                });
                               });