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
  var contentType = options.contentType;
  xhr.setRequestHeader("Content-Type", (contentType == null) ? "application/json" : contentType);

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

exports.maintenance = function(login, appName, status, callback){
  var path = "/apps/" + appName + "/server/maintenance";
  var mode = status == true ? '1' : '0';
  client('POST', path, {
    onloadCallback: function(){
      callback.call(this, true);
    },
    onerrorCallback: function(){
      callback.call(this, false);
    },
    login: login,
    postBody: {maintenance_mode: mode}
  });
};

exports.info = function(login, appName, callback){
  var path = "/apps/" + appName;
  client('GET', path, {
    onloadCallback: function(){
      var doc = this.responseXML.documentElement,
      dynos = doc.getElementsByTagName('dynos').item(0).text,
      workers = doc.getElementsByTagName('workers').item(0).text,
      stack = doc.getElementsByTagName('stack').item(0).text,
      repo = doc.getElementsByTagName('repo-size').item(0).text,
      slug = doc.getElementsByTagName('slug-size').item(0).text,
      data = doc.getElementsByTagName('database_size').item(0).text,
      appUrl = doc.getElementsByTagName('web_url').item(0).text,
      gitUrl = doc.getElementsByTagName('git_url').item(0).text;

      callback.call(this, {
        dynos: dynos,
        workers: workers,
        stack: stack,
        repo: repo,
        slug: slug,
        data: data,
        appUrl: appUrl,
        gitUrl: gitUrl
      });
    },
    onerrorCallback: function(){
      Ti.API.debug(this.responseText);
      callback.call(this, null);
    },
    login: login,
    contentType: "application/xml"
  });
};

var updateDynosOrWorkers = function(login, path, qty, callback){
  client("PUT", path, {
    onloadCallback: function(){
      var result = this.responseText;
      Ti.API.debug("Update dynos or workers: " + result);
      callback.call(this, result);
    },
    onerrorCallback: function(){
      Ti.API.debug(this.responseText);
      callback.call(this, null);
    },
    login: login,
    postBody: {dynos: qty}
  });
};

exports.setDynos = function(login, appName, qty, callback){
  var path = "/apps/" + appName + "/dynos";
  updateDynosOrWorkers(login, path, qty, callback);
};

exports.setWorkers = function(login, appName, qty, callback){
  var path = "/apps/" + appName + "/workers";
  updateDynosOrWorkers(login, path, qty, callback);
};

exports.addons = function(login, appName, callback){
  var path = "/apps/" + appName + "/addons";
  client('GET', path, {
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

exports.collaborators = function(login, appName, callback){
  var path = "/apps/" + appName + "/collaborators";
  client('GET', path, {
    onloadCallback: function(){
      var doc = this.responseXML.documentElement,
      email_nodes = doc.getElementsByTagName('email'),
      emails = [];

      for(var i=0; i<email_nodes.length; i++){
        emails.push(email_nodes.item(i).text);
      }

      callback.call(this, emails);
    },
    onerrorCallback: function(){
      callback.call(this, false);
    },
    login: login,
    contentType: "application/xml"
  });
};

exports.logs = function(login, appName, callback){
  var path = "/apps/" + appName + "/logs";
  client('GET', path, {
    onloadCallback: function(){
      var result = this.responseText;
      callback.call(this, result);
    },
    onerrorCallback: function(){
      callback.call(this, false);
    },
    login: login
  });
};

exports.cronLogs = function(login, appName, callback){
  var path = "/apps/" + appName + "/cron_logs";
  client('GET', path, {
    onloadCallback: function(){
      var result = this.responseText;
      callback.call(this, result);
    },
    onerrorCallback: function(){
      callback.call(this, false);
    },
    login: login
  });
};

exports.configVars = function(login, appName, callback){
  var path = "/apps/" + appName + "/config_vars";
  client('GET', path, {
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
