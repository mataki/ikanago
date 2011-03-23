var heroku = require('heroku');
var comm = require('comm');

var win = Ti.UI.currentWindow;

var actInd = Titanium.UI.createActivityIndicator({message: "Loading..."});
win.add(actInd);

var tView = Ti.UI.createTableView({left: 18, right:18, top: 10});

// ---- dynos
var dynoRow = Ti.UI.createTableViewRow();
var dynoLabel = Ti.UI.createLabel({text: "Dynos", left:10});
dynoRow.add(dynoLabel);
var dynoNum = Ti.UI.createLabel({right: 10});
dynoRow.add(dynoNum);
var options = ["1","2","3"];
var dynoDialog = Titanium.UI.createOptionDialog({options: options,
                                                 title: "Set dynos",
                                                 selectedIndex: Number(dynoNum.text)-1});
dynoRow.addEventListener('click', function(){
                           dynoDialog.show();
                         });
dynoDialog.addEventListener('click', function(e){
                              actInd.show();
                              heroku.setDynos(comm.getLogin(), win.appName, e.index+1, function(result){
                                                actInd.hide();
                                                if(result != null){
                                                  dynoNum.text = result;
                                                } else {
                                                  alert("Failed to update dynos");
                                                }
                                              });
                            });
// ---- TODO: workers
// ----

tView.setData([dynoRow]);

win.add(tView);

actInd.show();
heroku.info(comm.getLogin(), win.appName, function(result){
              actInd.hide();
              if(result != null){
                dynoNum.text = result.dynos;
              } else {
                alert('Failed to load data');
              }
            });
