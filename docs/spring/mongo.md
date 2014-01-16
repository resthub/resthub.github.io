---
layout: docs
title: MongoDB support
permalink:  mongo/
prev: spring/jpa
next: spring/web-common
---

<div class="toc"></div>

MongoDB support is based on Spring Data MongoDB ([reference manual](http://static.springsource.org/spring-data/data-mongodb/docs/current/reference/html/)
and [Javadoc](http://static.springsource.org/spring-data/data-mongodb/docs/current/api/>)).

## Configuration

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-mongodb</artifactId>
    <version>2.1.4</version>
</dependency>
```

In order to import the [default configuration](https://github.com/resthub/resthub-spring-stack/blob/master/resthub-mongodb/src/main/resources/resthubContext.xml>),
your should activate the resthub-mongodb Spring profile in your `WebAppInitializer` class:

```java
XmlWebApplicationContext appContext = new XmlWebApplicationContext();
appContext.getEnvironment().setActiveProfiles("resthub-mongodb", "resthub-web-server");
```

You also need to add an `applicationContext.xml` file in order to scan your repository package.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:mongo="http://www.springframework.org/schema/data/mongo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/data/mongo
                           http://www.springframework.org/schema/data/mongo/spring-mongo.xsd">

    <mongo:repositories base-package="com.myproject.repository" />

</beans>
```

You can customize them by adding a database.properties resource with one or more following keys customized
with your values.
You should include only the customized ones.

RESThub MongoDB default properties are:

```
database.dbname = resthub
database.host = localhost
database.port = 27017
database.username =
database.password =
database.connectionsPerHost = 10
database.threadsAllowedToBlockForConnectionMultiplier = 5
database.connectTimeout = 0
database.maxWaitTime = 120000
database.autoConnectRetry = false
database.socketKeepAlive = false
database.socketTimeout = 0
database.slaveOk = false
database.writeNumber = 0
database.writeTimeout = 0
database.writeFsync = false
```

## Usage

```java
public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findByContentLike(String content);
}
```
