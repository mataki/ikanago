// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var comm = require('comm');

var login = comm.getLogin();

if(login){
  var win2 = Titanium.UI.createWindow({id: 'AppList',
                                       url: 'app_list.js'});
  win2.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
} else {
  var win = Titanium.UI.createWindow({id: 'loginWindow',
                                      url: 'login.js'});

  win.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
}
