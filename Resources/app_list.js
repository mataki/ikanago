var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});

var loadApps = function(){
  actInd.show();
  heroku.list(comm.getLogin(), function(list){
    actInd.hide();
    var data = [];
    if(list && list.length > 0){
      for(var i=0; i < list.length; i++){
        data.push({title: list[i].name});
      }
      tView.setData(data);
    } else {
      Ti.API.debug(this.responseText);
      alert("Login failed or you have no apps");
    }
  });
};

var initView = function(){
  var login = comm.getLogin();

  if(!login){
    var loginWindow = Ti.UI.createWindow({
      id: 'loginWindow',
      url: 'login.js',
      backgroundColor: '#33c'
    });
    loginWindow.open({modal:true});
  } else {
    loadApps();
  }
};
initView();

tView.addEventListener('click', function(e){
  var appName = e.rowData.title;
  var win2 = Ti.UI.createWindow({
    title: appName,
    url: 'commands.js',
    id: 'Commands'
  });
  Ti.UI.currentTab.open(win2);
});

win.add(tView);

Ti.App.addEventListener('account_reloaded', function(){
  initView();
});
