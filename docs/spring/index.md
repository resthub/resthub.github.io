---
layout: docs
title: RESThub Spring Stack
permalink:  home/
---

RESThub 2 Spring stack provides a server side full stack and guidelines for building Java/Spring application (usually web application,
but not only).

It provides a coherent stack based on:

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (at least JDK6, JDK7 recommended)
* [Tomcat 7](http://tomcat.apache.org/download-70.cgi) (RESThub can also be used for non web applications)
* Spring 3.2 [reference manual](http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html)
  and [Javadoc](http://static.springsource.org/spring/docs/3.2.x/javadoc-api/))
* SQL and NoSQL Persistence with [Spring Data](http://www.springsource.org/spring-data>)
* Logging with SLF4J ([manual](http://www.slf4j.org/manual.html)) and Logback ([manual](http://logback.qos.ch/manual/index.html))
* Maven 3.0 ([complete reference](http://www.sonatype.com/books/mvnref-book/reference/public-book.html)) is
  the reference build tool used.

It provides the following modules:

* **resthub-archetypes**: project templates (WAR or multi-module layout) to start quickly a new project
* **resthub-jpa**: support for JPA based persistence based on Spring Data, including embedded H2 database for testing
* **resthub-mongodb**: support for MongoDB based on Spring Data
* **resthub-test**: testing stack based on TestNG, Mockito and Fest Assert 2
* **resthub-web-server**: generic REST webservices support based on Spring MVC 3.2 including exception mapping to HTTP status
  codes
* **resthub-web-client**: simple to use HTTP client based on AyncHttpClient

Released artifacts are available from [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.resthub%22) and will
be automatically found without adding any additional repository.

Snapshot artifacts are available from [Sonatype OSS Snapshot repository](https://oss.sonatype.org/content/repositories/snapshots/org/resthub).
In order to use it for your projects, you should add the following element to your pom.xml :

```xml
<repositories>
    <repository>
        <id>snapshot</id>
        <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```


The whole RESThub 2.1 Spring stack [Javadoc](http://resthub.org/javadoc/2.1/) is available.