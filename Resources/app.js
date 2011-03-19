// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win = Titanium.UI.createWindow(
  {
    id: 'loginWindow',
    url: 'login.js'
  }
);

win.open(
  {
    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  }
);