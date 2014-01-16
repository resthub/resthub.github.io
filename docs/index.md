---
layout: docs
title: What is RESThub ?
permalink:  home/
next: spring/home
---

<div class="toc"></div>

## RESTHub principles

RESThub is all about integrating and bundling frameworks with tools, best practices and documentation.
The [RESThub team](/team) works everyday with those frameworks on high traffic, enterprise-grade
applications for their customers.

That’s why we value developer experience on those libraries and despite the
*"Not Invented Here"* syndrome above all.

## RESTHub components

### Main Stacks

RESThub 2.0 is mainly made of 2 independent parts:

* a **Java/Spring stack** for your stateless REST web services
* a **Backbone.js stack** for your MVVM JavaScript client

<div class="alert alert-info">
    These stacks are design to optimally work together but they are independent and you can use the
    <a href="https://developer.mozilla.org/en/docs/Web/JavaScript">JavaScript</a> stack part with a
    <a href="http://rubyonrails.org/">Ruby-on-Rails</a> or <a href="http://nodejs.org/">Node.js</a>
    backend, or you could use the Java stack with an <a href="http://angularjs.org/">Angular.js</a>
    frontend !
</div>

#### Discover the two main stacks:

<div class="text-center row">
    <p class="col-xxs-12 col-xs-6">
        <a class="btn btn-default" href="/docs/spring/home">Spring stack <br/> documentation</a>
        <br/><br/>
        <iframe src="http://ghbtns.com/github-btn.html?user=resthub&repo=resthub-spring-stack&type=fork&count=true"
          allowtransparency="true" frameborder="0" scrolling="0" width="90" height="19"></iframe>
        <a href="http://travis-ci.org/resthub/resthub-spring-stack"><img class="build-status" alt="Spring Stack Build Status" src="https://secure.travis-ci.org/resthub/resthub-spring-stack.png?branch=master"></a>
    </p>
    <p class="col-xxs-12 col-xs-6">
        <a class="btn btn-default" href="/docs/backbone/home">Backbone stack <br/> documentation</a>
        <br/><br/>
        <iframe src="http://ghbtns.com/github-btn.html?user=resthub&repo=resthub-backbone-stack&type=fork&count=true"
          allowtransparency="true" frameborder="0" scrolling="0" width="90" height="19"></iframe>
        <a href="http://travis-ci.org/resthub/resthub-backbone-stack"><img class="build-status" alt="Backbone Stack Build Status" src="https://secure.travis-ci.org/resthub/resthub-backbone-stack.png?branch=master"></a>
    </p>
</div>

### Complementary tools

RESTHub provides also two independent complementary tools:

* a **Spring MVC router** to add route mapping capacity to any "[Spring MVC](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html) based" webapp
* an **AMQP/Hessian based RPC**, a high performance and easy to monitor RPC mechanism based on [RabbitMQ](http://www.rabbitmq.com/)
  client and [Hessian](http://hessian.caucho.com/)

#### Discover these tools:

<div class="text-center row">
    <p class="col-xxs-12 col-xs-6">
        <a class="btn btn-default" href="/docs/router">Spring MVC router <br/> documentation</a>
        <br/><br/>
        <iframe src="http://ghbtns.com/github-btn.html?user=resthub&repo=springmvc-router&type=fork&count=true"
          allowtransparency="true" frameborder="0" scrolling="0" width="90" height="19"></iframe>
        <a href="http://travis-ci.org/resthub/springmvc-router"><img class="build-status" alt="Spring MVC router Build Status" src="https://secure.travis-ci.org/resthub/springmvc-router.png?branch=master"></a>
    </p>
    <p class="col-xxs-12 col-xs-6">
        <a class="btn btn-default" href="/docs/amqp-hessian">AMQP/Hessian<br/> documentation</a>
        <br/><br/>
        <iframe src="http://ghbtns.com/github-btn.html?user=resthub&repo=spring-amqp-hessian&type=fork&count=true"
          allowtransparency="true" frameborder="0" scrolling="0" width="90" height="19"></iframe>
        <a href="http://travis-ci.org/resthub/spring-amqp-hessian"><img class="build-status" alt="AMQP/Hessian Build Status" src="https://secure.travis-ci.org/resthub/spring-amqp-hessian.png?branch=master"></a>
    </p>
</div>


