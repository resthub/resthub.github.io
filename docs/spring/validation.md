---
layout: docs
title: Validation API
permalink:  /docs/spring/validation/
prev: spring/web-client
next: spring/testing
---

<div class="toc"></div>

In a RIA, form validation could be a heavy process because you have to implement validation on both client 
and server side of your application.

To be able to build, on the client side, a validation behaviour based on server side constraints definition, 
**RESThub provides an API to export, for a given model class, the complete list of its constraints definitions**.

RESThub Spring Stack integrates the [JSR303 specification](http://beanvalidation.org/1.0/spec/) (BeanValidation) 
and its reference implementation: [Hibernate Validator {{site.hibernate-validator-version}}](http://docs.jboss.org/hibernate/validator/{{site.hibernate-validator-docs-version}}/reference/en-US/html_single/).

These validations constraints are, in fact, annotations held by a Java Bean Model. e.g :

```java
@NotNull
public String getLogin() {
    return this.login;
}
```


All these constraints and their parameters are exported by RESThub Validation API.

RESThub provides, on the client side, a full support of this API to implement client side validation natively 
(see [Backbone Stack documentation](/docs/backbone/validation)).
    

## Usage and configuration

Validation API is not activated by default and should be first configured.

### Activation

To activate, edit your WebAppInitializer and add **resthub-validation** as a spring active profile :

```java
public class WebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        XmlWebApplicationContext appContext = new XmlWebApplicationContext();
        appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-pool-bonecp", "resthub-web-server", "resthub-validation");
        
        ...
    }
}
```


### API access and parameters

Validation REST API can then be reached through `/api/validation` but takes some parameters : 

1. **className**

    Mandatory path parameter containing the complete className of the Java Bean to export (i.e. package + className - e.g.
    `org.resthub.validation.model.User`). This parameter must be provided. If not or if an invalid className is provided,
    a 404 NotFound response is returned.

    For example, you can reach validation API at:

    ```
    http://localhost:8080/api/validation/org.resthub.validation.model.User
    ```

2. **locale**

    As an optional request parameter, the API takes the locale string indicating your internationalization preferences. You can
    then provide a valid i18n locale string to choose the desired message locale. e.g :

    ```
    http://localhost:8080/api/validation/org.resthub.validation.model.User?locale=en-us
    ```

    Available locales are those supported by Hibernate Validator or provided by your custom properties files. If no locale
    parameter is provided or if the locale parameter is invalid, the default server locale is used.

    If some of your validation constraints (e.g. custom ones) doesn't have any default error message, only the key is exported
    by the API. e.g :

    ```java
    org.resthub.validator.constraints.TelephoneNumber.message
    ```


### Response format

The response format could be XML or JSON and contains the following:

* The complete model className
* A list of constraints (JSON object or dedicated XML element) containing all Java Bean property description.
* Each property contains a list (JSON array or multiple XML element) of its constraints.
* Each constraint contains different properties:
 
    * *type*: contains the constraint type (e.g. `NotNull`, `Size`, `Email`).
    * *message*: contains the constraint error message.
    * any other(s) property(ies) depending on the constraint type and its custom parameters (e.g. the *Size*
      constraint contains two additional properties *min* and *max*). To get the complete list of JSR303 parameters,
      see [specification](http://beanvalidation.org/1.0/spec/#d0e5601), for hibernate validator, see
      [documentation](http://docs.jboss.org/hibernate/validator/5.0/reference/en-US/html_single/#validator-defineconstraints-hv-constraints)


**JSON sample:**

```json
{
    "model": "org.resthub.validation.model.User",
    "constraints": {
        "lastName": [{
            "type": "NotBlank",
            "message": "may not be empty"
        }],
        "email": [{
            "type": "NotNull",
            "message": "may not be null"
        }, {
            "type": "Email",
            "message": "not a well-formed email address",
            "flags": [],
            "regexp": ".*"
        }],
        "login": [{
            "type": "NotNull",
            "message": "may not be null"
        }, {
            "type": "Length",
            "message": "length must be between 8 and 2147483647",
            "min": 8,
            "max": 2147483647
        }],
        "firstName": [{
            "type": "NotBlank",
            "message": "may not be empty"
        }]
    }
}
```

    
**XML sample:**    

```xml
<ModelConstraint>
    <model>org.resthub.validation.model.User</model>
    <constraints>
        <lastName>
            <type>NotBlank</type>
            <message>may not be empty</message>
        </lastName>
        <email>
            <type>NotNull</type>
            <message>may not be null</message>
        </email>
        <email>
            <type>Email</type>
            <message>not a well-formed email address</message>
            <regexp>.*</regexp>
        </email>
        <login>
            <type>NotNull</type>
            <message>may not be null</message>
        </login>
        <login>
            <type>Length</type>
            <message>length must be between 8 and 2147483647</message>
            <min>8</min>
            <max>2147483647</max>
        </login>
        <firstName>
            <type>NotBlank</type>
            <message>may not be empty</message>
        </firstName>
    </constraints>
</ModelConstraint>
```

Supported annotations
---------------------

RESThub Validation API is based on [JSR303 specification](http://beanvalidation.org/1.0/spec/) (BeanValidation)
Validation constraints. **Any standard BeanValidation Constraint is supported** (and exported) by this API.

As [Hibernate Validator](http://docs.jboss.org/hibernate/validator/{{site.hibernate-validator-docs-version}}/reference/en-US/html_single/) is used
as BeanValidation implementation, RESThub Validation also exports and supports specific
Hibernate Validators constraints which format are JSR303 compliant are also supported. More globally,
**any extension of JSR303 specification would be supported** if the standard BeanValidation constraint
definition API is used.