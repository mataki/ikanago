var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var sView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  top: 0,
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

var logLabel = Ti.UI.createLabel({
  color: "#fff"
});
sView.add(logLabel);

win.add(sView);

actInd.show();
heroku.logs(comm.restoreLogin(), win.appName, function(text){
  actInd.hide();
  if(text && text != null){
    logLabel.text = text;
  } else {
   Ti.API.debug(this.responseText);
    alert('Failed to get logs');
  }
});
