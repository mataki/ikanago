var client = function(method, path, options){
  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;

  var onloadCallback = options.onloadCallback;
  xhr.onload = function(){
    Ti.API.debug("Success to request");
    // Ti.API.debug(this.responseText);

    if(onloadCallback){
      onloadCallback.call(this);
    }
  };

  var onerrorCallback = options.onerrorCallback;
  xhr.onerror = function(){
    Ti.API.debug("Failed to request");
    Ti.API.debug(this.responseText);

    if(onerrorCallback){
      onerrorCallback.call(this);
    }
  };

  Ti.API.debug("METHOD: " + method + ' / URL: https://api.heroku.com' + path);
  xhr.open(method, 'https://api.heroku.com' + path);

  var login = options.login;
  if(login){
    var authstr = 'Basic ' + Ti.Utils.base64encode(login.email+':'+login.apiKey);
    xhr.setRequestHeader('Authorization', authstr);
  }

  xhr.setRequestHeader('X-Heroku-API-Version', '2');
  xhr.setRequestHeader("Content-Type","application/json");

  var postBody = options.postBody;
  if(postBody){
    xhr.send(JSON.stringify(postBody));
  } else {
    xhr.send();
  }
};

exports.login = function(email, password, callback){
  client('POST', "/login", {
           onloadCallback: function(){
             var result = JSON.parse(this.responseText);
             callback.call(this, true, {email: result.email, apiKey: result.api_key});
           },
           onerrorCallback: function(){
             callback.call(this, false);
           },
           postBody: {username: email, password: password}
         });
};

exports.list = function(login, callback){
  client('GET', "/apps", {
           onloadCallback: function(){
             var result = JSON.parse(this.responseText);
             callback.call(this, result);
           },
           onerrorCallback: function(){
             callback.call(this, false);
           },
           login: login
         });
};


exports.restart = function(login, appName, callback){
  var path = '/apps/' + appName + '/server';
  client('DELETE', path, {
           onloadCallback: function(){
             callback.call(this, true);
           },
           onerrorCallback: function(){
             callback.call(this, false);
           },
           login: login
         });
};
