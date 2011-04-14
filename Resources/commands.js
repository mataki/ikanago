var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;
var appName = win.title;
var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});

// ---- Table
var data = [
  {title: "Resources", url: 'resource.js'},
  {title: "Tools", url: 'tools.js'},
  {title: "Add-Ons", url: 'addons.js'},
  {title: "Collaborators", url: 'collaborators.js'}
];

var tView = Ti.UI.createTableView({
  data: data,
  top: 10,
  left: 18,
  right: 18,
  bottom: 225,
  borderWidth: 3,
  borderColor: '#111'
});

tView.addEventListener('click', function(e){
  var rowdata = e.rowData;
  var target = rowdata.url;
  var title = rowdata.title;
  var win2 = Ti.UI.createWindow({url: target, title: appName + " / " + title});
  win2.appName = appName;
  Ti.UI.currentTab.open(win2);
                       });
win.add(tView);

// ---- maintenance toggle
var mainteLabel = Ti.UI.createLabel({
  text: "Maintenance Mode",
  top: 250,
  left: 30
});
var mainteSwitch = Ti.UI.createSwitch({
  top: 240,
  width: 100,
  right: 20
});
mainteSwitch.addEventListener('change', function(e){
  actInd.show();
  heroku.maintenance(comm.restoreLogin(), appName, e.value, function(result){
    actInd.hide();
  });
});
win.add(mainteLabel);
win.add(mainteSwitch);

// ---- Restart Button
var restartButton = Ti.UI.createButton({
  title: "Restart",
  top: 320,
  left: 20,
  right: 20,
  height: 50
});

win.add(restartButton);
restartButton.addEventListener('click', function(){
  actInd.show();
  heroku.restart(comm.restoreLogin(), appName, function(result){
    actInd.hide();
    alert(result ? "Restarted" : "Failed to restart");
  });
});
