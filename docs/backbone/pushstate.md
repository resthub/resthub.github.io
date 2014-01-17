---
layout: docs
title: Backbone effective pushState extension
permalink:  pushstate/
prev: backbone/templating
next: backbone/internationalization
---

[Backbone](http://documentcloud.github.com/backbone/) allows `pushState` activation that permits usage of real URLs instead
of `#` anchors. PushState offers a better navigation experience, better indexation and search engine ranking:

```javascript
Backbone.history.start({pushState:true, root:"/"});
```

The `root` option defines the path context of our [Backbone](http://documentcloud.github.com/backbone/) application;

However, [Backbone](http://documentcloud.github.com/backbone/) stops here. Direct access to views by URL works fine but,
each link leads to **a full reload**! [Backbone](http://documentcloud.github.com/backbone/) does not intercept html links events
and it is necessary to implement it ourselves.

[Tim Branyen](https://twitter.com/tbranyen), the creator of [Backbone boilerplate](http://github.com/tbranyen/backbone-boilerplate)
shares the following solution that RESThub integrates in its extensions with an additional test to check pushState activation.

If `Backbone.history` is started with the `pushState` option, **any click on a link will be intercepted and bound to a Backbone
navigation instead**. If you want to provide **external links**, you only have to use the `data-bypass` attribute:

```html
<a data-bypass href="http://github.com/bmeurant/tournament-front" target="_blank">
```