---
layout: docs
title: Quickstart
permalink:  quickstart/
prev: docs/
next: spring
---

If you want to get immediately to the heart of the matter, you can find here how to bootstrap a new
RESThub project very quickly.

Lets suppose that you want to start a new rich web application project with a Java/JPA Backend:

<div class="alert alert-info">
    <h6>Prerequisites</h6>
    To run this example, you must have installed <a href="http://java.com/en/download/help/download_options.xml">Java 7</a>
    and <a href="http://maven.apache.org/download.cgi">Maven 3</a> on your computer.
</div>

```bash
~ $ mvn archetype:generate -Dfilter=org.resthub:

# choose the right archetype
# choose {{site.spring-stack-version}} version
# answer a few questions

~ $ cd /new/project

~/new/project $ mvn jetty:run

# Done ! See http://localhost:8080
```

You can now navigate to <http://localhost:8080/> and see your bootstraped project in action:

<div class="quickstart">
    <p class="text-center">
        <img src="/assets/img/quickstart.png" alt="RESThub Quickstart result"/>
    </p>
</div>

You just have to **create your own domain and start coding** ! Enjoy !

## To Go further

You should (unordered):

* Read the [current documentation](/docs/spring)
* Follow our dedicated tutorials : [Spring Stack](/docs/spring/tutorial) and [Backbone Stack](/docs/backbone/tutorial)
* Discover our [TODO List demo application](https://github.com/resthub/todo-backbone-example) (mongoBD)