var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Titanium.UI.createActivityIndicator({message: "Logged out..."});
win.add(actInd);

var getLoginStr = function(){
  var login = comm.getLogin(), email;

  if(login && login.email){
    email = login.email;
  } else {
    email = "Not logged in";
  }
  return email;
};

var emailLabel = Ti.UI.createLabel({
  color: "#fff",
  text: getLoginStr(),
  top: 10,
  left: 30,
  width: 'auto',
  height: 'auto'
});
win.add(emailLabel);

var logoutButton = Ti.UI.createButton({
  title: "Logout",
  top: 40,
  height: 50,
  width: 150
});

logoutButton.addEventListener('click', function(){
  actInd.show();
  comm.removeLogin();
  Titanium.App.fireEvent('account_reloaded');
});

win.add(logoutButton);

Titanium.App.addEventListener('account_reloaded', function(){
  actInd.hide();
  emailLabel.text = getLoginStr();
});
