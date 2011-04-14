var heroku = require('heroku');
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});

win.add(tView);

var createRow = function(key, val){
  var row = Ti.UI.createTableViewRow({layout: 'vertical'});
  var keyLabel = Ti.UI.createLabel({text: key, left: 10, font: {fontWeight: 'bold'}});
  var valLabel = Ti.UI.createLabel({text: val, left: 10, top: 3, color: "#999"});
  row.add(keyLabel);
  row.add(valLabel);
  return row;
};

actInd.show();
heroku.configVars(comm.restoreLogin(), win.appName, function(result){
  actInd.hide();
  var data = [];
  for(var i in result){
    data.push(createRow(i, result[i]));
  }
  tView.setData(data);
});
