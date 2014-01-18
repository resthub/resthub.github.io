---
layout: docs
title: Internationalization
permalink:  internationalization/
prev: backbone/pushstate
next: backbone/logging
---

<div class="toc"></div>

You should never use directly labels or texts in your source files. All labels should be externalized in order to prepare your 
application for internationalization. Doing such thing is pretty simple with RESThub Backbone.js stack thanks
to [requireJS i18n plugin](http://requirejs.org/docs/api.html#i18n).

Please find below the steps needed to internationalize your application.

## Configure i18n plugin

In your main.js file you should define a shortcut path for i18n plugin and the default language for your application:

```javascript
require.config({
    paths: {
        // ...
        i18n: "lib/i18n"
    },
    locale: localStorage.getItem('locale') || 'en-us'
});
```

## Define labels

Create a labels.js file in the js/nls directory, it will contain labels in the default locale used by your application.
You can change labels.js to another name (messages.js or functionality related name like user.js or product.js),
but js/nls is the default location.

Sample js/nls/labels.js file:

```javascript
define({
    // root is mandatory.
    'root': {
        'titles': {
            'login': 'Login'
        }
    },
    "fr-fr": true
});
```

Add translations in subfolders named with the locale, for instance js/nls/fr-fr ...
You should always keep the same file name, and the file located at the root will be used by default.

Sample js/nls/fr-fr/labels.js file:

```javascript
define({
    'titles': {
        'login': 'Connexion'
    }
});
```

## Use it

Add a dependency in the js, typically a View, where you'll need labels. You'll absolutely need to give a scoped variable to the result (in this example `myLabels`, but you can choose the one you want).

Prepending 'i18n!' before the file path in the dependency indicates RequireJS to get the file related to the current locale:

```javascript
define(['i18n!nls/labels'], function(myLabels) {
    // ...

    labels: myLabels,

    // ...
});
```

In your html template:

```html
<div class="title">
    <h1>{{"{{labels.titles.login"}}}}</h1>
</div>
```

## Change locale

Changing locale require a page reloading, so it is usually implemented with a Backbone.js router configuration
like the following one:

```javascript
define(['backbone'], function(Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'fr': 'fr',
            'en': 'en'
        },
        fr: function( ){
            var locale = localStorage.getItem('locale');
            if(locale != 'fr-fr') {
                localStorage.setItem('locale', 'fr-fr');
                location.reload();
            }
        },
        en: function( ){
            var locale = localStorage.getItem('locale');
            if(locale != 'en-us') {
                localStorage.setItem('locale', 'en-us');
                location.reload();
            }
        }
    });

    return AppRouter;
});
```

## sprintf

Internationalization can sometimes be tricky since words are not always in the same order depending on the language.
To make your life easier, RESThub backbone stack includes Underscore.String. It contains a sprintf function that you
can use for your translations.

You can use the `_.sprintf()` function and our `sprintf` handlebars helper to have substitutions in your labels.

labels.js

```javascript
'root': {
    'clearitem': "Clear the completed item",
    'clearitems': 'Clear %s completed items',
}
```

RESThub also provides a `sprintf` handlebars helper to use directly in your
templates (cf. [here](/docs/backbone/templating#sprintf)):

```html
{{"{{#ifequals done 1"}}}} {{"{{messages.clearitem"}}}} {{"{{else"}}}} {{"{{sprintf messages.clearitems done"}}}} {{"{{/ifequals"}}}}
```