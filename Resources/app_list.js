var heroku = require("heroku");

var win = Ti.UI.currentWindow;

heroku.list(Ti.App.login, function(list){
              var data = [];

              for(var i=0; i < list.length; i++){
                data.push({title: list[i].name});
              }

              var tview = Ti.UI.createTableView({data: data});

              tview.addEventListener('click', function(e){
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

              win.add(tview);
            });
