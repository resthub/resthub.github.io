---
layout: post
title: Backbone Stack 2.1.0 released
author: sdeleuze
categories: [release]
tags: [backbone]
version: Backbone stack 2.1.0
published: true
---

## Upgrade from 2.0.0

Following libraries updated and may lead to some minor incompatibility, most significant ones are detailed bellow :

* Backbone 0.9.2 to 0.9.10 ([Upgrade guide](http://backbonejs.org/#upgrading))
    * `View.dispose()` has been replaced by `View.stopListening()`
    * You should use `listenTo()` and `stopListening()` instead of `on()` and `off()` since they allow automatic event cleanup when the view is destroyed
    * Model validation is now only enforced by default in `Model#save` and no longer enforced by default upon construction or in `Model#set`, unless the `{validate:true}` option is passed.
    * PubSub has been removed and replaced by using directly Backbone, which now extends Events so it can be used as a global event bus
* jQuery 1.8.2 to 1.9.1 ([Upgrade guide](http://jquery.com/upgrade-guide/1.9/))
* Bootstrap 2.1.1 to 2.3 ([Blog post](http://blog.getbootstrap.com/2013/02/07/bootstrap-2-3-released/))
* Underscore 1.3.3 to 1.4.4 ([Changelog](http://underscorejs.org/#changelog))
* RequireJS 2.0.6 to 2.1.4 ([Blog posts](http://jrburke.com/tags/requirejs/))

## New features and fixes

* Cache buster when using IE in order to avoid lot of bugs caused by IE aggressive caching strategy
* Fix IE7 and IE8 compatibility
* Get model validation constraints from server (see [here](https://https://github.com/resthub/resthub-spring-stack#165) and translate these
  constraints to effective client Backbone Validation constraints.
