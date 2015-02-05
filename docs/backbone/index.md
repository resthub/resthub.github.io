---
layout: docs
title: Backbone.js Stack
permalink:  /
prev: spring/tutorial
next: backbone/layout
---

<div class="toc"></div>

## Presentation

RESThub Backbone stack provides a client-side full stack and guidelines for building enterprise grade HTML5 applications. 
It could be used with any server backend: Ruby, PHP, NodeJS, JEE, Spring, Grails ...

In addition to the existing libraries included in the stack, it provides additional functionalities (mainly Backbone.js addons)
designed to allow you to build a real enterprise grade application, and described in this documentation.

The Backbone.js 2.1.2 stack includes the following libraries:

* jQuery {{site.jquery-version}} ([documentation](http://docs.jquery.com/Main_Page))
* Backbone.js {{site.backbone-version}} ([documentation](http://documentcloud.github.com/backbone/)) and its [localstorage adapter]
  (http://documentcloud.github.com/backbone/docs/backbone-localstorage.html)
* Underscore.js {{site.underscore-version}} ([documentation](http://documentcloud.github.com/underscore/))
* Underscore.String {{site.underscore-string-version}} ([documentation](https://github.com/epeli/underscore.string#readme))
* Require.js {{site.requirejs-version}} with [i18n](http://requirejs.org/docs/api.html#i18n) and [text](http://requirejs.org/docs/api.html#text) plugins
  ([documentation](http://requirejs.org/docs/api.html))
* Handlebars {{site.handlebars-version}} ([documentation](http://handlebarsjs.com))
* A console shim + client logging to server mechanism
* Twitter Bootstrap {{site.bootstrap-version}} ([documentation](http://getbootstrap.com/{{site.bootstrap-version}}/)) and its JS plugins
* Form Validation: [Backbone Validation {{site.backbone-validation-version}}](http://github.com/thedersen/backbone.validation)
* Parameters support on view routing: [Backbone Query Parameters {{site.backbone-query-parameters-version}}](http://github.com/jhudson8/backbone-query-parameters)
* Datagrid: [Backbone Datagrid {{site.backbone-datagrid-version}}](http://loicfrering.github.com/backbone.datagrid/)
* Paginated lists: [Backbone Paginator {{site.backbone-paginator-version}}](http://addyosmani.github.com/backbone.paginator/)
* Asynchronous calls: [Async](http://github.com/caolan/async/)
* Dispatching keyboard shortcuts: [Keymaster](http://gobby/keymasterithub.com/madr)
* Get and set relations (one-to-one, one-to-many, many-to-one) for Backbone models: [Backbone Associations {{site.backbone-associations-version}}](http://dhruvaray.github.io/backbone-associations/)
* Parsing, validating, manipulating, and formatting dates: [Moment {{site.momentjs-version}}](http://momentjs.com/)

You can find more details and explanation about these libraries and their usage in resthub [here](/docs/backbone/third-party).

Before going deeper in the RESThub Backbone stack, you should read the great documentation
[Developing Backbone.js Applications](http://addyosmani.github.com/backbone-fundamentals/) by [@addyosmani](https://twitter.com/addyosmani),
it is a great introduction to pure Backbone.js.

## Versions & Changelogs

Backbone Stack current version is **{{site.backbone-stack-version}}**.

You can find RESThub Backbone Stack release changelogs [here](/news/releases)

## Bootstrap your project

There are 2 ways to use it in your project:

* If you are starting a new RESThub Spring + Backbone stack project, the better way to use it is to use one of the Backbone.js webappp
  Maven Archetypes described [here](/docs/spring/bootstrap)
* You can simply download latest RESThub Backbone.js stack, and extract it at the root of your webapp:
  * [current development version](https://github.com/resthub/resthub-backbone-stack/archive/master.zip)
  * [latest RESThub Backbone.js stack release](https://github.com/resthub/resthub-backbone-stack/archive/resthub-backbone-stack-{{site.backbone-stack-version}}.zip)

The [Todo RESThub example](https://github.com/resthub/todo-backbone-example) project is the reference example project using this stack.

## Tutorial

You should follow RESThub Backbone Stack tutorial in order to learn step by step how to use it. Available with or without answers :
[here](/docs/backbone/tutorial)