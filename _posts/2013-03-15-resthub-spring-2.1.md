---
layout: post
title: Spring Stack 2.1.0 released
author: bclozel
categories: [release]
tags: [spring]
version: Spring stack 2.1.0
published: true
---

## Upgrade from 2.0.0

[Use BoneCP for database connections pool management](https://github.com/resthub/resthub-spring-stack/pull/170) : Replaced commons-dbcp with bonecp (see [why](https://github.com/resthub/resthub-spring-stack/issues/155), and migration documentation).

If you ever customized one of those datasource keys in your database.properties file:

```
dataSource.maxActive = 50
dataSource.maxWait = 1000
dataSource.poolPreparedStatements = true
dataSource.validationQuery = SELECT 1
```

Then they are not used anymore; you should translate those concepts into the new librabry concepts used for database connections pool management, [BoneCP](http://jolbox.com/). You'll probably want to switch from a "max live/wait connections" to a "partition" approach, which is way more efficient.

[Fix inconsistent API in HTTP Client](https://github.com/resthub/resthub-spring-stack/pull/161) : API calls all look like asyncXmlGet, jsonGet...

## New features and fixes

* [add CORSFilter](https://github.com/resthub/resthub-spring-stack/pull/171) : optional servlet filter that handles cross-origin requests (documentation)
* [update to Spring Framework 3.2GA](https://github.com/resthub/resthub-spring-stack/issues/138)
* [Custom JsonView annotations support](https://github.com/resthub/resthub-spring-stack/issues/154) : Customizing JSON serialization using annotations on entities ([documentation](http://resthub.org/spring-stack.html#custom-json-views))
* [New REST API for model validation](https://github.com/resthub/resthub-spring-stack/pull/166) : Server can export BeanValidation constraints to your client application ([documentation](http://resthub.org/spring-stack.html#validation-api))

See [all issues for this release](https://github.com/resthub/resthub-spring-stack/issues?milestone=14&page=1&state=closed).