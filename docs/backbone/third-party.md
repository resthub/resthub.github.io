---
layout: docs
title: Third party libraries
permalink:  third-party/
prev: backbone/validation
next: backbone/guidelines
---

<div class="toc"></div>

<a name="backbone-validation"></a>

{% raw %}

## Backbone Validation

[Backbone](http://documentcloud.github.com/backbone/) does not provide natively **any tool for form or validation management**. 
It is not necessary to specify model attributes or related constraints.

In terms of validation, [Backbone](http://documentcloud.github.com/backbone/) provides only empty methods `validate` and `isValid` 
that have to be implemented by each developer. 

The only guarantee that the `validate` method is called before a `save` (canceled on error). But a complete form validation is 
not obvious (custom error array management ... ) and the errors are not distinguishable from inherent `save` errors 
(server communication and so on).

[Backbone Validation](http://github.com/thedersen/backbone.validation) 
**only focus on validation aspects** and leaves us free to write our form. The lib has **a very large number of built-in 
validators** and **provides effective validators customization and extension mechanisms**.

[Backbone Validation](http://github.com/thedersen/backbone.validation) does not neither propose 
automatic linking between form and model and leaves us the choice to use a dedicated lib or 
to implement custom behaviour (before the validation, process all form values to set to model). The behaviour of 
[Backbone Validation](http://github.com/thedersen/backbone.validation) perfectly matches standard
[Backbone](http://documentcloud.github.com/backbone/) workflow through `validate` and `isValid` methods.

**Model: constraints definition:**

```javascript
define(['underscore', 'backbone'], function (_, Backbone) {

    /**
     * Definition of a Participant model object
     */
    var ParticipantModel = Backbone.Model.extend({
        urlRoot:App.Config.serverRootURL + "/participant",
        defaults:{
        },

        // Defines validation options (see Backbone-Validation)
        validation:{
            firstname:{
                required:true
            },
            lastname:{
                required:true
            },
            email:{
                required:false,
                pattern:'email'
            }
        },

        initialize:function () {
        }

    });
    return ParticipantModel;

});
```

**HTML5 Form:**

```html
{{#with participant}}
    <form class="form-horizontal">
        <fieldset>
            <div class="row">
                <div class="span8">
                    <div class="control-group">
                        {{#if id}}
                            <label for="participantId" class="control-label">Id:</label>
                            <div class="controls">
                                <input id="participantId" name="id" type="text" value="{{id}}" disabled/>
                            </div>
                        {{/if}}
                    </div>

                    <div class="control-group">
                        <label for="firstname" class="control-label">First name:</label>
                        <div class="controls">
                            <input type="text" id="firstname" name="firstname" required="true" value="{{firstname}}" tabindex="1" autofocus="autofocus"/>
                            <span class="help-inline"></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label for="lastname" class="control-label">Last name:</label>
                        <div class="controls">
                            <input type="text" id="lastname" name="lastname" required="true" value="{{lastname}}" tabindex="2"/>
                            <span class="help-inline"></span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label for="email" class="control-label">email address:</label>
                        <div class="controls">
                            <input type="email" id="email" name="email" value="{{email}}" tabindex="3"/>
                            <span class="help-inline"></span>
                        </div>
                    </div>
                </div>
        </fieldset>
    </form>
{{/with}}
```

**View: initialization and usage:**

```javascript
initialize:function () {

    ...

    // allow backbone-validation view callbacks (for error display)
    Backbone.Validation.bind(this);

    ...
},

...

/**
 * Save the current participant (update or create depending of the existence of a valid model.id)
 */
saveParticipant:function () {

    // build array of form attributes to refresh model
    var attributes = {};
    this.$el.find("form input[type!='submit']").each(function (index, value) {
        attributes[value.name] = value.value;
        this.model.set(value.name, value.value);
    }.bind(this));

    // save model if it's valid, display alert otherwise
    if (this.model.isValid()) {
        this.model.save(null, {
            success:this.onSaveSuccess.bind(this),
            error:this.onSaveError.bind(this)
        });
    }
    else {
        ...
    }
}
```

You also natively beneficiate of custom validation callbacks allowing to render validation errors in a 
form structured with [Twitter Bootstrap](http://getbootstrap.com/{{site.bootstrap-version}}/).

Since the 2.1.0 version, Resthub provides **server to client validation bindings features** in order to define constraints
only once. See [Resthub Validation](/docs/backbone/validation) for details.

## Backbone Query Parameters

[Backbone](http://documentcloud.github.com/backbone/) routes management allows to define such routes:

```javascript
"participants":"listParticipants"
"participants?:param":"listParticipantsParameters"
```

But the native behaviour seems not sufficient:

* **management of an unknown number of parameters** (ex `?page=2&filter=filter`) is not obvious
* we have to define (at least) **two routes to handle calls with or without parameters** without duplication
and without too much technical code

Expected behaviour was that the **map a single route to a method with an array of request parameter as optional parameter.**

[Backbone Query Parameters](http://github.com/jhudson8/backbone-query-parameters) provides this functionality.

With this lib, included once and for all in the main router, You 'll get the following:

**router.js**:

```javascript
define(['backbone', 'backbone-queryparams'], function (Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes:{
            // Define some URL routes
            ...

            "participants":"listParticipants",

            ...
        },

        ...

        listParticipants:function (params) {
            // params contains the list of all query params of is empty if no param
        }
    });
});
```

Query parameters array is automatically recovered **without any further operation** and **whatever the number
of these parameters**. It can then be passed to the view constructor for initialization:

**list.js**:

```javascript
askedPage:1,

initialize:function (params) {

    ...

    if (params) {
        if (params.page && this.isValidPageNumber(params.page)) this.askedPage = parseInt(params.page);
    }

    ...
},
```

## Backbone Datagrid

[Backbone Datagrid](http://loicfrering.github.com/backbone.datagrid/) is a powerful component, based on Backbone.View, that
displays your Backbone collections in a dynamic datagrid table. It is highly
customizable and configurable with sensible defaults.

You will find the full documentation on its [dedicated website]
(http://loicfrering.github.com/backbone.datagrid/). Do not miss the examples
listed on [this page](http://loicfrering.github.com/backbone.datagrid/examples/). Their sources are
available in the [examples](<https://github.com/loicfrering/backbone.datagrid/tree/master/examples/)
directory of the repository.

* Solar: a simple and complete example with an in memory collection of planets from the Solar System.
  * [Live version](http://loicfrering.github.com/backbone.datagrid/examples/solar.html)
  * [Sources](https://github.com/loicfrering/backbone.datagrid/tree/master/examples/js/solar.js)

* GitHub: an example with a collection connected to GitHub's REST API.
  * [Live version](http://loicfrering.github.com/backbone.datagrid/examples/github.html)
  * [Sources](https://github.com/loicfrering/backbone.datagrid/tree/master/examples/js/github.js)

Note that the Backbone Datagrid handles pagination by itself and does not rely
on Backbone Paginator which is described below and should only be used to
paginate collections which are not displayed in a datagrid.

## Backbone Paginator

[Backbone Paginator](http://addyosmani.github.com/backbone.paginator/) offers both client side pagination (`Paginator.clientPager`) 
and integration with server side pagination (`Paginator.requestPager`). It includes management of filters, sorting, etc.

### Client side pagination

This lib extends [Backbone](http://documentcloud.github.com/backbone/) collections. So adding options to collections is necessary:

```javascript
var participantsCollection = Backbone.Paginator.clientPager.extend({
    model:participantModel,
    paginator_core:{
        // the type of the request (GET by default)
        type:'GET',

        // the type of reply (jsonp by default)
        dataType:'json',

        // the URL (or base URL) for the service
        url:App.Config.serverRootURL + '/participants'
    },
    paginator_ui:{
        // the lowest page index your API allows to be accessed
        firstPage:1,

        // which page should the paginator start from
        // (also, the actual page the paginator is on)
        currentPage:1,

        // how many items per page should be shown
        perPage:12,

        // a default number of total pages to query in case the API or
        // service you are using does not support providing the total
        // number of pages for us.
        // 10 as a default in case your service doesn't return the total
        totalPages:10
    },
    parse:function (response) {
        return response;
    }
});
```

Then we `fetch` the collection and then ask for the right page:

```javascript
this.collection = new ParticipantsCollection();

// get the participants collection from server
this.collection.fetch({
    success:function () {
        this.collection.goTo(this.askedPage);
    }.bind(this),
    error:function (collection, response) {
        ...
    }
});
```

Once the collection retrieved, `collection.info()` allows to get information about current state:

```javascript
totalUnfilteredRecords
totalRecords
currentPage
perPage
totalPages
lastPage
previous
next
startRecord
endRecord
```

<h3 id="server-side-pagination" class="clickable-header">Server side pagination</h3>

Once client side pagination implemented, server adaptation is very easy:

We set **parameters to send to server** in `collections/participants.js`:

```javascript
server_api:{
    'page':function () {
        return this.currentPage;
    },

    'size':function () {
        return this.perPage;
    }
},
```

Then, in the same file, we provide a parser to get the response back and initialize collection and pager:

```javascript
parse:function (response) {
    var participants = response.content;
    this.totalPages = response.totalPages;
    this.totalRecords = response.totalElements;
    this.lastPage = this.totalPages;
    return participants;
}
```

Finally, we change server call: this time the `goTo` method extend `fetch` and should be called instead
(`views/participants/list.js`):

```javascript
// get the participants collection from server
this.collection.goTo(this.askedPage,
{
    success:function () {
    ...
    }.bind(this),
    error:function () {
        ...
    }
});
```

All other code stay inchanged but the `collection.info()` is a little bit thinner:

```javascript
totalRecords
currentPage
perPage
totalPages
lastPage
```

## Async

Other recurrent problem: parallel asynchronous calls for which we want to have a
final processing in order to display the results of the entire process: number of errors, successes,
etc.

Basically, each asynchronous call define a callback invoked at the end of his own treatment (success or error).
Without tools, we are thus obliged to implement a **manual count of called functions and a count
of callbacks called to compare**. The final callback is then called at the end of each call unit
but executed only if there is no more callback to call. This gives:

```javascript
/**
 * Effective deletion of all element ids stored in the collection
 */
deleteElements:function () {

    var self = this;
    var nbWaitingCallbacks = 0;

    $.each(this.collection, function (type, idArray) {
        $.each(idArray, function (index, currentId) {
            nbWaitingCallbacks += 1;

            $.ajax({
                url:App.Config.serverRootURL + '/participant/' + currentId,
                type:'DELETE'
            })
            .done(function () {
                nbWaitingCallbacks -= 1;
                self.afterRemove(nbWaitingCallbacks);
            })
            .fail(function (jqXHR) {
                if (jqXHR.status != 404) {
                    self.recordError(type, currentId);
                }
                nbWaitingCallbacks -= 1;
                self.afterRemove(nbWaitingCallbacks);
            });
        });
    });
},

/**
 * Callback called after an ajax deletion request
 *
 * @param nbWaitingCallbacks number of callbacks that we have still to wait before close request
 */
afterRemove:function (nbWaitingCallbacks) {

    // if there is still callbacks waiting, do nothing. Otherwise it means that all request have
    // been performed: we can manage global behaviours
    if (nbWaitingCallbacks == 0) {
        // do something
    }
},
```

This code works but there is **too much technical code**!

[Async](http://github.com/caolan/async/) provides a set of helpers to perform **asynchronous parallel processing** and synchronize the end of 
these treatments through a final callback called once.

This lib is initially developed for nodeJS server but has been **implemented on browser side**.

Theoretically, the method we currently need is `forEach`. However, we faced the following problem: all of these helpers
are designed to stop everything (and call the final callback) when the first error occurs.
But if we need to perform all server calls and only then, whether successful or fail, return global results
to the user, there is unfortunately no appropriate option (despite similar requests on mailing lists) ...

You can twick a little and, instead of `forEach`, use the `map` function that returns a result array
in which you can register successes and errors. error parameter of the final callback cannot be used without
stopping everything. So, the callback should always be called with a `null` err parameter and a custom wrapper containing the
returned object and the type of the result: `success` or `error`. You can then globally count errors without
interrupting your calls:

```javascript
/**
 * Effective deletion of all element ids stored in the collection
 */
deleteElements:function () {

    ...

    async.map(elements, this.deleteFromServer.bind(this), this.afterRemove.bind(this));
},

deleteFromServer:function (elem, deleteCallback) {
    $.ajax({
        url:App.Config.serverRootURL +'/' + elem.type + '/' + elem.id,
        type:'DELETE'
    })
    .done(function () {
        deleteCallback(null, {type:"success", elem:elem});
    })
    .fail(function (jqXHR) {
       ...

        // callback is called with null error parameter because otherwise it breaks the
        // loop and top on first error :-(
        deleteCallback(null, {type:"error", elem:elem});
    }.bind(this));
},

/**
 * Callback called after all ajax deletion requests
 *
 * @param err always null because default behaviour break map on first error
 * @param results array of fetched models: contain null value in cas of error
 */
afterRemove:function (err, results) {

    // no more test
    ...
},
```

## Keymaster

[Keymaster](http://gobby/keymasterithub.com/madr) is a micro library allowing to define listeners on keyboard shortcuts and propagate them. 
The syntax is elegant, it is very simple while very complete:

* Management of multiple hotkeys
* Chaining through an important number of "modifiers"
* Source DOM element type filtering
* ...

It is so simple that the doc is self sufficient - see [here](http://gobby/keymasterithub.com/madr)

## Backbone Associations

[Backbone Associations](http://dhruvaray.github.io/backbone-associations/) provides one-to-one, one-to-many and many-to-one relations 
between models for Backbone. To use relations, extend `Backbone.AssociatedModel` (instead of the regular `Backbone.Model`) and define a 
property relations, containing an array of option objects. Each relation must define (as a minimum) the `type`, `key` and `relatedModel`. 
Available relation types are `Backbone.One` and `Backbone.Many`.

## Moment

[Moment](http://momentjs.com/) is a date library for parsing, validating, manipulating, and formatting dates.

Moment.js features:

* Parse and format date with custom pattern and internationalization
* Date manipulation (add, substract)
* Durations (eg: 2 hours)

{% endraw %}