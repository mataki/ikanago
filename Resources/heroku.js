exports.login = function(email, password, callback){
  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 10000000;
  xhr.onload = function(){
    Ti.API.debug('Login success!');
    var result = JSON.parse(this.responseText);
    callback.call(this, true, {email: result.email, apiKey: result.api_key});
  };
  xhr.onerror = function(){
    Ti.API.debug('Login fail');
    callback.call(this, false);
  };

  xhr.open('POST', 'https://api.heroku.com/login');
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.send(JSON.stringify({username: email, password: password}));
};

exports.list = function(login, callback){
  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 10000000;
  xhr.onload = function(){
    Ti.API.debug("Success to get apps.");
    var result = JSON.parse(this.responseText);
    callback.call(this, result);
  };
  xhr.onerror = function(){
    Ti.API.debug("Failed to get apps.");
    callback.call(this);
  };
  xhr.open('GET', 'https://api.heroku.com/apps');

  var authstr = 'Basic ' +Titanium.Utils.base64encode(login.email+':'+login.apiKey);
  xhr.setRequestHeader('Authorization', authstr);

  xhr.setRequestHeader('X-Heroku-API-Version', '2');
  xhr.setRequestHeader("Content-Type","application/json");

  xhr.send();
};

exports.restart = function(login, appName, callback){
  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;
  xhr.onload = function(){
    Ti.API.debug("Success to restart");
    Ti.API.debug(this.responseText);
    callback.call(this, true);
  };
  xhr.onerror = function(){
    Ti.API.debug("Failed to restart");
    Ti.API.debug(this.responseText);
    callback.call(this, false);
  };

  Ti.API.debug("URL: " + 'https://api.heroku.com/apps/' + appName + "/server");
  xhr.open('DELETE', 'https://api.heroku.com/apps/' + appName + "/server");

  var authstr = 'Basic ' +Titanium.Utils.base64encode(login.email+':'+login.apiKey);
  xhr.setRequestHeader('Authorization', authstr);

  xhr.setRequestHeader('X-Heroku-API-Version', '2');
  xhr.setRequestHeader("Content-Type","application/json");

  xhr.send();
};