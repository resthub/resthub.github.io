---
layout: docs
title: Backbone.js Stack
permalink:  layout/
prev: backbone
next: backbone/resthub-view
---

<div class="toc"></div>

## Directories and filename conventions

Here is the typical RESThub Backbone.js stack based application directories and filename layout:

```bash
/
├── img
├── css
│   ├── style.css
│   ├── bootstrap.css
│   ├── bootstrap-responsive.css
├── template
│   ├── project
│   │   ├── projects.hbs
│   │   └── project-edit.hbs
│   └── user
│       ├── users.hbs
│       └── user-edit.hbs
├── js
│   ├── lib
│   │   ├── async.js
│   │   ├── backbone.js
│   │   ├── ...
│   │   └── resthub
│   │       ├── backbone-resthub.js
│   │       ├── backbone-validation-ext.js
│   │       └── ...
│   ├── model
│   │   ├── user.js                    var User = Backbone.Model.extend(...); return User;
│   │   └── project.js                 var Project = Backbone.Model.extend(...); return Project;
│   ├── collection
│   │   ├── users.js                   var Users = Backbone.Collection.extend(...); return Users;
│   │   └── projects.js                var Projects = Backbone.Collection.extend(...); return Projects;
│   ├── view
│   │   ├── project
│   │   │   ├── projects-view.js      var ProjectsView = Resthub.View.extend(...); return ProjectsView;
│   │   │   └── project-edit-view.js  var ProjectEditView = Resthub.View.extend(...); return ProjectEditView;
│   │   └── user
│   │       ├── users-view.js          var UsersView = Resthub.View.extend(...); return UsersView;
│   │       └── user-edit-view.js      var UserEditView = Resthub.View.extend(...); return UserEditView;
│   ├── router
│   │   └── app-router.js              var AppRouter = Backbone.Router.extend(...); return AppRouter;
│   ├── app.js
│   └── main.js
└── index.html
```

## index.html

index.html is provided by RESThub Backbone stack, so you don't have to create it.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>RESThub Backbone.js Bootstrap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <link href="css/bootstrap.css" rel="stylesheet">

        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>

    <body>
        <div id="main"> </div>

        <!-- Placed at the end of the document so the pages would load faster -->
        <script data-main="js/main" src="js/lib/require.js"></script>
    </body>
</html>
```

## main.js

This application bootstrap file is main.js located at your webapp root (usually *src/main/webapp*).
The goal of this file is mainly to intialize require.js configuration. Your application code should not be here but in app.js
(automatically loaded by main.js) in order to allow easy Backbone stack updates.

Here's the [default main.js file](https://github.com/resthub/resthub-backbone-stack/blob/master/js/main.js).

**shim** config is part of [Require {{site.requirejs-version}}](http://requirejs.org/docs/api.html) and
allows to *Configure the dependencies and exports for older, traditional "browser globals" scripts that do not use `define()`
to declare the dependencies and set a module value. See [here](http://requirejs.org/docs/api.html#config-shim) for more details.

**path** config is also part of [Require {{site.requirejs-version}}](http://requirejs.org/docs/api.html) and allows to define
paths for libs not found directly under baseUrl. See [here](http://requirejs.org/docs/api.html#config-paths) for details.

RESThub suggests to **preload some libs** that will be used for sure as soon the app starts (dependencies required by
Backbone itself and our template engine). This mechanism also allows us to load other linked libs transparently without
having to define it repeatedly (e.g. [documentation](https://github.com/epeli/underscore.string#readme)
loading - this libs is strongly correlated to [underscore](http://documentcloud.github.com/underscore/) -
and merged with it and thus should not have to be defined anymore)

## app.js

app.js is where your application begins. You should customize it in order to initialize your routers and/or views.

Here's the default `app.js` file:

```javascript
define(['router/app-router'], function(AppRouter) {
    new AppRouter();
    // ...
});
```