---
layout: docs
title: Web common
permalink:  web-common/
prev: spring/mongo
next: spring/web-server
---

<div class="toc"></div>

RESThub Web Common comes with built-in XML and JSON support for serialization based on
[Jackson 2](http://wiki.fasterxml.com/JacksonHome). RESThub uses
[Jackson 2 XML capabilities](https://github.com/FasterXML/jackson-dataformat-xml)
instead of JAXB since it is more flexible. For example, you don't need to add classes to a context.
Please read [Jackson annotation guide](http://wiki.fasterxml.com/JacksonAnnotations) for details
about configuration capabilities.

## Maven dependency

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-web-common</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>
```

## Usage

```java
// JSON
SampleResource r = (SampleResource) JsonHelper.deserialize(json, SampleResource.class);
JsonHelper.deserialize("{\"id\": 123, \"name\": \"Albert\", \"description\": \"desc\"}", SampleResource.class);

// XML
SampleResource r = (SampleResource) XmlHelper.deserialize(xml, SampleResource.class);
XmlHelper.deserialize("<sampleResource><description>desc</description><id>123</id><name>Albert</name></sampleResource>", SampleResource.class);
```
