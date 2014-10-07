---
layout: post
title: Spring stack 2.2.0 released
author: bmeurant
categories: [release]
tags: [spring]
version: Spring stack 2.2.0
published: true
---

RESThub Spring stack 2.2.0 released, first RESThub release based on spring 4.1.1. It also allows to choose the database connection pool.

## New features

* [Allow overriding any pool option](https://github.com/resthub/resthub-spring-stack/issues/242)
* [Allow choice in connection pool](https://github.com/resthub/resthub-spring-stack/issues/235)
* [Switch to Spring Bill Of Materials to manage Spring dependencies](https://github.com/resthub/resthub-spring-stack/issues/247)

## Breaking Changes

* New connection pooling features introduce breaking changes on database configuration. Old *database.properties* file was split
  into two new files: *datasource.properties* for all options related to connection pool and database provider and
  *persistence.properties* for all options related to JPA and Hibernate. See [documentation](/docs/spring/jpa/#configuration) for details.
* RESThub allows to choose your connection pool and you now must activate a dedicated spring profile to your *WebAppInitializer*. 
  See [documentation](/docs/spring/jpa/#configuration) for details.
* We switched from *ResthubView* to new Spring 4.0 *JsonView* for custom Json Views

See [below](/#migration) for a complete migration guide.

## Dependency updates

* Principal dependencies
    * spring from 3.2.7 to 4.1.1
    * spring-data-commons from 1.6.4 to 1.9.0
    * logback from 1.1.1 to 1.1.2
    * slf4j from 1.7.6 to 1.7.7
    * servet from 3.0.1 to 3.1.0
    * modelmapper from 0.6.3 to 0.7.2
    * hibernate.validator from 5.0.3 to 5.1.2
    * spring-data-mongodb from 1.3.3 to 1.5.4
    * mongo from 2.11.4 to 2.12.3
    * spring-data-jpa from 1.4.3 to 1.7.0
    * hibernate from 4.3.1 to 4.3.6
    * h2 from 1.3.175 to 1.4.181
    * ehcache from 2.6.8 to 2.6.9
    * bonecp from 0.7.1 to 0.8.0
    * introduce new hikaricp 2.0.1 as an optional dependency (see [documentation](/docs/spring/jpa/#pools))
    * remove unnecessary google guava dependency
    * async.http.client from 1.8.3 to 1.8.13
    * spring security from 3.2.0 to 3.2.5
    * jackson from 2.3.1 to 2.4.2
    * woodstox from 4.2.0 to 4.4.0  
    * cors filter from 1.9 to 2.1.2
    * testng from 6.8.7 to 6.8.8

<a name="migration"></a>

## Migration guide

Because of described breaking changes, you will have to follow these steps in order to migrate to RESThub 2.2.0: 

1. add *resthub-pool-bonecp* to your spring active profiles :  

   ```java
   XmlWebApplicationContext appContext = new XmlWebApplicationContext();
   appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-pool-bonecp", "resthub-web-server");
   ```
   
   **NB** : If you want to switch to hikaricp, please follow this [documentation](/docs/spring/jpa/#pools)
   
2. split your existing *database.properties* into a *datasource.properties* and a *persistence.properties* as
   explained [here](/docs/spring/jpa/#configuration).
   
3. If any, search and replace all your references to JSON *ResthubView* by Spring 4 *JsonView*.