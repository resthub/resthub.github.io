---
layout: docs
title: Bootstrap your project
permalink:  bootstrap/
---

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