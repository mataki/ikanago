var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var textArea = Ti.UI.createTextArea({
  suppressReturn: true,
  top: 20,
  left: 10,
  right: 10,
  height: 50
});
win.add(textArea);

var submit = Ti.UI.createButton({
  title: "Go",
  top: 80,
  right: 10,
  left: 10,
  height: 50
});
win.add(submit);

submit.addEventListener('click', function(){
  var cmd = textArea.value;
  alert('Not yet supported');
  // actInd.show();
  // heroku.console(comm.restoreLogin(), win.appName, cmd, function(result){
  //   actInd.hide();
  //   resLabel.text = result + "------" + resLabel.text;
  // });
});

var sView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  top: 140,
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

var resLabel = Ti.UI.createLabel({
  color: "#fff",
  text: "Result"
});
sView.add(resLabel);

win.add(sView);
