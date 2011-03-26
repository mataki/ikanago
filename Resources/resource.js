var heroku = require('heroku');
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});

var options25 = [];
for(var i=1;i<26;i++){
  options25.push(i.toString());
}

// ---- dynos
var dynoRow = Ti.UI.createTableViewRow();
var dynoLabel = Ti.UI.createLabel({text: "Dynos", left:10});
dynoRow.add(dynoLabel);
var dynoNum = Ti.UI.createLabel({right: 10});
dynoRow.add(dynoNum);
var dynoDialog = Ti.UI.createOptionDialog({
  options: options25,
  title: "Set dynos",
  selectedIndex: Number(dynoNum.text)-1
});
dynoRow.addEventListener('click', function(){
  dynoDialog.show();
});
dynoDialog.addEventListener('click', function(e){
  actInd.show();
  heroku.setDynos(comm.getLogin(), win.appName, e.index+1, function(result){
    actInd.hide();
    if(result != null){
      dynoNum.text = result;
    } else {
      alert("Failed to update dynos");
    }
  });
});

// ---- workers
var workerRow = Ti.UI.createTableViewRow();
var workerLabel = Ti.UI.createLabel({text: "Workers", left: 10});
workerRow.add(workerLabel);
var workerNum = Ti.UI.createLabel({right: 10});
workerRow.add(workerNum);
var workerDialog = Ti.UI.createOptionDialog({
  options: options25,
  title: "Set workers",
  selectedIndex: Number(workerNum.text)-1
});
workerRow.addEventListener('click', function(){
  workerDialog.show();
});
workerDialog.addEventListener('click', function(e){
  actInd.show();
  heroku.setWorkers(comm.getLogin(), win.appName, e.index+1, function(result){
    actInd.hide();
    if(result != null){
      dynoNum.text = result;
    } else {
      alert("Failed to update workers");
    }
  });
});

// ---- Stack, Repo, Slug, Data
var createRow = function(label){
  var row = Ti.UI.createTableViewRow();
  var labelLabel = Ti.UI.createLabel({text: label, left: 10});
  var valueLabel = Ti.UI.createLabel({right: 10});
  row.add(labelLabel);
  row.add(valueLabel);
  return [row, valueLabel];
};
var stackArr = createRow("Stack");
var repoArr = createRow('Repo');
var slugArr = createRow('Slug');
var dataArr = createRow('Data');

// ---- URL, Git url
var urlRow = Ti.UI.createTableViewRow({header: "Urls", hasChild: true});
var urlLabel = Ti.UI.createLabel({left: 10});
urlRow.add(urlLabel);
urlRow.addEventListener('click', function(){
  var wvWin = Ti.UI.createWindow();
  var webView = Ti.UI.createWebView();
  webView.url = urlLabel.text;
  wvWin.add(webView);
  Ti.UI.currentTab.open(wvWin);
});

var gitRow = Ti.UI.createTableViewRow();
var gitLabel = Ti.UI.createLabel({left: 10});
gitRow.add(gitLabel);

// ----
tView.setData([dynoRow, workerRow, stackArr[0], repoArr[0], slugArr[0], dataArr[0], urlRow, gitRow]);
win.add(tView);

actInd.show();
heroku.info(comm.getLogin(), win.appName, function(result){
  actInd.hide();
  if(result != null){
    dynoNum.text = result.dynos;
    workerNum.text = result.workers;
    stackArr[1].text = result.stack;
    repoArr[1].text = result.repo;
    slugArr[1].text = result.slug;
    dataArr[1].text = result.data;
    urlLabel.text = result.appUrl;
    gitLabel.text = result.gitUrl;
  } else {
    alert('Failed to load data');
  }
});

