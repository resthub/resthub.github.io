---
layout: docs
title: Resthub.View
permalink:  resthub-view/
prev: backbone/layout
next: backbone/templating
---

<div class="toc"></div>

{% raw %}

RESThub Backbone stack provides an enhanced Backbone View named `Resthub.View` with the following behaviour:

* Default `render()` with root and context attributes
* Automatic view `dispose` + callbacks `unbind` when a view is removed from DOM
* View model population from a form

<a name="default-render"></a>

## Default render() with root and context attributes

Backbone views contain an `$el` attribute representing the element (a div by default) in which the template will be rendered,
but it does not provide any attribute representing the DOM element in which the view will be attached.

In order to follow separation of concerns and encapsulation principles, RESThub Backbone stack manages a
`$root` element in which the view will be attached. You should always pass it as constructor parameter,
so as to avoid hardcoding view root elements. Like `el`, `model` or `collection`, it will be automatically as view attributes.

```javascript
new MyView({root: this.$('.container'), collection: myCollection});
```

In this example, we create the MyView view and attach it to the `.container` DOM element of the parent view.
You can also pass a String selector parameter.

```javascript
new MyView({root: '#container', collection: myCollection});
```

RESThub provides a default implementation that will render your template with `model`, `collection` and `labels` as
template attributes context if these properties are defined.

```javascript
define(['underscore', 'resthub', 'hbs!template/my'], function(_, Resthub, myTemplate){
    var MyView = Resthub.View.extend({

        template: myTemplate,

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
        }
    });
});
```

A sample template with automatic collection provisioning:

```html
<ul>
    {{#each collection}}
    <li>{{this.firstname}} {{this.name}}</li>
    {{/each}}
</ul>
```

Or with automatic model and labels provisioning:

```html
<p>{{labels.user.identity}}: {{model.firstname}} {{model.name}}</li>
```

After instantiation, `this.$root` contains a cached jQuery element and `this.root` the DOM element.
By default, when `render()` is called, Backbone stack empties the `root` element, and adds `el` to the `root` as a child element.
You can change this behaviour with the `strategy` parameter that could have following values:

* `replace`: replace the content of `$root` with `$el` view content
* `append`: append the content of `$el` at the end of `$root`
* `prepend`: prepend the content of `$el` at the beginning of `$root`

```javascript
var MyView = Resthub.View.extend({

    template: myTemplate,
    tagName:  'li',
    strategy: 'append'
});
```

You can customize the rendering context by defining a context property:

```javascript
var MyView = Resthub.View.extend({

    template: myTemplate,

    context: {
        numberOfElemnts: 42,
        collection: this.collection
    }
});
```

Or by passing a function if you need dynamic context:

```javascript
var MyView = Resthub.View.extend({

    template: myTemplate,
    labels: myLabels,

    context: function() {
        var done = this.collection.done().length;
        var remaining = this.collection.remaining().length;
        return {
            total:      this.collection.length,
            done:       done,
            remaining:  remaining,
            labels:   this.labels
        };
    }
});
```

Or by passing the context as a render parameter when you call it explicitly:

```javascript
this.render({messages: messages, collection: this.collection});
```

If you need to customize the `render()` function, you can replace or extend it.
Here is an example about how to extend it. This sample calls the default render method and adds children elements:

```javascript
var MyView = Resthub.View.extend({

    render: function() {
        // Call super render function with the same arguments
        MyView.__super__.render.apply(this, arguments);
        // Add child views
        this.collection.each(function(child) {
            this.add(child);
        }, this);
    },
    add: function(todo) {
        var childView = new ChildView({
            model: child,
            root: this.$('.childcontainer')
        });
    }
});
```
<br/>

## Automatic view dispose + callbacks unbind

RESThub offers an extension to this mechanism that listens on any removal in the `view.el`
DOM element and **automatically calls `stopListening()` on remove**. This means that you don't have to manage this
workflow anymore and any replacement done in `el` parent will trigger a dispose call.

i.e.: each time a jQuery `.html(something)`, `.remove()` or `.empty()` is performed on view `el` parent or each
time a `remove()` is done on the `el` itself, **the view will be properly destroyed**.

<div class="alert alert-warning">
    Since Backbone 0.9.10 (included in RESThub Backbone stack since 2.1), you should use listenTo() and stopListening()
    instead of on() and off(), since it will allow Backbone.js to manage properly event listener cleanup.
</div>

<a name="view-model-population"></a>

## View model population from a form

[Backbone Validation {{site.backbone-validation-version}}](http://github.com/thedersen/backbone.validation)
provides some helpers to validate a model against constraints. [Backbone](http://documentcloud.github.com/backbone/) defines
some methods (such as `save`) to validate a model and then save it on the server. But neither
[Backbone Validation {{site.backbone-validation-version}}](http://github.com/thedersen/backbone.validation)  nor
[Backbone](http://documentcloud.github.com/backbone/) allow to fill a model stored in a view with form values.

RESThub comes with a really simple `Backbone.View` extension that copies each input field of a given form in a model.
This helper is a new View method called `populateModel()`. This function has to be explicitly called (e.g. before a `save()`):

```javascript
Resthub.View.extend({

    ...

    saveUser:function () {
        this.populateModel();

        // save model if it's valid, display alert otherwise
        if (this.model.isValid()) {
            this.model.save(null, {
                success:this.onSaveSuccess.bind(this),
                error:this.onSaveError.bind(this)
            });
        }
    }
});
```

`populateModel` searches for the form element provided and copies each form input value into the given model
(matching the form input name to an model attribute name). API is:

```javascript
/** utility method providing a default and basic handler that
 * populates model from a form input
 *
 * @param form form element to 'parse'. Form parameter could be a css selector or a
 * jQuery element. If undefined, the first form of this view el is used.
 * @param model model instance to populate. If no model instance is provided,
 * search for 'this.model'
 */
populateModel:function (form, model);
```

So you can use it in multiple ways from your view:

```javascript
// take the first el form element and copy values into 'this.model' instance
this.populateModel();

// get the form element matching the provided selector (form with id "myForm") and copy values into 'this.model' instance
this.populateModel("#myForm");

// get the provided jquery form element and copy values into 'this.model' instance
this.populateModel(this.$("#myForm");

// take the first el form element and copy values into provided myModel instance
this.populateModel(null, myModel);

// get the form element matching the provided selector (form with id "myForm") and copy values into provided myModel instance
this.populateModel("#myForm", myModel);

// get the provided jquery form element and copy values into provided myModel instance
this.populateModel(this.$("#myForm"), myModel);
```

As said before, this approach could appear naive but will probably fit your needs in most cases. If not,
you are free not to use this helper, to extend this method, globally or locally with your own logic or to use a third
party lib to bind model and form (see [Backbone.ModelBinder](http://github.com/theironcook/Backbone.ModelBinder)
or [Rivets.js](http://rivetsjs.com/) for instance).

{% endraw %}