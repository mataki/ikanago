var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Ti.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});
win.add(tView);

actInd.show();
heroku.addons(comm.getLogin(), win.appName, function(list){
  actInd.hide();
  if(list != null && list.length > 0){
    var data = [];
    for(var i=0; i<list.length; i++){
      data.push({title: list[i].description});
    }
    tView.setData(data);
  } else {
    alert('Failed to load addons');
  }
});
