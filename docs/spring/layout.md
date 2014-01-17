---
layout: docs
title: Project layout
permalink:  layout/
prev: spring/home
next: spring/jpa
---

<div class="toc"></div>

Let's take a look at a typical RESThub based application...

RESThub stack based projects follow the "Maven standard" project layout:

* /pom.xml: the Maven configuration file which defines dependencies, plugins, etc.
* /src/main/java: your java classes go there
* /src/main/java/\*\*/WebAppInitializer.java: Java based WebApp configuration (replaces your old web.xml file)
* /src/main/resources: your xml and properties files go there
* /src/main/resources/applicationContext.xml: this is your Spring application configuration file. Since we mainly use annotation
  based configuration,
* /src/main/webapp: your HTML, CSS and javascript files go there

RESThub based applications usually use one of these 2 layouts:

* A single WAR project
* A multi-module project with the following sub-modules:
    * **myproject-webapp** (WAR): it is your web application, it contains static resources, environment specific configuration
      and it declares dependencies to other modules in the pom.xml
    * **myproject-contract** (JAR): contains your POJOs (Entities, DTO ...) and service interface. This module should be used by
      web client or RPC mechanism to know the public classes and interfaces of your application without retreiving all the
      implementation dependencies. As a consequence, if you need to add some implementation dependencies (usually needed for
      annotations), add them as optional Maven dependencies.
    * **myproject-core** (JAR): your project implementation (controllers, service implementations, repositories)

Check the [RESThub 2 Todo example application](https://github.com/resthub/todo-example) source code to learn how to
design your RESThub based web application.

How to run the todo application:

* Download the [zip file](https://github.com/resthub/todo-backbone-example/zipball/master) and extract it
* Install [MongoDB](http://www.mongodb.org/downloads), create the data folder (C:\\data\\db or /data/db by default) and run mondgod
* Run mvn jetty:run in the todo-backbone-example directory
* Open your browser and browse <http://localhost:8080/index.html>

You will find below the typical configuration file for your application.

## Configuration

### Maven

Your project pom.xml defines your project name, version, dependencies and plugins used.
Please notice that it is easier to let RESThub archetypes create the pom.xml automatically for you.

pom.xml example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.mycompany</groupId>
    <artifactId>myproject</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>My project</name>

    <properties>
        <resthub.spring.stack.version>{{site.spring-stack-version}}</resthub.spring.stack.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.resthub</groupId>
            <artifactId>resthub-mongodb</artifactId>
            <version>${resthub.spring.stack.version}</version>
        </dependency>
        <dependency>
            <groupId>org.resthub</groupId>
            <artifactId>resthub-web-server</artifactId>
            <version>${resthub.spring.stack.version}</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.0.1</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>todo</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.5.1</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                    <source>1.7</source>
                    <target>1.7</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>2.3</version>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.mortbay.jetty</groupId>
                <artifactId>jetty-maven-plugin</artifactId>
                <version>8.1.13.v20130916</version>
                <configuration>
                    <!-- We use non NIO connector in order to avoid read only static files under windows -->
                    <connectors>
                        <connector implementation="org.eclipse.jetty.server.bio.SocketConnector">
                            <port>8080</port>
                            <maxIdleTime>60000</maxIdleTime>
                        </connector>
                    </connectors>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

RESThub dependencies are available on Maven Central:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-jpa</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>

<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-mongodb</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>

<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-web-server</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>

<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-web-client</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>

<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-test</artifactId>
    <version>{{site.spring-stack-version}}</version>
    <scope>test</scope>
</dependency>
```

### Web application initializer

Web application initializer replaces the old web.xml file used with Servlet 2.5 or older webapps.
It has the same goal, but since it is Java based, it is safer (compilation check, autocomplete).

WebAppInitializer.java example:

```java
public class WebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        XmlWebApplicationContext appContext = new XmlWebApplicationContext();
        appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-web-server");
        String[] locations = { "classpath*:resthubContext.xml", "classpath*:applicationContext.xml" };
        appContext.setConfigLocations(locations);

        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(appContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/*");

        servletContext.addListener(new ContextLoaderListener(appContext));
    }
}
```

### Spring profiles

RESThub 2 uses [Spring 3.2 profiles](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/)
to let you activate or not each module. It allows you to add Maven dependencies for example on resthub-jpa
and resthub-web-server and let you control when you activate these modules. It is especially useful when running
unit tests: when testing your service layer, you may not need to activate the resthub-web-server module.

You can also use Spring profile for your own application Spring configuration.

Profile activation on your webapp is done very early in the application lifecycle, and is done in your Web application
initializer (Java equivalent of the web.xml) described just before. Just provide the list of profiles to activate in
the `onStartup()` method:

```java
XmlWebApplicationContext appContext = new XmlWebApplicationContext();
appContext.getEnvironment().setActiveProfiles("resthub-mongodb", "resthub-web-server");
```

In your tests, you should use the `@ActiveProfiles` annotation to activate the profiles you need:

```java
@ActiveProfiles("resthub-jpa") // or @ActiveProfiles({"resthub-jpa","resthub-web-server"})
public class SampleTest extends AbstractTransactionalTest {

}
```

RESThub web tests comes with a helper to activate profiles too:

```java
public class SampleControllerTest extends AbstractWebTest {

    public SampleControllerTest() {
        // Call AbstractWebTest(String profiles) constructor
        super("resthub-web-server,resthub-jpa");
    }
}
```

RESThub built-in Spring profiles have the same name than their matching module:

* **resthub-jpa**: enable JPA database support (resthub-jpa dependency needed)
* **resthub-mongodb**: enable MongoDB support (resthub-mongodb dependency needed)
* **resthub-web-server**: enable default web server configuration (resthub-web-server dependency needed)
* **resthub-client-logging**: enable a webservice use to send logs from client to server (resthub-web-server dependency needed)

### Spring based configuration

By default RESThub webservices and unit tests scan and automatically include all resthubContext.xml
(RESThub context files) and applicationContext.xml files (your application context files) available in your
application classpath, including its dependencies.

Here is an example of a typical RESThub based src/main/resources/applicationContext.xml (this one uses JPA, you may
adapt it if you use MongoDB):

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jpa="http://www.springframework.org/schema/data/jpa"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/data/jpa
                           http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">

    <context:component-scan base-package="org.mycompany.myproject" />
    <jpa:repositories base-package="org.mycompany.myproject.repository" />

</beans>
```

### logback.xml

You'll usually have a src/main/resources/logback.xml file in order to configure logging:

```xml
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss} [%thread] %-5level %logger{26} - %msg%n%rEx</pattern>
        </encoder>
    </appender>
    <root level="info">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
```

.

## Beans declaration and injection

You should use JEE6 annotations to declare and inject your beans.

To declare a bean:

```java
@Named("beanName")
public class SampleClass {

}
```

To inject a bean by type (default):

```java
@Inject
public void setSampleProperty(...) {

}
```

Or to inject a bean by name (Allow more than one bean implementing the same interface):

```java
@Inject @Named("beanName")
public void setSampleProperty(...) {

}
```

### CRUD services

RESThub is designed to give you the choice between a 2 layers (Controller -> Repository) or a
3 layers (Controller -> Service -> Repository) software architecture. If you choose the 3 layers one,
you can use the RESThub CRUD service when it is convenient:

```java
@Named("sampleService")
public class SampleServiceImpl extends CrudServiceImpl<Sample, Long, SampleRepository> implements SampleService {

    @Override @Inject
    public void setRepository(SampleRepository sampleRepository) {
        super.setRepository(sampleRepository);
    }
}
```

## Environment specific properties

There are various ways to configure your environment specific properties in your application: the one
 described below is the most simple and flexible way we have found.

Maven filtering (search and replace variables) is not recommended because it is done at compile time
(not runtime) and makes usually your JAR/WAR specific to an environment. This feature can be useful
when defining your target path (`${project.build.directory}`) in your *src/test/applicationContext.xml*
for testing purpose.

Spring properties placeholders + `@Value` annotation is the best way to do that.

```xml
<context:property-placeholder location="classpath*:mymodule.properties"
                             ignore-resource-not-found="true"
                             ignore-unresolvable="true" />
```

You should now be able to inject dynamic values in your code, where `InMemoryRepository` is the default:

```java
@Configuration
public class RequestConfiguration {

    @Value(value = "${repository:InMemoryRepository}")
    private String repository;
}
```