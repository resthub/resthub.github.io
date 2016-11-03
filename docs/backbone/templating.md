---
layout: docs
title: Templating
permalink:  /docs/backbone/templating/
prev: backbone/resthub-view
next: backbone/pushstate
---

<div class="toc"></div>

{% raw %}

## Handlebars

Client-side templating capabilities are based by default on [Handlebars](http://handlebarsjs.com).

Templates are HTML fragments, without the `<html>`, `<header>` or `<body>` tag:

```html
<div class="todo {{#if done}}done{{/if}}">
    <div class="display">
        <input class="check" type="checkbox" {{#if done}}checked="checked"{{/if}}/>
        <div class="todo-content">{{content}}</div>
        <span class="todo-destroy"></span>
    </div>
    <div class="edit">
        <input class="todo-input" type="text" value="{{content}}" />
    </div>
</div>
```

## RequireJS Handlebars plugin

Templates are injected into Views by the **RequireJS Handlebars plugin**, based on RequireJS text plugin. 
This `hbs` plugin will automatically **retrieve and compile** your template. So it should be defined in your *main.js*:

```javascript
require.config({
    paths: {
        // ...
        text: 'lib/text',
        hbs: 'resthub/handlebars-require'
    }
});
```

Sample usage in a Backbone.js View:

```javascript
define(['jquery', 'resthub', 'hbs!template/todo'],function($, Resthub, todoTmpl) {
    var TodoView = Resthub.View.extend({

    //... is a list tag.
    tagName:  'li',

    // Resthub.View will automtically Handlebars template with model or collection set in the context
    template: todoTmpl;
});
```

## Helpers

Resthub provide some usefull **Handlebars helpers** included by default:

### ifinline

This helper provides a more fluent syntax for inline ifs, i.e. if embedded in quoted strings.

As with Handlebars `#if`, if its first argument returns `false`, `undefined`, `null`
or `[]` (a "falsy" value), `''` is returned, otherwise `returnVal` argument is rendered.

e.g:

```html
<div class='{{ifinline done "done"}}'>Issue number 1</div>
```

with the following context:

```javascript
{done:true}
```

will produce:

```html
<div class='done'>Issue number 1</div>
```

### unlessinline

Opposite of `ifinline` helper.

As with Handlebars `#unless`, if its first argument returns `false`, `undefined`, `null`
or `[]` (a "falsy" value), `returnVal` is returned, otherwise `''` argument is rendered.

e.g:

```html
<div class='{{unlessinline done "todo"}}'>Issue number 1</div>
```

with the following context:

```javascript
{done:false}
```

will produce:

```html
<div class='todo'>Issue number 1</div>
```

### ifequalsinline

This helper provides a if inline comparing two values.

If the two values are strictly equals (`===`) return the returnValue argument, `''` otherwise.

e.g:

```html
<div class='{{ifequalsinline type "details" "active"}}'>Details</div>
```

with the following context:

```javascript
{type:"details"}
```

will produce:

```html
<div class='active'>Details</div>
```

### unlessequalsinline

Opposite of ifequalsinline helper.

If the two values are not strictly equals (`!==`) return the returnValue  argument, `''` otherwise.

e.g:

```html
<div class='{{unlessequalsinline type "details" "active"}}'>Edit</div>
```

with the following context:

```javascript
{type:"edit"}
```

will produce:

```html
<div class='active'>Edit</div>
```

### ifequals

This helper provides a if comparing two values.

If only the two values are strictly equals (`===`) display the block

e.g:

```html
{{#ifequals type "details"}}
    <span>This is details page</span>
{{/ifequals}}
```

with the following context:

```javascript
{type:"details"}
```

will produce:

```html
<span>This is details page</span>
```

### unlessequals

Opposite of ifequals helper.

If only the two values are not strictly equals (`!==`) display the block

e.g:

```html
{{#unlessequals type "details"}}
    <span>This is not details page</span>
{{/unlessequals}}
```

with the following context:

```javascript
{type:"edit"}
```

will produce:

```html
<span>This is not details page</span>
```

### for

This helper provides a for i in range loop.

start and end parameters have to be integers >= 0 or their string representation. start should be <= end.
In all other cases, the block is not rendered.

e.g:

```html
<ul>
    {{#for 1 5}}
        <li><a href='?page={{this}}'>{{this}}</a></li>
    {{/for}}
</ul>
```

will produce:

```html
<ul>
    <li><a href='?page=1'>1</a></li>
    <li><a href='?page=2'>2</a></li>
    <li><a href='?page=3'>3</a></li>
    <li><a href='?page=4'>4</a></li>
    <li><a href='?page=5'>5</a></li>
</ul>
```

<a name="sprintf"></a>

### sprintf

This helper allows to use `sprintf` C like string formatting in your templates.
It is based on [Underscore String](https://github.com/epeli/underscore.string) implementation.
A detailed documentation is available [here](http://www.diveintojavascript.com/projects/javascript-sprintf).

e.g:

```html
<span>{{sprintf 'This is a %s' 'test'}}</span>
```

will produce:

```html
<span>This is a test</span>
```

This helper is very usefull for Internationalization_, and can take any number of parameters.

### modulo

This helper provides a modulo function.

If (n % m) equals 0 then the block is rendered, and if not, the else block is rendered if provided.

e.g:

```html
{{#modulo index 2}}
    <span>{{index}} is even</span>
{{else}}
    <span>{{index}} is odd</span>
{{/modulo}}
```

with the following context:

```javascript
{index:10}
```

will produce:

```html
<span>10 is even</span>
```

### formatDate

This helper provides a date formatting tool.
The date will be parsed with the inputPattern and then formatted with the outputPattern.

Parameters are:

* `date`: the date to parse and format
* `outputPattern`: the pattern used to display the date (optional)
* `inputPattern`: the pattern used to parse the date (optional)

`inputPattern` and `outputPattern` are optionals: the default pattern is `YYYY-MM-DD HH:mm:ss`

Full documentation about date format can be found [here](http://momentjs.com/docs/#/displaying/format/).

e.g:

```html
<span>{{formatDate myDate pattern}}</span>
```

with the following context:

```javascript
{ myDate: new Date(), pattern: '[today] MM/DD/YYYY' }
```

will produce:

```html
<span>today 10/24/2012</span>
```

and:

```html
<span>{{formatDate myDate outputPattern inputPattern}}</span>
```

with the following context:

```javascript
{ myDate: '2012/17/02 11h32', inputPattern: 'YYYY/DD/MM HH\\hmm', outputPattern: 'HH:mm, MM-DD-YYYY' }
```

will produce:

```html
<span>11:32, 02-17-2012</span>
```

{% endraw %}