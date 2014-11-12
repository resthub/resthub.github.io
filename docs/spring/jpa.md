---
layout: docs
title: JPA support
permalink:  jpa/
prev: spring/layout
next: spring/mongo
---

<div class="toc"></div>

JPA support is based on Spring Data JPA and includes by default the H2 in memory database. It includes the following dependencies:

* Spring Data JPA {{site.spring-data-jpa-version}} [reference manual](http://docs.spring.io/spring-data/jpa/docs/{{site.spring-data-jpa-docs-version}}/reference/html/)
  and [Javadoc](http://docs.spring.io/spring-data/jpa/docs/{{site.spring-data-jpa-docs-version}}/api/)
* Hibernate {{site.hibernate-version}} [documentation](http://docs.jboss.org/hibernate/orm/{{site.hibernate-docs-version}}/manual/en-US/html/)
* H2 embedded database {{site.h2-version}} [documentation](http://www.h2database.com/html/main.html)

Thanks to Spring Data, it is possible to create repositories (also sometimes named DAO) by writing only the interface.

<a name="configuration"></a>

## Configuration

In order to use it in your project, add the following snippet to your pom.xml:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-jpa</artifactId>
    <version>{{site.spring-stack-version}}</version>
</dependency>
```

In order to import its [default configuration](https://github.com/resthub/resthub-spring-stack/blob/master/resthub-jpa/src/main/resources/resthubContext.xml),
your should activate the resthub-jpa Spring profile in your WebAppInitializer class:

```java
XmlWebApplicationContext appContext = new XmlWebApplicationContext();
appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-pool-bonecp", "resthub-web-server");
```

You also need to add an applicationContext.xml file in order to scan your repository package.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jpa="http://www.springframework.org/schema/data/jpa"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/data/jpa
                           http://www.springframework.org/schema/data/jpa/spring-jpa.xsd">

    <jpa:repositories base-package="com.myproject.repository" />

</beans>
```

Two files allow to configure persistence related properties:

* persistence.properties: holds jpa and hibernate configuration and options and is connection pool agnostic
* datasource.properties: holds specific configuration options for the active connection pool ([See here](#pools))

Since version 3.1, Spring allows to scan entities in different modules using the same `PersitenceUnit`,
which is not possible with default JPA behaviour. You have to specify the packages where Spring should
scan your entities by creating a persistence.properties file in your resources folder, with the following content:

```
persistenceUnit.packagesToScan = com.myproject.model
```

RESThub Hibernate default properties are:

```
hibernate.dialect = org.hibernate.dialect.H2Dialect
hibernate.show_sql = false
hibernate.format_sql = true
hibernate.hbm2ddl.auto = update
hibernate.cache.use_second_level_cache = true
hibernate.cache.provider_class = net.sf.ehcache.hibernate.EhCacheRegionFactory
hibernate.id.new_generator_mappings = true
persistenceUnit.packagesToScan =
```

Now, entities within the com.myproject.model packages will be scanned, no need for persistence.xml JPA file.


<a name="pools"></a>

## Connection pools

Since 2.2.0 version, RESThub supports both [boneCP {{site.bonecp-version}}](http://jolbox.com/) and [hikariCP {{site.hikaricp-version}}](http://brettwooldridge.github.io/HikariCP/) connection pools.

RESThub considers for now BoneCP as **default connection pool**. It means two things:

* RESThub JPA embed boneCP dependency by default and hikariCP (java6 compatible version) dependency as an optional one:

```xml
<dependency>
    <groupId>com.jolbox</groupId>
    <artifactId>bonecp-spring</artifactId>
    <version>${bonecp.spring.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP-java6</artifactId>
    <version>${hikaricp.version}</version>
    <optional>true</optional>
</dependency>
```

* RESThub archetypes activate boneCP spring profile in generated WebAppInitializer class: 

```java
appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-pool-bonecp", "resthub-web-server");
```

In order to **switch to hikariCP** you must: 

* add hikariCP dependency (without version) in your pom.xml and exclude boneCP dependency:

```xml
<dependency>
    <groupId>org.resthub</groupId>
    <artifactId>resthub-jpa</artifactId>
    <version>${resthub.spring.stack.version}</version>
    <exclusions>
        <exclusion>
            <groupId>com.jolbox</groupId>
            <artifactId>bonecp-spring</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP-java6</artifactId>
</dependency>
```

* activate hikariCP spring profile instead of boneCP profile in WebAppInitializer class: 

```java
appContext.getEnvironment().setActiveProfiles("resthub-jpa", "resthub-pool-hikaricp", "resthub-web-server");
```

the file `datasource.properties` allows to customize the default configuration for the choosen connection pool with one or more of
the available keys customized with your values (see [BoneCP](http://jolbox.com/) and [HikariCP](http://brettwooldridge.github.io/HikariCP/) documentations for details about available options).
You should include only the customized ones.

RESThub JPA default properties for BoneCP are:

```
driverClass = org.h2.Driver
minConnectionsPerPartition = 2
maxConnectionsPerPartition = 4
partitionCount = 3
idleConnectionTestPeriodInMinutes = 1
statementsCacheSize = 100
connectionTestStatement = /* ping*/ SELECT 1
jdbcUrl = jdbc:h2:mem:resthub;DB_CLOSE_DELAY=-1;MVCC=TRUE
username = sa
password = 
poolName = ResthubDBPool
disableJMX = true
```

RESThub JPA default properties for HikariCP are:

```
dataSourceClassName = org.h2.jdbcx.JdbcDataSource
connectionTestQuery = /* ping*/ SELECT 1
maximumPoolSize = 12
poolName = ResthubDBPool
registerMbeans = false
dataSource.user = sa
dataSource.password = 
dataSource.url = jdbc:h2:mem:resthub
```

## Extend JPA properties

RESThub provides an extension point if you need to add new jpa properties that are not already defined in
RESThub core jpa properties (see above). This hook is based on spring maps and its merge capacity.

Indeed, RESThub entityManagerFactory includes an larger map of properties with an external bean reference :

```xml
<bean id="entityManagerFactory"
    class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">

    ...

    <property name="jpaProperties" ref="jpaProperties" />
</bean>

...

<bean id="jpaProperties" parent="resthubCoreJpaProperties">
    <property name="sourceMap">
        <map merge="true"/>
    </property>
</bean>
```

By default the map contains only core resthub jpa properties but if you need to add JPA or Hibernate properties,
you only have to override the `jpaProperties` bean with your own configuration. Provided properties will be merged
with resthub core properties.

Simply add in you applicationContext :

```xml
<bean id="jpaProperties" parent="resthubCoreJpaProperties">
    <property name="sourceMap">
        <map merge="true">
            <entry key="my.key" value="my.value" />
        </map>
    </property>
</bean>
```

If this extension point is not sufficient, simply override `dataSource` and `entityManagerFactory` beans in
your applicationContext.xml.

## Usage

Simply extend Spring Data JpaRepository to use all [Spring Data features](http://docs.spring.io/spring-data/jpa/docs/{{site.spring-data-jpa-docs-version}}/reference/html/)

```java
public interface TodoRepository extends JpaRepository<Todo, String> {
    List<Todo> findByContentLike(String content);
}
```

## Console

H2 console allows you to provide a SQL requester for your embedded default H2 database.
It is included by default in JPA archetypes.

In order to add it to your JPA based application, add these lines to your WebAppInitializer class:

```java
public void onStartup(ServletContext servletContext) throws ServletException {
    ...
    ServletRegistration.Dynamic h2Servlet = servletContext.addServlet("h2console", WebServlet.class);
    h2Servlet.setLoadOnStartup(2);
    h2Servlet.addMapping("/console/database/*");
}
```

When running the webapp, the database console will be available at <http://localhost:8080/console/database/>
URL with following parameters:

* JDBC URL: jdbc\:h2\:mem\:resthub
* Username: sa
* Password: