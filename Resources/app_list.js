var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var tView = Ti.UI.createTableView();

var loadApps = function(){
  heroku.list(comm.getLogin(), function(list){
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
    var loginWindow = Titanium.UI.createWindow({id: 'loginWindow',
                                                url: 'login.js',
                                                backgroundColor:'#800517'
                                               });
    loginWindow.open({modal:true});
  } else {
    loadApps();
  }
};
initView();

tView.addEventListener('click', function(e){
                         var appName = e.rowData.title;
                         var win2 = Ti.UI.createWindow(
                           {
                             title: appName,
                             url: 'commands.js',
                             id: 'Commands'
                           }
                         );
                         Ti.UI.currentTab.open(win2);
                       });

win.add(tView);

Titanium.App.addEventListener('account_reloaded', function(){
                                initView();
                              });
