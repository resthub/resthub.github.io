---
layout: docs
title: RESThub Spring Stack
permalink:  /docs/spring/
prev: quickstart
next: spring/layout
---

<div class="toc"></div>

## Presentation

RESThub 2 Spring stack provides a server side full stack and guidelines for building Java/Spring application (usually web application,
but not only).

It provides a coherent stack based on:

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (at least JDK6, JDK7 recommended)
* [Tomcat 7](http://tomcat.apache.org/download-70.cgi) (RESThub can also be used for non web applications)
* Spring {{site.spring-version}} [reference manual](http://docs.spring.io/spring-framework/docs/{{site.spring-docs-version}}/spring-framework-reference/html)
  and [Javadoc](http://docs.spring.io/spring-framework/docs/{{site.spring-docs-version}}/javadoc-api/))
* SQL and NoSQL Persistence with [Spring Data](http://projects.spring.io/spring-data/)
* Logging with SLF4J ([manual](http://www.slf4j.org/manual.html)) and Logback ([manual](http://logback.qos.ch/manual/index.html))
* Maven {{site.maven-version}} ([complete reference](http://www.sonatype.com/books/mvnref-book/reference/public-book.html)) is
  the reference build tool used.

It provides the following modules:

* **resthub-archetypes**: project templates (WAR or multi-module layout) to start quickly a new project
* **resthub-jpa**: support for JPA based persistence based on Spring Data, including embedded H2 database for testing
* **resthub-mongodb**: support for MongoDB based on Spring Data
* **resthub-test**: testing stack based on TestNG, Mockito and Fest Assert {{site.fest-assert-short-version}}
* **resthub-web-server**: generic REST webservices support based on Spring MVC {{site.spring-version}} including exception mapping to HTTP status
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

## Versions & Changelogs

Spring stack current version is **{{site.spring-stack-version}}**, the whole RESThub {{site.spring-stack-javadoc-version}} Spring stack [Javadoc](/apidocs/spring/{{site.spring-stack-javadoc-version}}/) is available.

You can find RESThub Spring Stack release changelogs [here](/new/releases)

## Bootstrap your project

Java and Maven 3 should be installed on your computer. RESThub based applications are usually developed thanks to a
Java IDE like Eclipse, Netbeans or IntelliJ IDEA. If you don't know which IDE to choose,
[Netbeans](http://netbeans.org/) is recommended since it is free and has great Maven support and Java/Javascript capabilities.

The easiest way to start is to use RESThub archetypes to create your first web application.

You will have to choose between the following RESThub archetypes:

* **resthub-jpa-backbonejs-archetype**: simple HTML5 web application with JPA persistence
* **resthub-mongodb-backbonejs-archetype**: simple HTML5 web application with MongoDB persistence
* **resthub-jpa-backbonejs-multi-archetype**: Multimodules HTML5 web application with JPA persistence
* **resthub-mongodb-backbonejs-multi-archetype**: Multimodules HTML5 web application with MongoDB persistence

To create your project based or RESThub archetypes, just open a command line terminal, and copy/paste the line related
to the archetype you chosed:

```bash
mvn archetype:generate -DarchetypeArtifactId=resthub-jpa-backbonejs-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion={{site.spring-stack-version}}
mvn archetype:generate -DarchetypeArtifactId=resthub-mongodb-backbonejs-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion={{site.spring-stack-version}}
mvn archetype:generate -DarchetypeArtifactId=resthub-jpa-backbonejs-multi-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion={{site.spring-stack-version}}
mvn archetype:generate -DarchetypeArtifactId=resthub-mongodb-backbonejs-multi-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion={{site.spring-stack-version}}
```

After choosing the right archetype and answering a few questions, your project is generated and ready to use.
You can run it thanks to built-in Jetty support:

```bash
mvn jetty:run
```

## Tutorial

You can also discover more concretly RESThub Spring Stack with our dedicated tutorial. Available with or without answers :
[here](/docs/spring/tutorial)