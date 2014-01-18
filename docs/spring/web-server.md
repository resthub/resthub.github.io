---
layout: docs
title: Web server
permalink:  web-server/
prev: spring/web-common
next: spring/web-client
---

<div class="toc"></div>

RESThub Web Server module is designed for REST webservices development. Both JSON (default) and
XML serialization are supported out of the box.

It provides some abstract REST controller classes, and includes the following dependencies:

* Spring MVC {{site.spring-version}} ([reference manual](http://static.springsource.org/spring/docs/{{site.spring-docs-version}}/spring-framework-reference/html/mvc.html))
* Jackson {{jackson-version}} ([documentation](http://wiki.fasterxml.com/JacksonDocumentation))

RESThub exception resolver allow to map common exceptions (Spring, JPA) to the right HTTP status codes:

* `IllegalArgumentException` -> 400
* `ValidationException` -> 400
* `NotFoundException`, `EntityNotFoundException` and `ObjectNotFoundException` -> 404
* `NotImplementedException` -> 501
* `EntityExistsException` -> 409
* `Any uncatched exception` -> 500

## Configuration

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-web-server</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>
```

In order to import the [default configuration](https://github.com/resthub/resthub-spring-stack/blob/master/resthub-web/resthub-web-server/src/main/resources/resthubContext.xml),
 your should activate the resthub-web-server Spring profile in your `WebAppInitializer` class:

```java
XmlWebApplicationContext appContext = new XmlWebApplicationContext();
appContext.getEnvironment().setActiveProfiles("resthub-web-server", "resthub-mongodb");
```

## Usage

RESThub comes with a REST controller that allows you to create a CRUD webservice in a few lines.
You have the choice to use a 2 layers (Controller -> Repository) or 3 layers (Controller -> Service -> Repository)
software design.

You can  find more details about these generic webservices, including their REST API description,
on RESThub [Javadoc](/apidocs/spring/{{site.spring-stack-javadoc-version}}).

### 2 layers software design

```java
@Controller @RequestMapping("/repository-based")
public class SampleRestController extends RepositoryBasedRestController<Sample, Long, WebSampleResourceRepository> {

    @Override @Inject
    public void setRepository(WebSampleResourceRepository repository) {
        this.repository = repository;
    }
}
```

### 3 layers software design

```java
@Controller @RequestMapping("/service-based")
public class SampleRestController extends ServiceBasedRestController<Sample, Long, SampleService> {

    @Override @Inject
    public void setService(SampleService service) {
        this.service = service;
    }
}

@Named("sampleService")
public class SampleServiceImpl extends CrudServiceImpl<Sample, Long, SampleRepository> implements SampleService {

    @Override @Inject
    public void setRepository(SampleRepository SampleRepository) {
        super.setRepository(SampleRepository);
    }
}
```

## Sluggable controller

By default, generic controller use the database identifier (table primary key for JPA on MongoDB ID)
in URLs to identify a resource. You can change this behaviour by overriding controller implementations
to use the field you want. For example, this is common to use a human readable identifier called reference
or slug to identify a resource. You can do that with generic repositories only by overriding `findById()`
controller method:

```java
@Controller @RequestMapping("/sample")
public class SluggableSampleController extends RepositoryBasedRestController<Sample, String, SampleRepository> {
    @Override @Inject
    public void setRepository(SampleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Sample findById(@PathVariable String id) {
        Sample sample = this.repository.findBySlug(id);
        if (sample == null) {
            throw new NotFoundException();
        }
        return sample;
    }
}
```

With default behaviour we have URL like `GET /sample/32`.
With sluggable behaviour we have URL lke `GET /sample/niceref`.

<div class="alert alert-warning">
    Be aware that when you override a Spring MVC controller method, your new method automatically
    reuse method level annotations from parent classes, but not parameter level annotations.
    That's why you need to specify parameters annotations again in order to make it work, like in
    the previous code sample.
</div>

## Custom JSON Views

Spring MVC provides out-of-the-box support for returning your domain model in JSON, using Jackson under the covers.
However, often you may find that you want to return different views of the data, depending on the method that is
invoked.  Thanks to RESThub support for custom JSON views (based on
[Marty Pitt implementation](http://martypitt.wordpress.com/2012/11/05/custom-json-views-with-spring-mvc-and-jackson/)),
it is possible easily.

Usual use cases for using custom JSON Views are :

* Fix serialization issues in a flexible way (not like `@JsonIgnore` or `@JsonBackReference` annotation)
  for children-parent relations
* Avoid loading too much data when used with JPA lazy loading + `OpenSessionInView` filter
* Sometimes avoid to send some information to the client, for example a password field for a
  User class (needed in BO but not in FO for security reasons)

In order to use it, just add one or more JsonView interfaces (usually declared in the same java file
than your domain class), in our case SummaryView. Please have a look to
[Jackson JsonView documentation](http://wiki.fasterxml.com/JacksonJsonViews) for more details.

```java
public class Book {
    @JsonView(SummaryView.class)
    private Integer id;

    private String title;

    @JsonView(SummaryView.class)
    private String author;

    private String review;

    public static interface SummaryView {}
}
```


Usage for the `@JsonView` is activated on a per controller method or class basis with the
`@ResponseView` annotation like bellow :

```java
@RequestMapping("{id}/summary")
@ResponseView(Book.SummaryView.class)
public @ResponseBody Book getSummary(@PathVariable("id") Integer id) {
    return data.get(id - 1);
}

@RequestMapping("{id}")
public @ResponseBody Book getDetail(@PathVariable("id") Integer id) {
    return data.get(id - 1);
}
```

The first method `getSummary()` will only serialize id and author properties, and `getDetail()`
will serialize all properties. It also work on collection (`List<Book>` for example).

## Model and DTOs with ModelMapper

The previous `SluggableSampleController` example shows one thing: when your application starts to grow,
you usually want to address some specific needs:

* tailoring data for your client (security, performance...)
* changing your application behaviour without changing service contracts with your clients

For that, you often need to decorrelate serialized objects ([DTOs](http://en.wikipedia.org/wiki/Data_transfer_object))
from your model.

RESThub includes [ModelMapper {{site.model-mapper-version}}](http://modelmapper.org/) in its resthub-common module.

```java
ModelMapper modelMapper = new ModelMapper();
UserDTO userDTO = modelMapper.map(user, UserDTO.class);
```

Modelmapper has sensible defaults and can often map objects without additional configuration.
For specific needs, you can use [property maps](http://modelmapper.org/user-manual/property-mapping/).

<a name="client-logging"></a>

## Client logging

In order to make JS client application debugging easier, RESThub provides a webservice used to send
client logs to the server. In order to activate it, you should enable the **resthub-client-logging** Spring profile.

`POST api/log` webservice expect this kind of body:

```json
{"level":"warn","message":"log message","time":"2012-11-13T08:18:52.972Z"}
```

`POST api/logs` webservice expect this kind of body:

```json
[{"level":"warn","message":"log message 1","time":"2012-11-13T08:18:53.342Z"},
{"level":"info","message":"log message 1","time":"2012-11-13T08:18:52.972Z"}]
```

## Exception Mapping

You should add your own Exception handlers in order to handle your application custom exceptions
by using `@ControllerAdvice` (will be scan like a bean in your classpath) and `@ExceptionHandler` annotations :

```java
@ControllerAdvice
public class ResthubExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value={
            MyFirstException.class,
            MySecondException.class
    })
    public ResponseEntity<Object> handleCustomException(Exception ex, WebRequest request) {
        // ...

        return new ResponseEntity<Object>(body, headers, status);
    }
}
```
