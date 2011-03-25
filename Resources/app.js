// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();

var appsWin = Ti.UI.createWindow({
  id: 'AppList',
  title: "Applications",
  url: 'app_list.js'
});
var appsTab = Ti.UI.createTab({
  title: "Applications",
  window: appsWin
});

var accountWin = Ti.UI.createWindow({
  id: "Account",
  title: "Account",
  url: "account.js"
});
var accountTab = Ti.UI.createTab({
  title: "Account",
  window: accountWin
});

tabGroup.addTab(appsTab);
tabGroup.addTab(accountTab);

tabGroup.open();
