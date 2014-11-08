---
layout: docs
title: Guidelines
permalink:  guidelines/
prev: backbone/third-party
next: backbone/tutorial
---

<div class="toc"></div>

{% raw %}

## Collection View

If you need to render a simple list of elements, just make a single view with an each loop in the template:

```html
<h1>My TodoList</h1>
<ul>
    {{#each this}}
        <li>{{title}}</li>
    {{/each}}
</ul>
```

But if each element of your collection requires a separate view (typically when you listen on some events on it or if it contains a form), 
in order to comply with separation of concerns and encapsulation principles, you should create separate views for the collection and the model. 
The model view should be able to render itself.

You can see more details on the [Todo example](https://github.com/resthub/todo-backbone-example) (have a look to TodosView and TodoView).

## Always use listenTo instead of on

In order to allow automatic cleanup when the View is removed, you should always use listenTo function instead of on

```javascript
// BAD: no context specified - event bindings won't be cleaned when the view is removed
Todos.on('sync', this.render);

// GOOD: context will allow automatic cleanup when the view is removed
this.listenTo(Todos, 'sync', this.render);
```

## Static versus instance variables

If you want to create different View instances, you have to manage properly the DOM element where the view will be attached as
described previously. You also have to use instance variables.

Backbone way of declaring a static color variable:

```javascript
var MyView = Resthub.View.extend({

    color: '#FF0000',

    initialize: function(options) {
        this.$root = options.root;
        this.$root.html(this.$el);
    }
});

return MyView;
```

Backbone way of declaring an instance color variable:

```javascript
var MyView = Resthub.View.extend({

    initialize: function(options) {
        this.$root = options.root;
        this.$root.html(this.$el);

        this.color = '#FF0000';
    }
});

return MyView;
```

## Use this.$() selector

`this.$()` is a shortcut for `this.$el.find()`. You should use it for all your view DOM selector code in order to find elements
within your view (i.e. not in the whole page). It follows the encapsulation pattern, and will make it possible to have several
instances of your view on the same page. Even with a singleton view, it is a good practice to use this pattern.

## Events

Backbone default event list is available [here](http://backbonejs.org/#Events-catalog).

## Inheritance

As described by [@k33g](https://twitter.com/#!/k33g_org) on his [Gist Use Object Model of BackBone](https://gist.github.com/2287018),
it is possible to reuse Backbone.js `extend()` function in order to get simple inheritance in Javascript.

```javascript
// Define an example Kind class
var Kind = function() {
    this.initialize && this.initialize.apply(this, arguments);
};
Kind.extend = Backbone.Model.extend;

// Create a Human class by extending Kind
var Human = Kind.extend({
    toString: function() { console.log("hello: ", this); },
    initialize: function (name) {
        console.log("human constructor");
        this.name = name
    }
});

// Call parent constructor
var SomeOne = Human.extend({
    initialize: function(name){
        SomeOne.__super__.initialize.call(this, name);
    }
});

// Create an instance of Human class
var Bob = new Human("Bob");
Bob.toString();

// Create an instance of SomeOne class
var Sam = new SomeOne("Sam");
Sam.toString();

// Static members
var Human = Kind.extend({
    toString: function() { console.log("hello: ", this); },
    initialize: function (name) {
        console.log("human constructor");
        this.name = name
    }
},{ //Static
    counter: 0,
    getCounter: function() { return this.counter; }
});
```

## Cache buster

In order to avoid caching issues when updating your JS or HTML files, you should use the
[urlArgs RequireJS attribute](http://requirejs.org/docs/api.html#config). You can filter the `${buildNumber}` with your build tool at each build.

main.js:

```javascript
require.config({
    paths: {
        // ...
    },
    urlArgs: 'appversion=${buildNumber}''
});
```

main.js after filtering:

```javascript
require.config({
    paths: {
        // ...
    },
    urlArgs: 'appversion=738792920293847'
});
```

In order to avoid bugs (like no change displayed after an update) due to Internet Explorer aggressive caching strategy,
Ajax request cache is disable at jQuery level when using IE.

{% endraw %}