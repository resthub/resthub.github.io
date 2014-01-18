---
layout: docs
title: Logging
permalink:  logging/
prev: backbone/internationalization
next: backbone/validation
---

RESThub Backbone stack include a console.js implementation responsible for

* Creating console.* functions if they do not exists (old IE versions)
* Optionnaly sending logs to the server, in order to make JS error tracking and debugging easier

In order to send logs to the server, import console.js in your main.js (already done by default):

```javascript
// Load our app module and pass it to our definition function
require(['console', 'app']);
```

In your app.js, you can define different console.level values, which define what log level will be sent to the server:

```javascript
console.level = 'off';   // Default, no log are sent to the server
console.level = 'debug'; // debug, info, warn and error logs are sent to the server
console.level = 'info';  // info, warn and error logs are sent to the server
console.level = 'warn';  // warn and error logs are sent to the server
console.level = 'error'; // error logs are sent to the server
```

Javascript syntax error are also sent to the server with an error log level.

You can customize the log server url:

```javascript
console.serverUrl = 'api/log'; // Default value
```

Log are sent thanks a POST request with the following JSON body:

```javascript
{"level":"warn","message":"log message","time":"2012-11-13T08:18:52.972Z"}
```

RESThub web server provide a builtin implementation of the server-side logging webservice, see the
[related documentation](/docs/spring/web-server/#client-logging) for more details.
  
## Message bus

Since backbone now extends Events, you can use it as a message bus for your global events.
In order to facilitate global events usage in Backbone Views, RESThub provides some syntactic sugar in `Resthub.View`.

Backbone Views events hash parsing has been extended to be capable of declaring global events as it is already done
for DOM events binding. To declare such global events in your Backbone View, you only have to add it in events hash:

```javascript
events:{
    // regular DOM event bindings
    "click #btn1":"buttonClicked",
    "click #btn2":"buttonClicked",
    // global events
    "!global":"globalFired",
    "!global1":"globalFired",
    "!globalParams":"globalFiredParams"
},

Please note that it is mandatory to prefix your global events with `!` to differentiate them from DOM events.
Under the cover, `listenTo()` and `stopListening()` are used so events cleanup will be done automatically by the view.