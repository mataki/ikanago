var loginFileName = 'login.txt';

var getLoginFile = function(){
  var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, loginFileName);
  return file;
};

exports.storeLogin = function(login){
  // Ti.API.debug('Set login / email:' + login.email + " apiKey:" + login.apiKey);
  if(!login.email || !login.apiKey){
    return;
  }
  Ti.App.login = login;
  var json = JSON.stringify(login);
  var file = getLoginFile();
  file.write(json);
};

exports.getLogin = function(){
  var login = Ti.App.login;
  if(login && login.apiKey){
    // Ti.API.debug("Get login from App");
    return login;
  }

  var file  = getLoginFile();
  if(file.exists()){
    // Ti.API.debug("File is exists");
    var json = file.read();
    // Ti.API.debug("[File]" + json);
    if ( !json || json.length <= 0) {
      // Ti.API.debug('Return login as null, because file is blank.');
      return null;
    }
    var data = JSON.parse(json.text);
    // Ti.API.debug('Get login from file');
    return data;
  } else {
    // Ti.API.debug('Get login as null, because file is not exists.');
    return null;
  }
};

exports.removeLogin = function(){
  var file = getLoginFile();
  if(file.exists()){
    file.deleteFile();
  }
};
