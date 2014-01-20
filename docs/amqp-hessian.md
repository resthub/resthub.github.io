---
layout: docs
title: AMQP/Hessian based RPC
permalink:  amqp-hessian/
prev: router
next: misc/references
---

<div class="toc"></div>

Spring AMQP Hessian is a high performance and easy to monitor RPC mechanism based on [RabbitMQ](http://www.rabbitmq.com/) client
and [Hessian](http://hessian.caucho.com/).

Spring AMQP Hessian is based on [qpid-hessian component](https://github.com/ebourg/qpid-hessian)
and adapted for spring-amqp.

Spring AMQP Hessian is a component helping the creation of Hessian services over AMQP
using spring-amqp.

Current version is **{{site.amqp-hessian-version}}**.

You can find Spring AMQP Hessian release changelogs [here](/new/releases)


## Usage

### Server side

Add Maven dependency to your pom.xml (stable artifact are available from Maven Central repository).
Repository for SNAPSHOT versions : <https://oss.sonatype.org/content/repositories/snapshots>

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>spring-amqp-hessian</artifactId>
    <version>{{site.amqp-hessian-version}}</version>
</dependency>
```

Declare your service implementation and the endpoint in your Spring configuration file :

```xml
<bean id="echoServiceImpl" class="org.resthub.rpc.service.EchoServiceImpl"/>
<bean id="echoEndpoint" class="org.resthub.rpc.HessianEndpoint">
    <constructor-arg index="0" ref="echoServiceImpl"/>
    <property name="connectionFactory" ref="connectionFactory" />
</bean>
```

#### Hibernate/JPA Lazy collections

If you are working with lazy collections, you can add a custom serializer for hibernate :

```xml
<bean id="hibernateSerializerFactory" class="org.resthub.rpc.serializer.HibernateSerializerFactory" />
<bean id="echoEndpoint" class="org.resthub.rpc.HessianEndpoint">
    <constructor-arg index="0" ref="echoServiceImpl"/>
    <property name="connectionFactory" ref="connectionFactory" />
    <property name="serializerFactory" ref="hibernateSerializerFactory" />
</bean>
```

This custom serializer will serialize initialized collections (`List`, `Set` or `Map`), and serialize an
empty collection if it's not initialized.


### Client side

Declare the proxy in your Spring configuration file :

```xml
<bean id="echoService" class="org.resthub.rpc.AMQPHessianProxyFactoryBean">
    <property name="connectionFactory" ref="connectionFactory"/>
    <property name="serviceInterface" value="org.resthub.rpc.service.EchoService"/>
</bean>
```

You can now consume the service :

```java
String echo = echoService.echo("Hello Hessian!");
```

## Specifications

### Exceptions management

Exceptions on server side when calling a method are catched and sent to the client.
Exceptions can be catched on client side :

```java
try {
    String echo = echoService.echo("Hello Hessian!");
} catch (Exception e) {
    //do stuff
}
```

.

### Partial serialization

Objects on server side can have more attributes than same objects on client side.

## Indicative performance

In addition to the benefits of monitoring and configuration provided by RabbitMQ,
it gives better performance than REST webservices.

Comparative bench between spring-amqp-hessian with RabbitMQ and REST/JSON :

Test with spring-amqp-hessian and RabbitMQ 2.6.1 :

```
Average of 2800 requests per second
```

Same test with REST/JSON :

```
Average of 1800 requests per second
```