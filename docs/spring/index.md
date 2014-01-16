---
layout: docs
title: RESThub Spring Stack
permalink:  home/
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

## Versions & Changelogs

Spring stack current version is **2.1.4**, the whole RESThub 2.1 Spring stack [Javadoc](http://resthub.org/javadoc/2.1/) is available.

You can find RESThub Spring Stack release changelogs on our [Github repository](https://github.com/resthub/resthub-spring-stack) :

* 2013-12-20: [RESThub Spring stack 2.1.4](https://github.com/resthub/resthub-spring-stack/blob/master/CHANGELOG.rst#214-version-12-20-2013)
* 2013-12-16: [RESThub Spring stack 2.1.3](https://github.com/resthub/resthub-spring-stack/blob/master/CHANGELOG.rst#213-version-12-16-2013)
* 2013-07-26: [RESThub Spring stack 2.1.2](https://github.com/resthub/resthub-spring-stack/blob/master/CHANGELOG.rst#212-version-07-26-2013)
* 2013-05-17: [RESThub Spring stack 2.1.1](https://github.com/resthub/resthub-spring-stack/blob/master/CHANGELOG.rst#211-version-05-17-2013)
* 2013-03-26: [RESThub Spring stack 2.1.0](https://github.com/resthub/resthub-spring-stack/blob/master/CHANGELOG.rst#210-version-03-15-2013)
* 2012-12-04: [RESThub Spring stack 2.0.0 GA has been released](http://pullrequest.org/2012/12/04/resthub-2.html)
* 2011-06-19: RESThub 1.1 and RESThub JS 1.1 have been released
* 2010-11-17: RESThub 1.0 has been released

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
mvn archetype:generate -DarchetypeArtifactId=resthub-jpa-backbonejs-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion=2.1.4
mvn archetype:generate -DarchetypeArtifactId=resthub-mongodb-backbonejs-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion=2.1.4
mvn archetype:generate -DarchetypeArtifactId=resthub-jpa-backbonejs-multi-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion=2.1.4
mvn archetype:generate -DarchetypeArtifactId=resthub-mongodb-backbonejs-multi-archetype -DarchetypeGroupId=org.resthub -DarchetypeVersion=2.1.4
```

After choosing the right archetype and answering a few questions, your project is generated and ready to use.
You can run it thanks to built-in Jetty support:

```bash
mvn jetty:run
```

## Tutorial

You can also discover more concretly RESThub Spring Stack with our dedicated tutorial. Available with or without answers :
[here](/docs/spring/tutorial)