var heroku = require("heroku");

var win = Ti.UI.currentWindow;

var tView = Ti.UI.createTableView();

heroku.list(Ti.App.login, function(list){
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
