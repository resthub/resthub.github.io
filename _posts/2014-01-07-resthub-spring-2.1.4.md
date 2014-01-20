---
layout: post
title: Spring stack 2.1.4 released
author: bmeurant
categories: [release]
tags: [spring]
version: Spring stack 2.1.4
published: true
---

RESThub Spring stack 2.1.4 released.

Updated dependencies including springframework to  3.2.6 and hibernate to 4.3.0 and some minor bug
fixes.

All Java  artifacts are now available on Maven central so you don't have to add RESThub maven
repositories to your pom.xml anymore.

## Upgrade from 2.1.3

 * Dependencies upgrade
   * Spring from 3.2.4 to 3.2.6
   * Spring Data Commons from 1.5.3 to 1.6.3
   * Spring Data JPA from 1.3.5 to 1.4.3
   * Spring Data MongoDB from 1.2.4 to 1.3.3
   * H2 from 1.3.173 to 1.3.174
   * Jackson from 2.2.3 to 2.3.0
   * Woodstox from 4.1.5 to 4.2.0
   * Hibernate from 4.2.6 to 4.3.0
   * Model Mapper from 0.6.1 to 0.6.2

## New features and fixes

 * [Json serialization of Page<T> when the web service is annoted with a reponseView](https://github.com/resthub/resthub-spring-stack/issues/209)
 * [Empty answers on validation request](https://github.com/resthub/resthub-spring-stack/issues/206)

