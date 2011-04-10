var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});

// ---- App Logs
var appLogsRow = Ti.UI.createTableViewRow({hasChild: true});
var appLogsLabel = Ti.UI.createLabel({text: "App Logs", left: 10});
appLogsRow.add(appLogsLabel);

appLogsRow.addEventListener('click', function(){
  var appLogsWin = Ti.UI.createWindow({url: 'app_logs.js', title: win.appName + " / App Logs"});
  appLogsWin.appName = win.appName;
  Ti.UI.currentTab.open(appLogsWin);
});

// ---- Cron Logs
var cronLogsRow = Ti.UI.createTableViewRow({hasChild: true});
var cronLogsLabel = Ti.UI.createLabel({text: "Cron Logs", left: 10});
cronLogsRow.add(cronLogsLabel);

cronLogsRow.addEventListener('click', function(){
  var cronLogsWin = Ti.UI.createWindow({url: 'cron_logs.js', title: win.appName + " / Cron Logs"});
  cronLogsWin.appName = win.appName;
  Ti.UI.currentTab.open(cronLogsWin);
});

// ---- Config
var configRow = Ti.UI.createTableViewRow({hasChild: true});
var configLabel = Ti.UI.createLabel({text: "Config", left: 10});
configRow.add(configLabel);

configRow.addEventListener('click', function(){
  var configWin = Ti.UI.createWindow({url: 'config.js', title: win.appName + " / Config"});
  configWin.appName = win.appName;
  Ti.UI.currentTab.open(configWin);
});

// ---- Rake
var rakeRow = Ti.UI.createTableViewRow({hasChild: true, header: "Actions"});
var rakeLabel = Ti.UI.createLabel({text: "Rake", left: 10});
rakeRow.add(rakeLabel);

rakeRow.addEventListener('click', function(){
  var rakeWin = Ti.UI.createWindow({url: 'rake.js', title: win.appName + " / Rake"});
  rakeWin.appName = win.appName;
  Ti.UI.currentTab.open(rakeWin);
});

// ---- Console
var consoleRow = Ti.UI.createTableViewRow({hasChild: true});
var consoleLabel = Ti.UI.createLabel({text: "Console", left: 10});
consoleRow.add(consoleLabel);

consoleRow.addEventListener('click', function(){
  var consoleWin = Ti.UI.createWindow({url: 'console.js', title: win.appName + " / Console"});
  consoleWin.appName = win.appName;
  Ti.UI.currentTab.open(consoleWin);
});


tView.setData([appLogsRow, cronLogsRow, configRow, rakeRow, consoleRow]);
win.add(tView);
