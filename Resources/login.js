var heroku = require("heroku");

var win = Ti.UI.currentWindow;

var emailLabel = Titanium.UI.createLabel(
  {
    color: "#fff",
    text: "Email",
    top: 10,
    left: 30,
    width: 100,
    height: 'auto'
  }
);
var emailField = Titanium.UI.createTextField(
  {
    hintText: 'Enter your email',
    height: 50,
    top: 35,
    left: 30,
    width: 250,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
  }
);
win.add(emailLabel);
win.add(emailField);

var passwordLabel = Titanium.UI.createLabel(
  {
    color: "#fff",
    text: "Password",
    top: 85,
    left: 30,
    width: 100,
    height: 'auto'
  }
);
var passwordField = Titanium.UI.createTextField(
  {
    hintText: 'Enter your password',
    height: 50,
    top: 110,
    left: 30,
    width: 250,
    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    passwordMask: true
  }
);
win.add(passwordLabel);
win.add(passwordField);

var submitButton = Titanium.UI.createButton(
  {
    title: "Login",
    top: 175,
    left: 30,
    height: 50,
    width: 150
  }
);
win.add(submitButton);

var win2 = Titanium.UI.createWindow(
  {
    id: 'AppList',
    url: 'app_list.js'
  }
);

submitButton.addEventListener('click', function(){
                                var email = emailField.value;
                                var password = passwordField.value;
                                heroku.login(email, password, function(result, data){
                                               if (result) {
                                                 Ti.API.debug('Set data' + data);
                                                 Ti.App.login = data;
                                                 win.hide();
                                                 win2.open(
                                                   {
                                                     transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
                                                   }
                                                 );
                                               }
                                             });
                              });
