---
layout: docs
title: Validation
permalink:  validation/
prev: backbone/logging
next: backbone/third-party
---

<div class="toc"></div>

Since 2.1.0, RESThub comes with custom server and client validation handlers allowing to export, via a dedicated API, the
server side declared validation constraints (see [Spring Stack documentation](/docs/spring/validation)) and
to interpret these constraints on the client side.

This feature allows to define once (server side) your validation constraints that will be (if configured)
automatically mapped on the client side to effective [Backbone Validation](http://github.com/thedersen/backbone.validation)
constraints (see also [here](/docs/backbone/third-party#backbone-validation)).

Server side declared constraint validations will thus be fully reused and you won't have to 'clone' these
constraints on the client side.

## Usage

This feature is available by default but not active unless explicit configuration.  

### Activate synchronization

Before any server side validation constraint reuse on any of your client models, **you have to 
implement or customize your model** `initialize()` **function** to call the `Resthub.Validation` namespace
`synchronize` function:   

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

});
```

This function takes the current model as a mandatory parameter. It accepts also an optional parameter
`errorCallback` (cf. [Errors management](#errors)).

### Activate Backbone Validation in views

RESThub Validation will be effective only if Backbone Validation is correctly configured in view 
(see [here](/docs/backbone/third-party#backbone-validation)). For instance:

```javascript
var UserView = Resthub.View.extend({

    // Define view template
    template: userTemplate,

    events: {
      'submit form': 'onSubmitForm'
    },

    initialize: function() {
      // Initialize the model
      this.model = new User();

      Backbone.Validation.bind(this);

      this.render();
    },

    onSubmitForm: function(event) {
        ...

        this.save();
    },

    save: function() {
        this.populateModel();

        if (this.model.isValid()) {
            // ...
        } else {
            // ...
        }
    }

});
```
    
This code sample is taken from a complete validation sample that you can find 
[here](https://github.com/bmeurant/resthub-validation-sample). Don't hesitate to checkout this sample to see working samples.

<a name="lifecycle"></a>

### Lifecycle

Doing this, all validation constraints will be **transparently synchronized from the server during a model instantiation** 
(i.e. `new UserModel()`). A GET request will be thus sent to the server with the given className
to get server validation constraints.

Resthub Validation optimizes this process by sending the GET request **only on the first model instantiation**. So
constraints validation synchronization will only be performed on the first instantiation of a given model - deduced 
Backbone Validation constraints will be **reused accross all instances of this model**.

Note that the synchronization process will be **reset after a locale update** (see [Change locale](#change-locale)) or
could be **manually forced** (see below).

#### Force synchronization

Synchronization of a given model (in fact, on a given class name) could be forced using a dedicated `Resthub.Validation`
namespace function: `forceSynchroForClass`.

```javascript
Resthub.Validation.forceSynchroForClass("org.resthub.validation.model.User");
```
    
This function must be called with a mandatory parameter *className* corresponding to the declared model 
className (see [Parameters & options](#options)).

This operation resets the synchronized information for the given className, this means that **the GET request 
(and constraint binding) will be sent again on the next model instantiation**.

<a name="options"></a>

#### Parameters & Options

You can configure or parametrize RESThub Validation with a set of parameters and options.

##### API url

The validation **api base url can be configured in** `Resthub.Validation` namespace `options.apiUrl` :

```javascript
Resthub.Validation.options.apiUrl = 'new/url';
```

Default value is `'api/validation'`.

##### className

**Each model to be synchronized must hold a className attribute** containing the complete qualified name of the
corresponding Java class (i.e. package + name. see [Spring Stack documentation](/docs/spring/validation)).

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...

});
```

##### messages

You can provide an key/value pair object `messages` to any of your model or globally in `Resthub.Validation` namespace
to specify custom error messages that will replace default messages from server (see [Messages and internationalization](#messages) for details).
    
```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',
    messages: {
        'validation.Min.message': 'should be greater than {value} or equals'
    },

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...

});
```

##### includes / excludes

By default, **all constraints exported by the server API are mapped** and converted into Backbone Validation constraints
and then added as active validation constraints on the client side.

You can configure this behaviour **for each of your model by specifying includes or excludes restrictions on it**.

Only properties names found in an **includes** array will be **mapped** :

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',
    includes: ['login', 'firstName', 'lastName'],

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...

});
```

Each property name found in an **excludes** array will be **ignored** :

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',
    excludes: ['password'],

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...

});
```

## Server constraints mapping

Once all server validation constraints retrieved from server, RESThub Validation tries to map each constraint to
a valid Backbone Validation constraint, if supported.

<a name="supported-constraints"></a>

### Supported constraints

Supported constraints are described below. You will find in this chapter the description of the mapped constraints
and the way it is mapped to a Backbone Validation constraint.

If the client receive a non supported server validation constraint, it will be ignored unless you provide a specific
and custom constraint validator (see [Adding custom constraints](#add-constraints)).

#### NotNull

> The property must not be undefined or null and, in case of String cannot be neither empty ("")
> nor blank ("   ").

#### NotBlank or NotEmpty

> The property must not be undefined or null, in case of String cannot be neither empty ("")
> nor blank ("   "), in case of array cannot be empty.

#### Null

> The property must be null or undefined or, in case of String, empty ("") or blank ("   ").

#### AssertTrue

> The property must be either a boolean to `true` or a String equals to `"true"`.
>
> null values are considered valid.

#### AssertFalse

> The property must be either a boolean to `false` or a String different of `"true"`.

#### Size

> The property must be a String or an array with size between the specified boundaries (included).
>
> null values are considered valid.
> 
> available parameters:
>     
> * `min`: size the property must be higher or equal to
> * `max`: size the property must be lower or equal to
>

#### Min

> The property must be an integer number whose value must be higher or equal to the specified minimum.
> 
> null values are considered valid.
> 
> available parameters:
>
> * `value`: value the property must be higher or equal to
    
#### DecimalMin

> The property must be floating number whose value must be higher or equal to the specified minimum.
> 
> null values are considered valid.
> 
> available parameters:
>
> * `value`: value the property must be higher or equal to

#### Max

> The property must be an integer number whose value must be lower or equal to the specified minimum.
>
> null values are considered valid.
>
> available parameters:
>
> * `value`: value the property must be lower or equal to

#### DecimalMax

> The property must be an integer number whose value must be lower or equal to the specified minimum.
>
> null values are considered valid.
>
> available parameters:
>
> * `value`: value the property must be lower or equal to

#### Pattern

> The property must match the specified regular expression.
>
> null values are considered valid.
>
> available parameters:
>
> * *regexp*: regular expression to match

#### URL

> The property must represent a valid URL. Parameters allow to verify specific parts of the parsed URL.
> Per default the property must match
>
> ```javascript
> /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/
> ```
>
> null values are considered valid.
>
> available parameters:
>
> * `protocol`: specify the protocol the property must match. Per default any protocol is allowed.
> * `host`: specify the host regexp the property must match. Per default any host is allowed.
> * `port`: specify the port the property must match. Per default any port is allowed.

##### options

You can **customize URL validator pattern** to match by overriding `Resthub.Validation.options.URL.pattern`: 

```javascript
Resthub.Validation.options.URL.pattern = /my pattern/; 
```
   
#### Range

> The property must be numeric values or string representation of the numeric value with value between specified range.
>
> available parameters:
>
> * `min`: value the property must be higher or equal to
> * `max`: value the property must be lower or equal to


#### Length

> The property must be a string with length between min and max included.
>
> available parameters:
>
> * `min`: value the property length must be higher or equal to
> * `max`: value the property length must be lower or equal to


#### Email

> The property must be a valid email (see [Backbone Validation built in email pattern constraint](https://github.com/thedersen/backbone.validation#pattern)).

#### CreditCardNumber

> The property must be a valid credit card number according [Lunh algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm).


## Customize constraints definition

Model validation constraints can be customized by adding specific client validation, overriding
constraints synchronized from server or adding custom constraint mapper for a specific `BeanValidation` server constraint.

<a name="add-constraints"></a>

### Adding client constraints

You can **provide additional client constraints** as usual in a standard Backbone Validation way. This client specific 
constraints **will then be merged** with synchronized server constraints: 


```javascript
var UserModel = Backbone.Model.extend({

   className: 'org.resthub.validation.model.User',

   initialize: function() {
       Resthub.Validation.synchronize(UserModel);
   },

   validation: {
       confirmPassword: {
           equalTo: 'password'
       }
   }
});
```

### Overriding constraints

You can also **override a property constraint already synchronized from server** : only the client constraint will
be kept: 


```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    },

    validation: {
        email: {
            required: true,
            pattern: \my pattern\
        }
    }
});
```
    
### Adding custom constraints

If provided a custom JSR303 compliant validation annotation on the server side, you can easily add a custom client validator
for your custom constraint with a dedicated RESThub Validation API allowing to **define a new validator or override an 
existing one** and retrieve an existing validator: 

```javascript
// add or replace the validator associated to the given constraintType.
// validator parameter should be a function
ResthubValidation.addValidator = function(constraintType, validator) {
    validators[constraintType] = validator;
};

// retrieve the validator associated to a given constraint type
ResthubValidation.getValidator = function(constraintType) {
    return validators[constraintType];
};
```


To map your new constraint, you only have to declare a new validator associated to your constraint type (the annotation
name in server side) : 

```javascript
Resthub.Validation.addValidator('TelephoneNumber', function(constraint, msg) {
    return {
        pattern: /^[+]?([0-9]*[\\.\\s\\-\\(\\)]|[0-9]+){6,24}$/,
        msg: msg
    };
});
```

<a name="messages"></a>
    
## Messages and internationalization

Internationalization can be managed in different ways : sending locale to server or providing custom messages globally 
in resthub.Validation or locally in each of your model.

### Default behaviour

By default, Resthub Validation adds a `locale` parameter to any validation related server call.

e.g.

```
/api/validation/org.resthub.validation.model.User?locale=en
```

Error messages are thus returned from server with the asked locale and displayed client side as it.

This is the behaviour that will be applied without any specific configuration. i.e: 

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...
});
```

<a name="change-locale"></a>

### Change locale

Wihtout any further configuration, the current browser locale is taken (copied in Resthub.Validation and sent
to server). But you can easily **change locale using Resthub Validation API function** `locale()` :

```javascript
Resthub.Validation.locale("fr");
```

This operation will change the current active locale of Resthub Validation and, even more important, will **force
the synchronization process to send a new request** to server for next model initialization in order to **refresh
constraints** with server localized messages.

**You have to explicitely call this function with your new locale on app local update**. If you don't, no request will
be sent to server for already synchronized models (because of caching - see [Lifecycle](#lifecycle)).

### Client error messages customization


If you want to **manage all or parts of your error messages in client side** - allowing, for instance to build your messages
uppon a common i18n mechanism such as requirejs i18n plugin - you'll have to provide specific configuration
either globally in `Resthub.Validation` namespace or locally in each of your model.

This means that you'll provide a dedicated `messages` key-value pairs object:

* **key**: contains the constraint message key built as follows: `'validation.{ConstraintName}.message'`
  where `ConstraintName` is the name of the contraint, **in camel case and starting by an upper case letter**.
* **value**: contains the constraint message text that could be parametrized, depending on available
  parameters of each constraint (see below and [Supported constraints](#supported-constraints)).

e.g. :

```javascript
messages: {
    'validation.Min.message': 'should be greater than {value} or equals',
    'validation.NotNull.message': 'should not be null'
},
```
    
    
If a messages object is provided, globally or locally (see below), RESThub Validation will check if the current
constraint exists in messages and affect this message value to the corresponding built Backbone Validation
constraint. If the key does not exist, the default message returned by server is returned.
      
<h3 id="toc_37" class="clickable-header">Error messages templating</h3>

Client error message value definition can be **defined with custom messages templates** to dynamically include
constraints parameters values in the resulting message.

You can thus display, in your message, any available parameter of the current constraint
(see [Supported constraints](#supported-constraints)) by using the curly brackets `{...}` syntax :

```javascript
messages: {
    'validation.Size.message': 'should be greater than {min} or equals and lower than {max} or equals'
},
```

Any parameter value that is not an available parameter for this constraint will be ignored.

#### Customize globally

Custom client messages can be provided directly in `Resthub.Validation` messages :

```javascript
Resthub.Validation.messages = {
    'validation.TelephoneNumber.message': 'telephone number is not valid'
};
```

This allows you to define error messages that will be **global to your entire app and reused on all of your models**.
These messages will **override server error messages**.

<h4 id="toc_39" class="clickable-header">Customize locally in Model</h4>

You can also provide a **model specific messages object** if have specific needs for a given model:

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',
    messages: {
        'validation.Min.message': 'should be greater than {value} or equals'
    },

    initialize: function() {
        Resthub.Validation.synchronize(UserModel);
    }

    ...

});
```

These messages will **override server error messages and** `Resthub.Validation` **global messages**.

<a name="errors"></a>

## Errors management

By default, any synchronization process error (e.g. server unavailable, className not found, etc.) will
**simply log an error message in console**.

Obviously, no validation constraint will be retrieved from server and any client side defined constraint will be kept
as it.

**You can provide either global or local customization of this behaviour** (for instance sending a global event
to display a user friendly alert, ...).


### Global customization


You can override the error callback directly in `Resthub.Validation` namespace (for instance in your app.js file) :

```javascript
Resthub.Validation.options.errorCallback = function(resp) {
    // your specific code
};
```

The `resp` parameter is the server response.

<h3 id="toc_42" class="clickable-header">Local customization in Model</h3>

Custom error callback could be also **provided in model on synchronize call** as an optional parameter :

```javascript
var UserModel = Backbone.Model.extend({

    className: 'org.resthub.validation.model.User',

    initialize: function() {
        Resthub.Validation.synchronize(UserModel, function(resp) { /* your specific code */ });
    }

    ...

});
```

<h3 id="toc_43" class="clickable-header">Local customization in Model instance</h3>


You can even provide a model **instance specific callback** by customizing your model initialize method with
a custom `errorCallback` parameter option member (for instance, in your view in order to display the error in a 
view specific zone) :

* **model**:

    ```javascript
    var UserModel = Backbone.Model.extend({

        ...

        initialize: function (attributes, options) {
            Resthub.Validation.synchronize(UserModel, options.errorCallback);
        },

        ...

    });
    ```


- **view**: 

    ```javascript
    var UserView = Resthub.View.extend({

        ...

        initialize: function() {
          // Initialize the collection
          this.model = new User({}, {errorCallback: function(resp) {// your specific code}});

          Backbone.Validation.bind(this);

          this.render();
        },
        
        ...
    });
    ```
