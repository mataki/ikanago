var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var tView = Ti.UI.createTableView();

heroku.list(comm.getLogin(), function(list){
              if(list && list.length > 0){
                for(var i=0; i < list.length; i++){
                  tView.appendRow({title: list[i].name});
                }
              } else {
                Ti.API.debug(this.responseText);
                alert("Login failed or you have no apps");
              }
            });

tView.addEventListener('click', function(e){
                         var appName = e.rowData.title;
                         var win2 = Ti.UI.createWindow(
                           {
                             title: appName,
                             url: 'commands.js',
                             id: 'Commands'
                           }
                         );
                         win.hide();
                         win2.open(
                           {
                             transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
                           }
                         );
                       });

win.add(tView);

var logoutButton = Ti.UI.createButton({
                                        title: "Logout",
                                        bottom: 10,
                                        height: 50,
                                        width: 150
                                      });
logoutButton.addEventListener('click', function(){
                                comm.removeLogin();
                                win.close();
                                var loginWindow = Titanium.UI.createWindow({id: 'loginWindow',
                                                                            url: 'login.js'});
                                loginWindow.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
                              });
win.add(logoutButton);
