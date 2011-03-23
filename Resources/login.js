var heroku = require("heroku");
var comm = require('comm');

var win = Ti.UI.currentWindow;

var formView = Ti.UI.createView({top: 30,
                                 left: 0});

var emailLabel = Titanium.UI.createLabel({color: "#fff",
                                          text: "Email",
                                          top: 10,
                                          left: 30,
                                          width: 100,
                                          height: 'auto'});
var emailField = Titanium.UI.createTextField({hintText: 'Enter your email',
                                              height: 50,
                                              top: 35,
                                              left: 30,
                                              width: 250,
                                              borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED});
formView.add(emailLabel);
formView.add(emailField);

var passwordLabel = Titanium.UI.createLabel({color: "#fff",
                                             text: "Password",
                                             top: 85,
                                             left: 30,
                                             width: 100,
                                             height: 'auto'});
var passwordField = Titanium.UI.createTextField({hintText: 'Enter your password',
                                                 height: 50,
                                                 top: 110,
                                                 left: 30,
                                                 width: 250,
                                                 borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
                                                 passwordMask: true});
formView.add(passwordLabel);
formView.add(passwordField);

var submitButton = Titanium.UI.createButton({title: "Login",
                                             top: 175,
                                             left: 30,
                                             height: 50,
                                             width: 150});
formView.add(submitButton);

win.add(formView);

var actInd = Titanium.UI.createActivityIndicator({message: "Loggin in..."});
win.add(actInd);

submitButton.addEventListener('click', function(){
                                var email = emailField.value;
                                var password = passwordField.value;
                                actInd.show();
                                heroku.login(email, password, function(result, data){
                                               actInd.hide();
                                               if (result) {
                                                 comm.storeLogin(data);
                                                 win.close();
                                                 Titanium.App.fireEvent('account_reloaded');
                                               } else {
                                                 alert('Login failed!');
                                               }
                                             });
                              });

// TODO: Try cool animation form, but not work
//
// var labelView = Ti.UI.createView({top:30, left:0});
// var descLabel = Ti.UI.createLabel({color: "#fff",
//                                    text: "Input your heroku account",
//                                    font:{fontSize:24,fontWeight:'bold'},
//                                    top: 0,
//                                    left: 30});
// labelView.add(descLabel);
// win.add(labelView);
//
// win.addEventListener('open', function(){
//                        Ti.API.debug('Event open');

//                        var labelAnimation = Ti.UI.createAnimation();
//                        labelAnimation.left = 1000;
//                        labelAnimation.duration = 500;
//                        var formAnimation = Ti.UI.createAnimation();
//                        formAnimation.top = 30;
//                        formAnimation.duration = 1000;

//                        labelAnimation.addEventListener('complete', function(){
//                                                          Ti.API.debug('Animate form');
//                                                          formView.animate(formAnimation);
//                                                        });
//                        setTimeout(function(){
//                                     Ti.API.debug('Animate label');
//                                     labelView.animate(labelAnimation);
//                                   },
//                                   2000);
//                      });
