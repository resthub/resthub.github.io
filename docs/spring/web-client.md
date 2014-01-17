---
layout: docs
title: Web client
permalink:  web-client/
prev: spring/web-server
next: spring/validation
---

<div class="toc"></div>

RESThub Web client module aims to give you an easy way to request other REST webservices.
It is based on AsyncHttpClient and provides a [client API wrapper](/apidocs/spring/{{site.spring-stack-javadoc-version}}/index.html?org/resthub/web/Client.html)
and OAuth2 support.

In order to limit conflicts it has no dependency on Spring, but only on:

* AsyncHttpClient {{site.async-http-client-version}} [documentation](https://github.com/AsyncHttpClient/async-http-client) and
  [Javadoc](http://sonatype.github.com/async-http-client/apidocs/reference/packages.html)
* Jackson {{site.jackson-version}} ([documentation](http://wiki.fasterxml.com/JacksonDocumentation))

## Configuration

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-web-client</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>
```

## Usage

You can use resthub web client in a synchronous or asynchronous way. The synchronous API is easy to use,
but blocks the current Thread until the remote server sends the full Response.

```java
// One-liner version
Sample s = httpClient.url("http//...").jsonPost(new Sample("toto")).resource(Sample.class);

// List<T> and Page<T> use TypeReference due to Java type erasure issue
List<Sample> p = httpClient.url("http//...").jsonGet().resource(new TypeReference<List<Sample>>() {});
Page<Sample> p = httpClient.url("http//...").jsonGet().resource(new TypeReference<Page<Sample>>() {});
```

Asynchronous API is quite the same, every HTTP request returns a [Future](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html)
`<Response>` object. Just call `get()` on this object in order to make the call synchronous.
The `Future.get()` method can throw Exceptions, so the method call should be surrounded by a
`try/catch` or let the exceptions bubble up.

```java
// 4 lines example
Client httpClient = new Client();
Future<Response> fr = httpClient.url("http//...").asyncJsonPost(new Sample("toto"));
// do some computation while we're waiting for the response...

// calling .get() makes the code synchronous again!
Sample s = httpClient.url("http//...").asyncJsonPost(new Sample("toto")).get().resource(Sample.class);
```

Because the remote web server sometimes responds 4xx (client error) and 5xx (server error) HTTP status codes,
RESThub HTTP Client wraps those error statuses and throws
[specific runtime exceptions](https://github.com/resthub/resthub-spring-stack/tree/master/resthub-web/resthub-web-common/src/main/java/org/resthub/web/exception).

## OAuth 2.0 integration

Here is an example of a simple OAuth2 support

```java
String username = "test";
String password = "t&5t";
String clientId = "app1";
String clientSecret = "";
String accessTokenUrl = "http://.../oauth/token";

Client httpClient = new Client().setOAuth2(username, password, accessTokenUrl, clientId, clientSecret);
String result = httpClient.url("http://.../api/sample").get().getBody();
```

You can also use a specific OAuth2 configuration. For example, you can override the HTTP Header
used to send the OAuth token.

```java
OAuth2Config.Builder builder = new OAuth2Config.Builder();
builder.setAccessTokenEndpoint("http://.../oauth/token")
       .setUsername("test").setPassword("t&5t")
       .setClientId("app1").setClientSecret("")
       .setOAuth2Scheme("OAuth"); // override default OAuth HTTP Header name

Client httpClient = new Client().setOAuth2Builder(builder);
String result = httpClient.url("http://.../api/sample").get().getBody();
```