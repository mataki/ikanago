var loginFileName = 'login.txt';

var getLoginFile = function(){
  var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, loginFileName);
  return file;
};

exports.storeLogin = function(login){
  if(!login.email || !login.apiKey){
    return;
  }
  Ti.App.login = login;
  var json = JSON.stringify(login);
  var file = getLoginFile();
  file.write(json);
};

exports.restoreLogin = function(){
  var login = Ti.App.login;
  if(login && login.apiKey){
    return login;
  }

  var file  = getLoginFile();
  if(file.exists()){
    var json = file.read();
    if ( !json || json.length <= 0) {
      return null;
    }
    var data = JSON.parse(json.text);
    return data;
  } else {
    return null;
  }
};

exports.removeLogin = function(){
  var file = getLoginFile();
  if(file.exists()){
    file.deleteFile();
  }
  Ti.App.login = null;
};
