var heroku = require("heroku");

var win = Ti.UI.currentWindow;

heroku.list(Ti.App.login, function(list){
              var data = [];

              for(var i=0; i < list.length; i++){
                data.push({title: list[i].name});
              }

              var tview = Ti.UI.createTableView({data: data});

              win.add(tview);
            });
