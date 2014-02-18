---
layout: post
title: Spring stack 2.1.5 released
author: bmeurant
categories: [release]
tags: [spring]
version: Spring stack 2.1.5
published: true
---

RESThub Spring stack 2.1.5 released with last dependency updates, bug fixes and some new features before moving to
resthub-spring-stack 2.2.x including spring 4 support.

## New features

* [Alternative to mvc:annotation-driven and params with dots improvements](https://github.com/resthub/resthub-spring-stack/issues/217)
* [Implement a findByIDs method](https://github.com/resthub/resthub-spring-stack/issues/132)

## Fixes

* [Print the complete exception stack when captured by the LoggingHandler](https://github.com/resthub/resthub-spring-stack/pull/226)
* [Remove Hibernate provider warning](https://github.com/resthub/resthub-spring-stack/issues/218)

## Changes

* [Remove unnecessary downcasting from Iterable to List in CrudService](https://github.com/resthub/resthub-spring-stack/issues/228)
* [ModelMapper as optional dependency](https://github.com/resthub/resthub-spring-stack/issues/230) : Be aware that this change could
  potentially break your build. You now have to explicitly include modelmapper as described [here](/docs/spring/web-server/#modelmapper)

## Dependency updates

* Principal dependencies
    * spring from 3.2.6 to 3.2.7
    * spring-data-commons from 1.6.3 to 1.6.4
    * logback from 1.0.13 to 1.1.1
    * slf4j from 1.7.5 to 1.7.6
    * modelmapper from 0.6.2 to 0.6.3
    * hibernate.validator from 4.3.1 to 5.0.3
    * javax.validation from 1.0.0 to 1.1.0
    * cglib from 2.2.2 to 3.1
    * hibernate from 4.3.0 to 4.3.1 (fixes [#227](https://github.com/resthub/resthub-spring-stack/issues/227))
    * h2 from 1.3.174 to 1.3.175
    * ehcache from 2.6.6 to 2.6.8
    * async.http.client from 1.7.20 to 1.8.3
    * cors.filter from 1.3.2 to 1.9
    * jackson from 2.3.0 to 2.3.1

* due to javax.validation and hibernate-validator upgrades, two new dependencies were added :
    * javax.el-api 3.0.0
    * el-ri 1.0

* maven plugins:
    * jetty-maven-plugin from 8.1.13.v20130916 to 9.1.2.v20140210
    * test-jetty-servlet from 8.1.13.v20130916 to 8.1.14.v20131031
    * maven-compiler-plugin from 2.5.1 to 3.1
    * maven-failsafe-plugin.version from 2.12.4 to 2.16
    * maven-site-plugin.version from 3.2 to 3.3
    * maven-war-plugin.version from 2.3 to 2.4
    * maven-javadoc-plugin.version from 2.9 to 2.9.1
    * maven-deploy-plugin.version from 2.7 to 2.8.1
    * maven-release-plugin.version from 2.3.2 to 2.4.2
    * maven-install-plugin.version from 2.4 to 2.5.1
    * maven-assembly-plugin.version from2.3  to 2.4
    * maven-project-info-reports-plugin.version from 2.5.1 to 2.7
    * maven-surefire-report-plugin.version from 2.12.14 to 2.16




